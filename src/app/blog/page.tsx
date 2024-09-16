"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "../apiFunction/Getmethod";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
}

interface IBlog {
  _id: string;
  title: string;
  shortdesc: string;
  desc: string;
}

const Blog = () => {
  const [posts] = useState<BlogPost[]>([
    {
      title: "The Importance of Life Insurance",
      slug: "importance-of-life-insurance",
      excerpt:
        "Life insurance is crucial to ensure financial security for your loved ones in the event of an untimely demise...",
    },
    {
      title: "How Health Insurance Saves You Money",
      slug: "health-insurance-saves-money",
      excerpt:
        "Health insurance can protect you from the high costs of medical treatments, ensuring that you get the care you need...",
    },
    {
      title: "Child Insurance: Securing Your Child’s Future",
      slug: "child-insurance-future",
      excerpt:
        "Child insurance is an investment in your child’s future, providing a safety net for education and other needs...",
    },
    {
      title: "Understanding Pension Insurance",
      slug: "understanding-pension-insurance",
      excerpt:
        "Pension insurance guarantees a steady income after retirement, allowing you to enjoy a comfortable and secure life...",
    },
    {
      title: "Why Car Insurance is a Must",
      slug: "car-insurance-must",
      excerpt:
        "Car insurance is essential to protect yourself from financial loss in the event of accidents or theft...",
    },
    {
      title: "Term Insurance Explained",
      slug: "term-insurance-explained",
      excerpt:
        "Term insurance offers high coverage at a low cost, making it an affordable option for financial protection...",
    },
    {
      title: "Top 5 Reasons to Choose Our Insurance Plans",
      slug: "top-reasons-to-choose-us",
      excerpt:
        "Here are the top reasons why our insurance plans stand out from the competition and are perfect for you...",
    },
  ]);
  const [blog, setBlog] = useState<IBlog[]>();

  function truncateText(text: string, wordLimit: number) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  useEffect(() => {
    getData("blog")
      .then((res) => {
        setBlog(res.blog);
        console.log(res.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 mt-[4rem]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Our Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog?.map((post, i) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {truncateText(post.shortdesc, 20)}
                </p>
                <Link href={`/blog/${post._id}`}>
                  <p className="text-purple-600 hover:text-purple-800 font-bold">
                    Read More →
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
