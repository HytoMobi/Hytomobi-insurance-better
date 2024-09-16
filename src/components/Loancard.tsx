import Image from "next/image";
import React from "react";

interface LoanCardProps {
  companyLogo: string;
  companyName: string;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
  rating: number;
  key: string;
}

const LoanCard: React.FC<LoanCardProps> = ({
  companyLogo,
  companyName,
  loanAmount,
  maxTenure,
  bestRate,
  processingFee,
  rating,
  key,
  redirectLink,
}) => {
  return (
    <div
      className="bg-white  shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between gap-10 md:gap-0 items-center border w-[100%]"
      key={key}
    >
      {/* Company Info */}
      <div className="md:flex items-center gap-4 mb-4 md:mb-0 md:w-[35%] ">
        <img
          src={companyLogo}
          alt={`${companyName} logo`}
          className="h-12"
          width={200}
          height={100}
        />
        <div className="w-[100%] text-center md:text-left mt-5 md:mt-0">
          <h2 className="text-lg font-semibold w-full">{companyName}</h2>
          <span className="inline-flex items-center bg-green-500 text-white text-xs px-2 rounded-full">
            {rating} ★
          </span>
        </div>
      </div>

      {/* Loan Details */}
      <div className="flex flex-col md:flex-row items-center justify-evenly text-center gap-5 md:gap-0 md:text-left md:w-[50%] w-[100%]">
        <div>
          <h3 className="text-sm text-gray-500">Loan Amount</h3>
          <p className="text-md font-semibold">{loanAmount}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Max Tenure</h3>
          <p className="text-md font-semibold">{maxTenure}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Best Rate</h3>
          <p className="text-md font-semibold">{bestRate}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Processing Fee</h3>
          <p className="text-md font-semibold">{processingFee}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-2 w-[100%] md:w-[15%]">
        <a
          href={redirectLink}
          target="_blank"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View Details
        </a>
        <a
          href="#callme"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
        >
          CHECK ELIGIBILITY
        </a>
        <a
          href={redirectLink}
          target="_blank"
          className="text-orange-500 text-sm font-semibold hover:underline"
        >
          Know More »
        </a>
      </div>
    </div>
  );
};

export default LoanCard;
