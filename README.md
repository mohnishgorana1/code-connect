


// further needed this method
const handleRescheduleMeeting = async (newStartTime: Date) => {
  try {
    const res = await axios.patch(`/api/meeting/${meetingId}/update`, {
      type: "update-start-time",
      payload: { newStartTime },
    });

    if (res.data.success) {
      toast.success("Meeting start time updated successfully!");
    } else {
      toast.error(res.data.message || "Failed to update start time");
    }
  } catch (error) {
    toast.error("Something went wrong while updating meeting time");
  }
};
