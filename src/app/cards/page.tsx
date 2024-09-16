"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { getData } from "../apiFunction/Getmethod";

// Card Component
interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

interface PartnerCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
  key: number;
}

interface ICard {
  _id: string;
  imageUrl: string;
  bankName: string;
  desc: string;
  redirectLink: string;
}

const Card: FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="text-center border p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <Image
        src={imageSrc}
        alt="Credit Card"
        width={150}
        height={150}
        layout="intrinsic"
        objectFit="cover"
        className="rounded-full m-auto mb-4"
      />

      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
};

const PartnerCards: FC<PartnerCardProps> = ({
  imageSrc,
  title,
  description,
  link,
  key,
}) => {
  return (
    <div
      className="text-center border p-4 h-80 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:w-[20%] w-[90%]"
      key={key}
    >
      <img
        src={imageSrc}
        alt="Credit Card"
        width="150"
        height="150"
        style={{ objectFit: "cover" }}
        className="rounded border m-auto mb-4"
      />

      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2">{description}</p>
      <a href={link} className="font-extrabold">
        <Button className="bg-blue-500 w-full mt-5 hover:bg-blue-700">
          Know More
        </Button>
      </a>
    </div>
  );
};

// Achievement Component
interface AchievementProps {
  icon: string;
  title: string;
  description: string;
}

const Achievement: FC<AchievementProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
      <div className="text-2xl text-purple-900 mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AboutUs: FC = () => {
  const [allCard, setAllCard] = useState<ICard[]>();

  const updateCards = async () => {
    try {
      const res = await getData("card");
      setAllCard(res.cards);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      imageSrc: "/cards.png",
      title: "Debit Card",
      description:
        "Linked directly to a bank account, allowing users to spend funds they already have. Widely used for everyday transactions and ATM withdrawals.",
    },
    {
      imageSrc: "/cards.png",
      title: "Credit Card",
      description:
        "Allows users to borrow funds up to a preset limit. Requires repayment, often with interest, if the balance is not paid in full each month.",
    },
    {
      imageSrc: "/cards.png",
      title: "Prepaid Card",
      description:
        "Loaded with a specific amount of money in advance, not linked to a bank account. Ideal for budgeting or as a gift card.",
    },
    {
      imageSrc: "/cards.png",
      title: "Charge Card",
      description:
        "Similar to a credit card but requires full payment of the balance each month. No preset spending limit but carries significant penalties for late payment.",
    },
    {
      imageSrc: "/cards.png",
      title: "Virtual Card",
      description:
        "A digital version of a debit or credit card, used for online transactions. It offers enhanced security with limited exposure of the actual card number.",
    },
    {
      imageSrc: "/cards.png",
      title: "Store Card",
      description:
        "Issued by specific retailers, used for purchases in their stores. Often comes with rewards or discounts but usually has higher interest rates.",
    },
    {
      imageSrc: "/cards.png",
      title: "Secured Credit Card",
      description:
        "Requires a cash deposit as collateral, often used to build or rebuild credit. The deposit typically equals the credit limit.",
    },
    {
      imageSrc: "/cards.png",
      title: "Contactless Card",
      description:
        "Allows quick payments by tapping the card near a compatible reader. Often used for low-value transactions without a PIN.",
    },
    {
      imageSrc: "/cards.png",
      title: "Business Credit Card",
      description:
        "Tailored for business expenses, offering higher credit limits, expense tracking, and rewards relevant to business needs.",
    },
    {
      imageSrc: "/cards.png",
      title: "Travel Card",
      description:
        "Designed for international travelers, offering benefits like lower foreign transaction fees, travel insurance, and rewards on travel-related purchases.",
    },
  ];

  const achievements = [
    {
      icon: "📊",
      title: "93.4% market share",
      description:
        "Investment Better is India’s leading digital insurance platform. *Based on the number of policies sold in FY20 as per Frost and Sullivan.",
    },
    {
      icon: "💸",
      title: "INR 7 Trillion Sum Assured",
      description:
        "Includes new policies and renewals from life and non-life insurance.",
    },
    {
      icon: "📄",
      title: "Over 19 Million policies sold",
      description: "Policies sold since inception. *Until FY’21.",
    },
    {
      icon: "👥",
      title: "Over 126 Million visits",
      description: "Over 126 Million visits in FY’21.",
    },
  ];

  useEffect(() => {
    updateCards();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-800 mt-20 md:mt-0">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900 ">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Your Perfect Card Companion
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Discover cards that complement your lifestyle, offering
                convenience, rewards, and financial flexibility.
              </p>
              <a
                href="#cards"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Check Cards
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
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
              <a
                href="#ourpartner"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Our Partners
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image
                src="/cards.jpg"
                alt="mockup"
                width={800}
                height={800}
                quality={100}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-10" id="ourpartner">
          <div className="text-center">
            <p className="font-bold text-2xl md:text-3xl underline">
              Our Partners
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
            {allCard?.map((ele, i) => (
              <PartnerCards
                key={i}
                imageSrc={ele.imageUrl}
                title={ele.bankName}
                description={ele.desc}
                link={ele.redirectLink}
              />
            ))}
          </div>
        </section>

        <section className="pt-20" id="cards">
          <div className="mx-auto text-center w-[95%]">
            <h1 className="text-2xl md:text-3xl font-bold underline">
              Various card options
            </h1>
            <p className="mt-4 text-[1rem] md:text-lg w-[100%] md:max-w-7xl mx-auto">
              Bank-issued cards offer convenience, security, and flexibility for
              transactions. They enable cashless payments, provide access to
              credit, and often come with rewards like cashback, travel perks,
              and purchase protection.
            </p>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Key Achievements Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold pb-10 underline">
              Investment Better Achievement
            </h1>
          </div>
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  icon={achievement.icon}
                  title={achievement.title}
                  description={achievement.description}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
