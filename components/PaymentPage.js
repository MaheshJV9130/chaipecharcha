"use client";
import { initiate } from "@/app/actions/paymentAction";
import { useSession } from "next-auth/react";
import Script from "next/script";
import React, { useState } from "react";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentForm, setPaymentForm] = useState({});

  const handleChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value,
      fromUser: session.user.name,
    });
  };
  const pay = async (amount) => {
    const order = await initiate(paymentForm);
    const options = {
      key: process.env.NEXT_PUBLIC_RZR_ID,
      amount: amount,
      currency: "INR",
      name: "Chai Pe Charcha",
      description: "Test Transaction",
      order_id: order.id,
      callback_url: `/api/razorpay`,
      prefill: {
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    setPaymentForm({});
  };
  return (
    <div className="min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <form className="w-62 md:max-w-sm mx-auto my-40">
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Payment Receivers Username
          </label>
          <input
            type="text"
            id="text"
            name="toUser"
            onChange={handleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="example_user_12"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="You are Great"
            onChange={handleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            
          >
            Amount in ₹
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder = 'Min ₹1 , Max ₹5000'
            onChange={handleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            pay(Number(paymentForm.amount) * 100);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={
            !paymentForm.toUser || !paymentForm.message || !paymentForm.amount
          }
          aria-disabled={
            !paymentForm.toUser || !paymentForm.message || !paymentForm.amount
          }
          style={{
            cursor:
              !paymentForm.toUser || !paymentForm.message || !paymentForm.amount
                ? "not-allowed"
                : "pointer",
          }}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
