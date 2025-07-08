import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
const Dropdown = () => {
  const { data: session, update, status } = useSession();
  const [isDropdown, setIsDropdown] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      update();
    }
  }, []);

  return (
    <>
      <button
        id="dropdownInformationButton"
        onClick={() => setIsDropdown(!isDropdown)}
        onBlur={() =>
          setTimeout(() => {
            setIsDropdown(false);
          }, 150)
        }
        data-dropdown-toggle="dropdownInformation"
        className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  h-[80%] cursor-pointer"
        type="button"
      >
        <img
          alt="user"
          className="w-10 h-10 rounded-[50%] mx-2"
          src={session.user.image}
          width={40}
          height={40}
        />
        {session.user.name}
        {isDropdown ? (
          <Image src="/arrow-up.png" alt="up" width={15} height={15} className="mx-1" />
        ) : (
          <Image src="/down.png" alt="down" width={15} height={15} className="mx-1" />
        )}
      </button>
      <div
        id="dropdownInformation"
        className={`z-10 ${
          isDropdown ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-15 right-5 md:right-15`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="">{session.user.name}</div>
          <div className="font-medium truncate">{session.user.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`/${session.user.name}`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/earnings"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </Link>
          </li>
        </ul>
        <div
          className="py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 flex  items-center gap-2 pl-3 cursor-pointer"
          onClick={() => signOut()}
        >
          <Image src="/exit.png" alt="exit" width={20} height={20}/>
          Sign out
        </div>
      </div>
    </>
  );
};

export default Dropdown;
