"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

const Settings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      razorpayId: "",
      razorpaySecret: "",
      profilePic: "",
    },
  });

  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [currUserData, setCurrUserData] = useState({ name: "mahesh" });
  const getDefaultFileds = async () => {
    let req = await fetch("/api/mongo-get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    let res = await req.json();
    setCurrUserData(res);
    reset({
      email: res.email,
      username: res.username,
      razorpayId: res.razorpayId,
      razorpaySecret: res.razorpaySecret,
      profilePic: res.profilePic,
    });
  };
  useEffect(() => {
    !session ? router.push("/login") : getDefaultFileds();
  }, [session, router]);

  const onSubmit = async (data) => {
    const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;

    if (!usernameRegex.test(data.username)) {
      setError("username", {
        message:
          "Only letters, numbers, underscore (_) and dot (.) allowed. No spaces or special characters.",
      });
    } else {
      if (status === "authenticated") {
        let req = await fetch("/api/mongo-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldUsername: currUserData.username,
            username: data.username,
            email: data.email,
            razorpayId: data.razorpayId,
            razorpaySecret: data.razorpaySecret,
            profilePic: data.profilePic,
          }),
        });

        toast("Updated", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        update();
        redirect
      }
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className="text-2xl text-white text-center mt-12 font-bold">
        Settings
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[80vw] md:max-w-sm mx-auto"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This Field is Must",
            })}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light cursor-not-allowed"
            placeholder="Enter Email"
            disabled
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "This Field is Must",
              maxLength: { value: 30, message: "username too long" },
            })}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Enter Username"
          />
          {errors.username && <p className="red">{errors.username.message}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="profilePic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Profile Pic
          </label>
          <input
            type="text"
            id="profilePic"
            {...register("profilePic")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Enter pic url"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="razorpayId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razorpay Client Id
          </label>
          <input
            type="text"
            id="razorpayId"
            {...register("razorpayId", {
              required: "This Field is Must",
            })}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light "
            placeholder="Enter Razorpay Client Id"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="razorpaySecret"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razorpay Secret
          </label>
          <input
            type="text"
            id="razorpaySecret"
            {...register("razorpaySecret", {
              required: "This Field is Must",
            })}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light "
            placeholder="Enter Razorpay Secret"
          />
        </div>

        <input
          type="submit"
          value={"Save"}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer`}
        />
      </form>
    </div>
  );
};

export default Settings;

