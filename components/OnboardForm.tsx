"use client";
import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createProfileAction } from "@/lib/actions/profile.action";

interface OnboardFormProps {
  userAuthId: string;
  email: string;
  userName: string;
}

function OnboardForm({ userAuthId, email, userName }: OnboardFormProps) {
  const [selectedRole, setSelectedRole] = useState<
    "INTERVIEWER" | "CANDIDATE" | null
  >(null);

  const handleOnboardSubmission = async (e: any) => {
    e.preventDefault();

    // validations
    if (selectedRole === null) {
      console.log("Validation Error");
      return;
    }
    if (!userAuthId || !email || !userName) {
      console.log("No Data Found To Onboard");
      return;
    }

    console.log("onboard data", userAuthId, userName, email, selectedRole);
    console.log("Creating Profile");

    await createProfileAction(userAuthId, userName, email, selectedRole, "/");
  };

  return (
    <div className="">
      <div className="w-full grid sm:grid-cols-2 gap-x-5 gap-y-5">
        <div
          className={`border rounded-lg px-4 py-4 border-white hover:border-blue-400 duration-300 ease-in 
            ${selectedRole === "CANDIDATE" ? "bg-blue-600" : "border-blue-600"}
            `}
          onClick={() => setSelectedRole("CANDIDATE")}
        >
          <span className="flex justify-between">
            <h2 className="font-bold text-xl md:text-2xl">👨‍💻 Candidate</h2>
            {selectedRole === "CANDIDATE" ? (
              <>
                <MdCheckBox className="text-2xl" />
              </>
            ) : (
              <>
                <MdCheckBoxOutlineBlank className="text-2xl" />
              </>
            )}
          </span>
          <p className="text-sm">
            Aspiring to land your dream job? <br></br>
            <span className="hidden md:flex">
              Join a coding session, solve challenges, and showcase your skills
              to potential employers.{" "}
            </span>
          </p>
        </div>
        <div
          className={`border border-white rounded-lg px-4 py-4 hover:border-blue-400 duration-300 ease-in 
            ${
              selectedRole === "INTERVIEWER" ? "bg-blue-600" : "border-blue-600"
            }
        `}
          onClick={() => setSelectedRole("INTERVIEWER")}
        >
          <span className="flex justify-between">
            <h2 className="font-bold text-xl md:text-2xl">🧑‍🏫 Interviewer </h2>
            {selectedRole === "INTERVIEWER" ? (
              <>
                <MdCheckBox className="text-2xl" />
              </>
            ) : (
              <>
                <MdCheckBoxOutlineBlank className="text-2xl" />
              </>
            )}
          </span>
          <p className="text-sm">
            Looking to find the right talent? <br></br>
            <span className="hidden md:flex">
              Host interviews, set coding challenges, and evaluate candidates
              effortlessly.
            </span>
          </p>
        </div>
      </div>
      <form className="mt-8 flex flex-col gap-y-2">
        <Button
          type="submit"
          className="mt-4 bg-white border text-black font-bold hover:border-white hover:bg-transparent hover:text-white duration-300 text-lg md:text-xl"
          onClick={handleOnboardSubmission}
        >
          Onboard Me !
        </Button>
      </form>
    </div>
  );
}

export default OnboardForm;
