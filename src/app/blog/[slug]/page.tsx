"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getData } from "@/app/apiFunction/Getmethod";

interface BlogObject {
  id: string;
  title: string;
  shortdesc: string;
  desc: string;
}

const BlogPost = () => {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug;
  const [post, setPost] = useState<BlogObject>();

  useEffect(() => {
    getData(`blog/${slug}`)
      .then((res) => {
        setPost(res.getBlogByID);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  if (!slug) return <p>Post not found</p>;

  if (post?.title === "") {
    return <p>Loading Post...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="md:py-4 py-2 w-[100%] md:w-[90%] mt-20 m-auto">
        <div className="container mx-auto md:px-4 px-2">
          <div className="bg-white p-2 md:p-4 rounded-lg shadow-md">
            <h1 className="md:text-4xl text-2xl font-bold text-gray-800 mb-6">
              {post?.title}
            </h1>
            <Image
              src={"/child-insurance.png"}
              alt="Ads Banner"
              className="w-[80rem] h-48 rounded cursor-pointer mb-5"
              height={10}
              width={10}
            />
            <div
              className="text-gray-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post?.desc ?? "" }}
            ></div>

            <Image
              src={"/car-insurance.png"}
              alt="Ads Banner"
              className="w-[80rem] h-48 rounded cursor-pointer"
              height={10}
              width={10}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
