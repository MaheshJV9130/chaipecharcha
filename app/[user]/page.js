"use client";
import Suppoters from "@/components/Suppoters";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";



const User = ({ params }) => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const Params = useParams();

  const findUser = async () => {
    let a = await fetch("/api/findUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: Params.user }),
    });
    let res = await a.json();
    setUsers(res);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      findUser();
    }
  }, [status]);

  useEffect(() => {
    if (!loading && users.length === 0) {
      notFound();
    }
  }, [loading, users]);

  if (loading) return <div className="min-h-screen flex justify-center items-center w-screen ">
      <Image src="/loading.gif" alt="loading" width={160} height={160} />
  </div>;
  if (!users[0]) return null; // Prevent rendering if user not found

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 md:mt-16 bg-white shadow-xl rounded-lg text-gray-900 ">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <Image
              width={500}
              height={200}
              className="object-cover object-top w-full"
              src="/coverPic.jpg"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={users[0].profilePic}
              alt={Params.user}
              width={250}
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">@{users[0].username}</h2>
            <p className="text-gray-500">Berojgar</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <Image src="/rupee-indian.png" alt="Rs" width={16} height={16} />
              <div>2k</div>
            </li>
            <li className="flex flex-col items-center justify-between">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
              </svg>
              <div>10k</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <div>15</div>
            </li>
          </ul>
          {Params.user.replace("%20", " ") == session.user.name ? (
            ""
          ) : (
            <div className="p-4 border-t mx-8 mt-2 flex gap-2  md:flex-nowrap flex-wrap">
              <button className="cursor-pointer w-1/2 h-fit rounded-2xl mx-auto  bg-blue-200 hover:shadow-lg font-semibold text-black p-3 md:px-6 md:py-2 flex justify-center items-center gap-2">
                <Image src="/add.png" alt="add" width={20} height={20} />
                Follow
              </button>
              <Link
                href="/payment"
                className="cursor-pointer w-1/2 h-fit rounded-2xl mx-auto bg-blue-200 hover:shadow-lg font-semibold text-black p-3 md:px-6 md:py-2 flex justify-center items-center gap-2"
              >
                <Image src="/coin.png" alt="coin" width={20} height={20} />
                Support
              </Link>
            </div>
          )}
        </div>

        <Suppoters username={users[0]?.username} />
      </div>
    </>
  );
};

export default User;
