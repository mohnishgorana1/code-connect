"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export default function RescheduleMeetingDialog({
  meetingId,
  currentDate, 
  currentTime, 
  open,
  onOpenChange,
  onUpdated,
}: {
  meetingId: string;
  currentDate: string;
  currentTime: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}) {
  const [datePart, setDatePart] = useState("");
  const [hour12, setHour12] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAMPM] = useState("AM");
  const [initialUTC, setInitialUTC] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const initializeTimeParts = (dateStr: string, timeStr: string) => {
    const localDateObject = new Date(`${dateStr} ${timeStr}`);
    if (isNaN(localDateObject.getTime())) {
      console.error("Invalid date string passed to initializeTimeParts");
      return;
    }

    setInitialUTC(localDateObject.toISOString());

    const hour24 = localDateObject.getHours();
    const min = localDateObject.getMinutes();

    // Convert to 12hr format
    const h12 = hour24 % 12 || 12; // 0 becomes 12, 13 becomes 1
    const ap = hour24 >= 12 ? "PM" : "AM";

    // Set state
    setDatePart(localDateObject.toISOString().substring(0, 10)); // YYYY-MM-DD
    setHour12(String(h12).padStart(2, "0"));
    setMinute(String(Math.floor(min / 5) * 5).padStart(2, "0")); // Round down to nearest 5 min
    setAMPM(ap);
  };

  useEffect(() => {
    if (open) {
      // Initialize state when dialog opens
      initializeTimeParts(currentDate, currentTime);
    }
  }, [open, currentDate, currentTime]);

  const handleUpdateTime = async () => {
    // 1. Convert 12hr parts back to 24hr format
    let h24 = parseInt(hour12, 10);
    if (ampm === "PM" && h24 !== 12) {
      h24 += 12;
    } else if (ampm === "AM" && h24 === 12) {
      h24 = 0; // Midnight (12 AM) is hour 0
    }

    const h24Str = String(h24).padStart(2, "0");

    // 2. Combine date, 24hr local time string
    // This string is interpreted as Local Time (IST)
    const localDateTimeString = `${datePart}T${h24Str}:${minute}:00`;
    const localDateObject = new Date(localDateTimeString);

    if (isNaN(localDateObject.getTime())) {
      toast.error("Invalid date or time selected.");
      return;
    }

    // 3. Convert Local Date object to UTC ISO string for the backend
    const newStartTimeUTC = localDateObject.toISOString();

    // Check if time has actually changed before submitting
    if (newStartTimeUTC === initialUTC) {
      toast("No changes detected.", {
        description: "Please select a different time to update.",
      });
      onOpenChange(false);
      return;
    }

    setIsSaving(true);
    try {
      const res = await axios.patch(`/api/meeting/${meetingId}/update`, {
        type: "update-start-time",
        payload: { newStartTime: newStartTimeUTC },
      });
      if (res.data.success) {
        onUpdated(); // Refetch meetings on dashboard
        onOpenChange(false);
        toast.success("Meeting time updated successfully!");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  const isDisabled = isSaving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Reschedule Interview</DialogTitle>
          <p className="text-sm text-gray-400">
            Current Time: {currentDate} @ {currentTime} (IST)
          </p>
        </DialogHeader>

        {/* Date and Time Pickers */}
        <div className="space-y-4 pt-2">
          {/* 1. Date Picker */}
          <div>
            <Label
              htmlFor="rescheduleDate"
              className="block text-sm font-medium text-gray-300"
            >
              New Start Date (IST)
            </Label>
            <Input
              id="rescheduleDate"
              type="date"
              value={datePart}
              onChange={(e) => setDatePart(e.target.value)}
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* 2. Time Pickers (12hr Format - Dropdowns) */}
          <div>
            <Label className="block text-sm font-medium text-gray-300">
              New Start Time (IST - 12hr)
            </Label>
            <div className="flex gap-2 mt-1">
              {/* Hour */}
              <select
                value={hour12}
                onChange={(e) => setHour12(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Hours 01 to 12 */}
                {[...Array(12)].map((_, i) => {
                  const h = String((i % 12) + 1).padStart(2, "0");
                  return (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  );
                })}
              </select>

              {/* Minute (in 5-minute increments) */}
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                {/* Minutes 00, 05, 10, ... 55 */}
                {[...Array(12)].map((_, i) => {
                  const m = String(i * 5).padStart(2, "0");
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>

              {/* AM/PM */}
              <select
                value={ampm}
                onChange={(e) => setAMPM(e.target.value)}
                disabled={isDisabled}
                className="flex w-1/3 rounded-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm text-gray-100 focus:border-cyan-500 transition-colors h-10"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleUpdateTime}
            disabled={isDisabled}
            className={`${
              isDisabled
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white transition`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
