import Link from "next/link";
import React from "react";
import Image from "next/image";
const Page = () => {
 
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-start items-center">
      <Image src="/no-search.gif" alt="404" width={300} height={300} />
      <span className="flex justify-center items-center gap-2 text2xl font-bold">
        <p className="text-red-500">Page Not Found</p>
        <Link className="underline text-green-800" href="/">Go to Home</Link>
      </span>
    </div>
  );
};

export default Page;
export const metadata = {
  title: "Chai - 404",
  description: "Page Not Found",
};
