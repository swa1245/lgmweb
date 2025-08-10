
"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const router = useRouter();

  useEffect(() => {
    const initiatePayment = async () => {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay SDK.");
        return;
      }

      const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
      if (!checkoutData) {
        alert("No checkout data found. Please go back and try again.");
        router.push("/checkout");
        return;
      }

      const { formData, cart, totalAmount } = checkoutData;

      try {
        // ✅ Create Razorpay order
        const { data } = await axios.post("http://localhost:5000/api/payment/order", {
          amount: totalAmount, // send raw INR amount
        });

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Sports Store",
          description: "Order Payment",
          order_id: data.id,
          handler: async (response) => {
            try {
          
              const verify = await axios.post("http://localhost:5000/api/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verify.data.success) {
                await axios.post("http://localhost:5000/api/orders", {
                  formData,
                  cart,
                  totalAmount,
                  paymentStatus: "Paid",
                  paymentInfo: response,
                });

                localStorage.removeItem("cart");
                localStorage.removeItem("checkoutData");
                router.push("/userProfile");
              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              console.error("Payment verification error", err);
              alert("Payment verification error.");
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment initiation error", error);
        alert("Error initiating Razorpay.");
      }
    };

    initiatePayment();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">Redirecting to Razorpay...</p>
    </div>
  );
};

export default PaymentPage;
