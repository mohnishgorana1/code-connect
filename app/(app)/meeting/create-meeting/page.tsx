import CreateMeetingForm from "@/components/Forms/CreateMeetingForm";
import { fetchProfileAction } from "@/lib/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateMeetingPage = async() => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  return (
    <div className="min-h-screen ">
     

      {/* Form */}
      <CreateMeetingForm currentProfile={profileInfo}/>
    </div>
  );
};

export default CreateMeetingPage;
