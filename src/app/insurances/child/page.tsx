import Footer from "@/components/Footer";
import InsuranceTemplate from "@/components/InsuranceTemplate";
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
import Image from "next/image";
import React from "react";

const Childinsurance = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[4rem]">
        <InsuranceTemplate
          title="Child Insurance"
          imageSrc="/child-insurance.jpg"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            How Child Insurance Will Benefit Your Child&apos;s Future
          </h2>
          <p className="mb-4">
            Child insurance is more than just a policy; it&apos;s a strategic
            financial tool that secures a promising future for your child. By
            investing in a child insurance plan, you create a financial cushion
            for key milestones such as higher education, marriage, or starting a
            business.
          </p>

          <p className="mb-4">
            This type of insurance offers dual benefits: savings and protection.
            It combines the safety of a life insurance policy with an investment
            component that grows over time, ensuring funds are available when
            needed most.
          </p>

          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Consequences of Not Having Child Insurance
          </h2>
          <p className="mb-4">
            Without a dedicated child insurance plan, families may face
            unexpected financial difficulties that could hinder their ability to
            support their child&apos;s ambitions. In such cases, parents might
            have to rely on high-interest loans, increasing their financial
            burden.
          </p>
          <ul className="list-disc ml-5 mb-4">
            <li>
              <strong>Restricted Education Opportunities:</strong> Lack of funds
              can limit access to quality education.
            </li>
            <li>
              <strong>Increased Financial Stress:</strong> Unpreparedness may
              lead to reliance on loans or credit, affecting long-term financial
              stability.
            </li>
          </ul>
          <p className="mb-4">
            This lack of preparedness can restrict your child&apos;s ability to
            pursue their passions, potentially affecting their future prospects
            and career trajectory.
          </p>

          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Why Our Child Insurance Plan is Best Suited for Your Family
          </h2>
          <p className="mb-4">
            Our child insurance plans are designed to provide comprehensive
            coverage and financial security. With flexible options and
            guaranteed payouts, you can ensure that your child’s aspirations are
            fully supported.
          </p>

          <h3 className="text-xl font-bold mb-4 text-blue-700">
            Key Features of Our Child Insurance Plan
          </h3>
          <table className="w-full text-left table-auto border-collapse mb-6">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2">
                  Flexible Premium Payment Options
                </td>
                <td className="border px-4 py-2">
                  Choose from annual, semi-annual, or monthly payment modes.
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">Guaranteed Payouts</td>
                <td className="border px-4 py-2">
                  Receive assured payouts at crucial stages of your child&apos;s
                  life.
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border px-4 py-2">Life Cover with Investment</td>
                <td className="border px-4 py-2">
                  Benefit from a combination of life cover and investment
                  growth.
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Additional Benefits of Choosing Our Plan
          </h2>
          <ul className="list-disc ml-5 mb-4">
            <li>
              <strong>Tax Benefits:</strong> Enjoy tax deductions on premiums
              paid, reducing your taxable income.
            </li>
            <li>
              <strong>Policy Continuance:</strong> In the unfortunate event of
              the policyholder&apos;s demise, the policy remains active without
              further premium payments.
            </li>
            <li>
              <strong>Partial Withdrawals:</strong> Make partial withdrawals to
              cover immediate educational needs or emergencies.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Secure Your Child&apos;s Future Today
          </h2>
          <p className="mb-4">
            Investing in a child insurance plan is an investment in your
            child&apos;s dreams and ambitions. Secure their future by choosing a
            plan that offers both protection and growth, ensuring they have the
            financial support needed for every stage of life.
          </p>
          <div className="flex justify-center items-center w-full m-auto mt-10">
            <Popup title="Child insurance" section="footer" />
          </div>
        </InsuranceTemplate>
      </div>
      <Footer />
    </>
  );
};

export default Childinsurance;
