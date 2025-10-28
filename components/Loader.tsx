import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <LoaderCircle className="animate-spin"/>
    </div>
  );
}

export default Loader;
