"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createMeetingAction } from "@/lib/actions/meeting.action";
import Link from "next/link";
import { formatToDDMMYYYY } from "@/utility";

function CreateMeetingForm({ currentProfile }: any) {
  const router = useRouter();

  const [isGeneratingMeetingLink, setIsGeneratingMeetingLink] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = useState({
    hour: "12",
    minute: "00",
    period: "AM",
  });
  const [passcode, setPasscode] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [responseData, setResponseData] = useState({
    title: "",
    date: "",
    time: {
      hour: "",
      minute: "",
      period: "",
    },
    passcode: "",
    status: "",
    meetingLink: "",
  });

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsGeneratingMeetingLink(true);
    console.log("data", date, time, passcode);
    if (!date || !time || !passcode || !title) {
      return;
    }

    const response = await createMeetingAction(
      title,
      date,
      time,
      passcode,
      currentProfile?._id
    );
    console.log("reppone", response);

    if (response.success) {
      console.log("Setting data to states");

      setMeetingLink(response.data?.meetingLink);
      setResponseData({
        title: response.data.title,
        date: response.data.date,
        time: response.data.time,
        passcode: response.data.passcode,
        status: response.data.status,
        meetingLink: response.data.meetingLink,
      });
      console.log("data setted to states");
    }
    setIsGeneratingMeetingLink(false);
  };

  return (
    <>
      <main className="md:w-[70%] mx-auto flex flex-col gap-y-8 md:py-8 p-4 md:p-8 bg-neutral-900 rounded-3xl">
        <header className="p-4 my-2">
          <h1 className="text-xl md:text-3xl md:text-center font-bold">
            {meetingLink
              ? "Please take meeting details"
              : "Schedule a New Meeting"}
          </h1>
        </header>
        {meetingLink === "" ? (
          <>
            <div className="grid md:grid-cols-3 gap-y-1 items-center">
              <Label className="text-sm md:text-lg col-span-1">Set Title</Label>
              <Input
                type="text"
                name="title"
                className="col-span-2 bg-black text-sm"
                placeholder="Set title for meeting"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-y-1 items-center">
              <Label className="text-sm md:text-lg col-span-1">
                Select Meeting Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "bg-black hover:bg-black w-[280px] text-sm justify-start text-left font-normal",
                      !date && "text-white text-opacity-50"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="text-sm">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-black text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid md:grid-cols-3 gap-y-1 items-center">
              <Label className="text-sm md:text-lg col-span-1">
                Select Meeting Time
              </Label>
              <div className="col-span-2 flex items-center gap-2 text-sm">
                {/* Hour Dropdown */}
                <select
                  name="hour"
                  value={time.hour}
                  onChange={handleTimeChange}
                  className="bg-black text-white p-2 rounded"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                {/* Minute Dropdown */}
                <select
                  name="minute"
                  value={time.minute}
                  onChange={handleTimeChange}
                  className="bg-black text-white p-2 rounded"
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>

                {/* AM/PM Dropdown */}
                <select
                  name="period"
                  value={time.period}
                  onChange={handleTimeChange}
                  className="bg-black text-white p-2 rounded"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-y-1 items-center">
              <Label className="text-sm md:text-lg col-span-1">
                Set Meeting Passcode
              </Label>
              <Input
                type="text"
                name="passcode"
                className="col-span-2 bg-black text-sm"
                placeholder="Set Passcode"
                value={passcode}
                onChange={(e: any) => setPasscode(e.target.value)}
                required
              />
            </div>
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-lg"
              onClick={handleSubmit}
              disabled={isGeneratingMeetingLink}
            >
              {isGeneratingMeetingLink ? (
                <>
                  <Loader2 className="animate-spin" /> Generating Meeting Link..
                </>
              ) : (
                <>Generate Meeting Link</>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="w-full md:w-[60%] mx-auto flex flex-col border-x">
              <span className="px-2 md:px-8 py-1 border-t border-y flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Title</h1>
                <p>{responseData.title}</p>
              </span>
              <span className="px-2 md:px-8 py-1 border-t border-y flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Date</h1>
                <p>{formatToDDMMYYYY(responseData.date)}</p>
              </span>
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Time</h1>
                <p>
                  {responseData.time.hour}:{responseData.time.minute}{" "}
                  {responseData.time.period}{" "}
                </p>
              </span>{" "}
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">
                  Passcode
                </h1>
                <p>{responseData.passcode}</p>
              </span>{" "}
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">Status</h1>
                <p>{responseData.status}</p>
              </span>
              <span className="px-2 md:px-8 py-1 border-b flex  justify-between  items-center">
                <h1 className="text-lg font-semibold md:col-span-1">
                  Meeting Link
                </h1>
                <p>{meetingLink}</p>
              </span>
            </div>
            <Button className="bg-blue-700 hover:bg-blue-800 font-semibold md:w-[60%] self-center">
              <Link href={meetingLink}>View Meeting</Link>
            </Button>
          </>
        )}
      </main>
    </>
  );
}

export default CreateMeetingForm;
