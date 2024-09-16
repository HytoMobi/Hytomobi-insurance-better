"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import { Testimonial } from "@/components/Testimonial";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Tabs } from "@/components/ui/tabs";
import { Whychooseus } from "@/components/Whychooseus";
import { useState, ChangeEvent, FormEvent } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    query: "Insurance",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmptyField = Object.values(contactInfo).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      return toast({
        variant: "destructive",
        title: "Empty values",
        description: "Please Enter all the values.",
      });
    }

    setLoading(true);
    try {
      const response = await fetch("/api/datasent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });

      if (response.ok) {
        setLoading(false);
        setContactInfo({
          name: "",
          email: "",
          phone: "",
          location: "",
          query: "Insurance",
        });
        toast({
          // variant: "default",
          title: "Request Successfully",
          description: "We'll be in touch soon to answer your questions.",
          className: "bg-green-600 text-white border-none",
        });
      } else {
        setContactInfo({
          name: "",
          email: "",
          phone: "",
          location: "",
          query: "Insurance",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Successfully",
        description: "Request successfully made, we will contact you soon.",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* Hero section covert from here */}
      <section
        className="relative bg-cover bg-center bg-no-repeat mt-10"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-16 lg:px-24 bg-opacity-40 bg-white backdrop-blur-0">
          <div className="text-left md:w-1/2 space-y-6">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              #BeSafe With Investment Better...
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              Protect what matters most with our comprehensive insurance plans,
              giving you peace of mind when life&apos;s uncertainties arise.
            </p>
          </div>

          <div className="w-full md:w-[40%] mt-8 md:mt-0">
            <form
              className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <h1 className="flex justify-center items-center text-2xl md:3xl mb-5 font-extrabold">
                Contact for more Details
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Mobile No
                </label>
                <input
                  type="number"
                  placeholder="Number"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={contactInfo.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Contact Now <FaLongArrowAltRight />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Type of insurance  */}
      <h1 className="flex justify-center items-center font-extrabold m-auto text-center mt-20 mb-20  text-3xl md:text-5xl w-[100%]">
        Your Affordable Insurance Plan&apos;s
      </h1>
      <div className="flex justify-evenly items-center gap-10 flex-wrap w-[90%] m-auto">
        <Slider
          image="/life-insurance.jpg"
          name="Life Insurance"
          desc="Secure your loved ones' future today, with a life insurance policy that fits your life."
          cover={"1 Cr"}
        />
        <Slider
          image="/health-insurance.jpg"
          name="Health Insurance"
          desc="Live life worry-free with our comprehensive health insurance, that suits especially for you."
          cover={"10 Lakh"}
        />
        <Slider
          image="/child-insurance.jpg"
          name="Child Insurance"
          desc="Secure your child's future, protect their dreams with our comprehensive child insurance."
          cover={"25 Lakh"}
        />
        <Slider
          image="/pension-insurance.jpg"
          name="Pension Insurance"
          desc="Enjoy a golden retirement without worries. Secure your future with our pension plan."
          cover={"50K/month"}
        />
        <Slider
          image="/car-insurance.png"
          name="Car Insurance"
          desc="Accidents happen, be prepared. Protect your ride with your insurance plan that suits well."
          cover={"100% Cover"}
        />
        <Slider
          image="/term-insurance.jpg"
          name="Term Insurance"
          desc="Don't leave your loved ones unprotected. Secure their future with our affordable term insurance."
          cover={"1.5 Cr"}
        />
      </div>

      {/* why choose us */}
      <div className="h-[60rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full mb-32  items-start justify-start my-16 ">
        <h1 className="flex justify-center w-[100%] items-center font-extrabold mb-10 mt-10 text-3xl md:text-5xl">
          Why Choose Us
        </h1>
        <Tabs tabs={Whychooseus} />
      </div>
      {/* Testimonial */}
      <Testimonial />
      {/* Footer  */}
      <Footer />
    </>
  );
}
