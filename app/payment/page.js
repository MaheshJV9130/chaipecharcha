"use client";
import React, { useEffect } from "react";
import PaymentPage from "@/components/PaymentPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Payment = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div>
      <PaymentPage />
    </div>
  );
};

export default Payment;

