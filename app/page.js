"use client";
import LearnAbout from "@/components/LearnAbout";
import SectionForFunding from "@/components/SectionForFunding";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="max-w-screen h-full text-white">
      <section className="text-center border-3 border-dashed border-t-0 border-l-0 border-r-0 border-b-gray-600 mx-auto flex flex-col justify-center items-center   space-y-3.5 min-h-[40vh] ">
        <div className="flex justify-center items-center gap-3">
          <h1 className="font-bold my-2 text-3xl ">Buy Me A Chai</h1>
          <Image
            className="rounded-xl"
            src="/teaCup.gif"
            alt="tea"
            width={60}
            height={60}
            style={{ height: "auto" }}
          />
        </div>
        <p>A crowdfunding platform for creators.</p>
        <div className="flex justify-center items-center gap-3 my-3">
          <Link
            href="/payment"
            className=" bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 cursor-pointer"
          >
            Fund Now
          </Link>

          <Link
            href="/contact"
            className=" bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 cursor-pointer"
          >
            Read More
          </Link>
        </div>
      </section>
      <section className="max-w-screen  border-3 border-dashed border-t-0 border-l-0 border-r-0 border-b-gray-600 pb-10">
        <h2 className="text-center text-3xl p-4 m-3 font-bold">Fundings</h2>
        <menu className=" flex justify-evenly text-center text-xs">
          <SectionForFunding
            title={"Creator Fundings"}
            imgSrc={"/telecommuting.gif"}
          />
          <SectionForFunding
            title={"Support Your Creators"}
            imgSrc={"/rupee.gif"}
          />
          <SectionForFunding
            title={"Creator Fundings"}
            imgSrc={"/leader.gif"}
          />
        </menu>
      </section>
      <LearnAbout />
    </main>
  );
}
