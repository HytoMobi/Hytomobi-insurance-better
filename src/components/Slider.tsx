import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";

interface SliderProp {
  image: string;
  name: string;
  desc: string; // Optional prop
  cover: string;
}

const Slider: FC<SliderProp> = ({ image, name, desc, cover }) => {
  return (
    <div className="relative max-w-xs shadow-xl rounded-lg overflow-hidden  transition-transform duration-500 hover:scale-[1.015] hover:shadow-2xl hover:brightness-100">
      <div className="relative w-full h-[250px]">
        <Image
          className="w-full h-full object-cover rounded-t-lg"
          width={500}
          height={250}
          src={image}
          alt="Img"
          quality={100}
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="my-2">{desc}</p>

        <div className="flex justify-between items-center my-4">
          <div className="flex items-center justify-center text-pink-400 font-bold">
            <span className="mr-2 text-xl">
              {cover !== "100% Cover" ? "₹" : ""}
            </span>
            <p>{cover}</p>
          </div>
          <div className="flex items-center justify-center">
            <span
              className="mr-2 md:text-xl text-2xl
            "
            >
              ◷
            </span>
            <p>Hurry...</p>
          </div>
        </div>

        <hr className="border-black" />

        <div className="flex items-center mt-3 w-[100%]">
          <div className="flex items-center w-[100%] border-gray-600 p-1 rounded-full shadow-inner">
            <a href="#" className="w-[100%]">
              <Button className="w-[100%] bg-green-800 hover:bg-green-600">
                Contact Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
