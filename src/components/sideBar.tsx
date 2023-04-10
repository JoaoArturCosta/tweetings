import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-80 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="mb-auto flex h-full flex-col overflow-y-auto bg-black px-16 py-4 dark:bg-black">
          <a href="https:///" className="mb-5 flex items-center pl-2.5">
            <Image
              src="https://altcoinsbox.com/wp-content/uploads/2023/03/doge-logo-750x915.webp"
              className="mr-3 items-center justify-center"
              alt="Flowbite Logo"
              width={20}
              height={20}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
          </a>
          <ul className="mb-auto space-y-2 text-xl font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <div className="flex justify-center">
                  <span className="ml-3 flex-1 whitespace-nowrap">Home</span>
                </div>
              </Link>
            </li>
            {!isSignedIn && (
              <li>
                <div
                  // href="#"
                  className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>

                  <div className="flex justify-center">
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      <SignInButton />
                    </span>
                  </div>
                </div>
              </li>
            )}
            {isSignedIn && (
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    <SignOutButton />
                  </span>
                </a>
              </li>
            )}
          </ul>
          {user && user.username && (
            <Link href={`/@${user?.username}`} className=" relative bottom-0  ">
              <button className=" flex   grow gap-1 rounded-full  bg-transparent px-1 py-2 hover:bg-gray-900">
                <Image
                  src={user.profileImageUrl}
                  alt="Profile Image"
                  className="h-14 w-14 rounded-full"
                  width={56}
                  height={56}
                />
                <div className="flex  flex-col">
                  <div>{user.fullName}</div>
                  <div className="text-slate-400">@{user.username}</div>
                </div>
              </button>
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
