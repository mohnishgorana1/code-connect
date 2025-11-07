import CreateMeetingForm from "@/components/Forms/CreateNewMeetingForm";

export default function CreateMeeting() {
  const sampleData = {
    instructions: [
      "Specify the required Skillset and Duration accurately for the assessment.",
      "A unique Meeting ID will be generated upon creation; share this with the candidate.",
      "Ensure the meeting details (e.g., candidate name, role) are correct before proceeding.",
    ],
    supportContact: "mohnishgorana1@gmail.com",
  };

  return (
    <div className="p-8 grid md:grid-cols-5 w-full gap-x-4">
      <section className="md:col-span-2 flex  flex-col gap-y-2 md:gap-y-4 ">
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border-l-4 border-cyan-500">
          <h1 className="text-xl font-bold text-white">
            Create Collaborative Meeting Portal
          </h1>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-cyan-400 mb-3">
            Meeting Setup Guide
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-3">
            {sampleData.instructions.map((inst, index) => (
              <li key={index} className="text-sm">
                {inst}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            For technical issues, contact support: {sampleData.supportContact}
          </p>
        </div>
      </section>
      {/* The form component is rendered here */}
      <section className="md:col-span-3 w-full  ">
        <CreateMeetingForm />
      </section>
    </div>
  );
}
