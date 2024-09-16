import Image from "next/image";
import { FC, ReactNode } from "react";

interface InvestmentTemplateProps {
  title: string;
  imageSrc: string;
  children: ReactNode;
}

const InvestmentTemplate: FC<InvestmentTemplateProps> = ({
  title,
  imageSrc,
  children,
}) => {
  return (
    <div className="bg-gray-100 text-gray-800 border-red-700">
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        </div>
      </section>

      <section className="py-8 px-4 bg-white w-[90%] m-auto">
        <div className="">
          <div className="relative w-full h-64 md:h-[30rem]">
            <Image
              src={imageSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentTemplate;
