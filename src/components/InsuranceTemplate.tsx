// components/InsuranceTemplate.tsx
"use client";
import Image from "next/image";
import { FC, ReactNode, useState, ChangeEvent, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdAddCall } from "react-icons/md";
import { Testimonial } from "./Testimonial";
import { useToast } from "@/components/ui/use-toast";
import Popup from "./Popup";

interface InsuranceTemplateProps {
  title: string;
  imageSrc: string;
  children: ReactNode;
}

const InsuranceTemplate: FC<InsuranceTemplateProps> = ({
  title,
  imageSrc,
  children,
}) => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
              New
            </span>{" "}
            <span className="text-sm font-medium">{title} at lowest cost</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Protect future with{" "}
            <strong className="text-blue-600 underline">{title}</strong>
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Choose <strong>{title}</strong> for comprehensive coverage that
            protects you and your loved ones. Stay prepared and confident, no
            matter what life brings.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#more-info"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn more
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <Popup title={title} section="hero" />
          </div>
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              PARTNERED WITH
            </span>
            <div className="flex flex-wrap justify-center items-center md:gap-1 gap-6 mt-8 text-gray-500 sm:justify-between ">
              <Image
                src={"/tata.png"}
                alt="Bajaj"
                width={200}
                height={200}
                className="object-contain w-28 md:w-40"
              />

              <Image
                src={"/bajaj.png"}
                alt="Bajaj"
                width={200}
                height={200}
                className="object-contain w-28 md:w-40"
              />
              <Image
                src={"/hdfc.png"}
                alt="hdfc"
                width={200}
                height={200}
                className="object-contain w-28 md:w-40"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold underline">
            {" "}
            All About {title}
          </h1>
        </div>
      </section>

      <section id="more-info" className="px-4 bg-gradient-to-b w-[90%] m-auto">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-10">{children}</div>
      </section>
      <Testimonial />
    </>
  );
};

export default InsuranceTemplate;
