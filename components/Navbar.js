"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const [isSearch, setisSearch] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50">
      <nav className="max-w-screen max-h-20 bg-[#B48048] flex justify-between md:px-5 overflow-x-hidden">
        <div className="logo flex justify-center px-2">
          <Link href="/">
            <Image
              src="/tea.gif"
              alt="logo"
              width={83}
              height={83}
              priority
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <ol className="flex justify-center items-center gap-5 px-2">
          <li className="rounded-xl cursor-pointer flex justify-center items-center gap-2 text-base md:text-md  border-2 border-black px-2 py-2">
            {isSearch ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.target.elements.search.value;
                  router.push(`/${query}`);
                  setisSearch(false);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search User..."
                  className="px-2 py-1 rounded-md outline-none w-full md:w-64"
                  autoFocus
                />
                <button type="submit">
                  <Image
                    src="/search.png"
                    alt="search"
                    width={30}
                    height={40}
                    className="cursor-pointer w-6"
                  />
                </button>
              </form>
            ) : (
              <Image
                src="/search.png"
                alt="search"
                width={30}
                height={40}
                className="cursor-pointer w-6"
                onClick={() => setisSearch(true)}
              />
            )}
          </li>

          {session && <Dropdown />}
          {!session && (
            <li className="">
              <div className="flex justify-evenly items-center gap-2 text-base md:text-md  border-2 border-black px-2 py-2 rounded-xl cursor-pointer ">
                <Link href="/login">
                  <Image src="/user.png" alt="profile" width={30} height={30} />
                </Link>

                <Link href="/login">Login</Link>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </header>
  );
};

export default Navbar;
