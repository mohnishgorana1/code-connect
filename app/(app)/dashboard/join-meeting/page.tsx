import JoinMeetingForm from "@/components/Forms/JoinMeetingForm";

export default function JoinMeeting() {
  const sampleData = {
    instructions: [
      "Ensure you have a stable internet connection and functioning mic/camera.",
      "Use the exact 8-character Meeting ID provided in your confirmation email.",
    ],
    supportContact: "mohnishgorana1@gmail.com",
  };

  return (
    <div className="p-8 grid md:grid-cols-5 gap-4 w-full">
      <section className="md:col-span-2 min-h-[40vh] flex flex-col justify-between">
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border-l-4 border-cyan-500">
          <h1 className="text-xl font-bold text-white">
            Join Collaborative Meeting Portal
          </h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-cyan-400 mb-3">
            Quick Checklist
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-3">
            {sampleData.instructions.map((inst, index) => (
              <li key={index} className="text-sm">
                {inst}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* The form component is rendered here */}
      <section className="md:col-span-3 min-h-[40vh] ">
        <JoinMeetingForm />
      </section>
    </div>
  );
}
