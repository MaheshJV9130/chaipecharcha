import React, { useEffect, useState } from "react";

const Suppoters = ({ username }) => {
  const [paymentsDone, setPaymentsDone] = useState([]);
  const fetchSuppoters = async () => {
    let req = await fetch("api/getPay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    let res = await req.json();
    let result = res.filter((i) => i.isDone);
    setPaymentsDone(result.sort((a, b) => b.amount - a.amount));
  };

  useEffect(() => {
    fetchSuppoters();
  }, []);

  return (
    <div className="relative overflow-x-auto overflow-y-scroll my-5 max-h-[30vh]">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th
              scope="col"
              className="px-2 py1 md:px-6 md:py-3 text-center bg-gray-800"
              colSpan={3}
            >
              Top Supporters
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-2 py1 md:px-6 md:py-3">
              Name
            </th>
            <th scope="col" className="px-2 py1 md:px-6 md:py-3">
              Amount
            </th>
            <th scope="col" className="px-2 py1 md:px-6 md:py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentsDone.length == 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No supporters yet.
              </td>
            </tr>
          ) : (
            paymentsDone.map((i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={i._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  @{i.fromUser} donates
                </th>
                <td className="px-6 py-4 font-bold">₹{i.amount}</td>
                <td className="px-6 py-4 italic">{i.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Suppoters;
