"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { people } from "@/data/peopledata";
import LoanCard from "@/components/Loancard";
import { Button } from "@/components/ui/button";
import { getData } from "../apiFunction/Getmethod";

interface ILoan {
  _id: string;
  imageUrl: string;
  bankName: string;
  rating: number;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
}

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    query: "Loan",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateLoan = async () => {
    try {
      const res = await getData("loan");
      setAllLoan(res.Loan);
    } catch (err) {
      console.error(err);
    }
  };

  const [allLoan, setAllLoan] = useState<ILoan[]>();

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
          query: "Loan",
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
          query: "Loan",
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

  useEffect(() => {
    updateLoan();
  }, []);

  if (allLoan?.length === 0) {
    return (
      <p className="text-center font-extrabold text-2xl mt-5">Loading..</p>
    );
  }
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-900 md:mt-[1rem] mt-[5rem]">
        <section className="lg:pt-20 pt-0  lg:pl-8 h-full">
          <div className="rounded-2xl bg-indigo-50 py-10 overflow-hidden m-5 lg:m-0 2xl:py-16 xl:py-8  lg:rounded-tl-2xl lg:rounded-bl-2xl ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap32">
                <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0">
                  <div className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                    <span className="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3 ">
                      #1
                    </span>
                    Loan Website
                  </div>
                  <h1 className="py-8 text-center text-gray-900 font-bold font-manrope text-3xl md:text-5xl lg:text-left md:leading-[70px]">
                    Your Go-To for
                    <span className="text-indigo-600"> Affordable Loans</span>
                  </h1>
                  <p className=" text-gray-500 text-lg text-center lg:text-left">
                    Get the best deals on loans tailored to your needs, with
                    easy terms and transparent rates.
                  </p>
                  <p className="mt-10 text-left font-extrabold mb-2 text-base text-gray-600 lg:ml-3">
                    #People taken Loans
                  </p>
                  <div className="flex flex-row items-center justify-left mb-10 w-full">
                    <AnimatedTooltip items={people} />
                  </div>
                </div>
                <div
                  className="w-full xl:col-span-7 lg:col-span-6 block"
                  id="callme"
                >
                  <div className="w-full  sm:w-auto lg:w-[60.8125rem] xl:ml-16">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg md:w-[60%]">
                      <header className=" mb-5 text-center">
                        <h1 className="text-3xl font-bold">
                          Contact for{" "}
                          <strong className="text-blue-800 underline">
                            Hassle-free
                          </strong>{" "}
                          loan.
                        </h1>
                      </header>
                      <form onSubmit={handleSubmit}>
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
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="City"
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[90%] m-auto p-10">
          <p className="font-bold text-center text-2xl mb-5">
            Our Loan Partner Company
          </p>
          <div className="flex flex-col justify-center items-center gap-10">
            {allLoan?.map((ele) => (
              <LoanCard
                key={ele._id}
                companyLogo={ele.imageUrl}
                companyName={ele.bankName}
                loanAmount={ele.loanAmount}
                maxTenure={ele.maxTenure}
                bestRate={ele.bestRate}
                processingFee={ele.processingFee}
                rating={ele.rating}
                redirectLink={ele.redirectLink}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-10">
            <Button>
              <a href="#callme">View more...</a>
            </Button>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="py-10">
            <h2 className="text-center text-2xl font-bold mb-6">
              What Real People say!
            </h2>
            <p className="text-center text-lg mb-10">
              At Investment Better, we value our customers&apos; experiences and
              strive to provide the best service possible. Here&apos;s what some
              of our satisfied clients have to say about their experience with
              us. Each review reflects our commitment to making the loan process
              smooth, transparent, and stress-free.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Team Member */}
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/first-person.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Aarav Mehta</p>
                <p className="text-sm text-gray-600">Mumbai, MH</p>
                <p className="mt-2">
                  Investment Better made the loan process so smooth and quick. I
                  got my funds without any hassle, and their customer service is
                  top-notch.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/second-person.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Rajesh Iyer</p>
                <p className="text-sm text-gray-600">Chennai, TN</p>
                <p className="mt-2">
                  I&apos;m really impressed with the professionalism at
                  Investment Better. They offered great interest rates and were
                  always available to answer my queries.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/first-girl.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Priya Verma</p>
                <p className="text-sm text-gray-600">Lucknow, UP</p>
                <p className="mt-2">
                  The entire loan process was easy and straightforward. The team
                  at Investment Better was supportive throughout, and I received
                  my loan faster than expected.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/third-person.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Vikram Singh</p>
                <p className="text-sm text-gray-600">Amritsar, PB</p>
                <p className="mt-2">
                  Investment Better has an efficient and reliable service. The
                  staff was very helpful, guiding me at every step. The quick
                  approval made all the difference.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/second-girl.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Sneha Nair</p>
                <p className="text-sm text-gray-600">Kochi, KL</p>
                <p className="mt-2">
                  Getting a loan from Investment Better was a seamless
                  experience. Their team is highly professional, and the
                  disbursal was faster than I anticipated.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/fourth-person.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Aditya Rao</p>
                <p className="text-sm text-gray-600">Bengaluru, KA</p>
                <p className="mt-2">
                  I had a great experience with Investment Better. The loan
                  process was smooth, and their interest rates were quite
                  competitive. Highly recommend them!
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/third-girl.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Kavita Desai</p>
                <p className="text-sm text-gray-600">Ahmedabad, GJ</p>
                <p className="mt-2">
                  The service from Investment Better was excellent. The loan was
                  processed quickly, and the team made sure everything was clear
                  and simple for me.
                </p>
              </div>
              <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image
                  src="/fourth-girl.jpg"
                  alt="Courtney"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-full m-auto mb-4"
                />
                <p className="text-lg font-semibold">Ishita Sharma</p>
                <p className="text-sm text-gray-600">Jaipur, RJ</p>
                <p className="mt-2">
                  I&apos;m really happy with the service provided by Investment
                  Better. They made the entire process easy, and their rates
                  were better than most other companies.
                </p>
              </div>
              {/* Repeat similar blocks for other team members */}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
