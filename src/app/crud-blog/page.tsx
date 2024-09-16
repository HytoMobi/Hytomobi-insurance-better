"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { getData } from "../apiFunction/Getmethod";
import { postData } from "../apiFunction/Postmethod";
import { deleteData } from "../apiFunction/Deletemethod";
import ProtectedRoute from "@/components/ProtectedRoute";

interface IBlog {
  _id: string;
  title: string;
  shortdesc: string;
  desc: string;
}

const Blog = () => {
  const [title, setTitle] = useState("");
  const [shortdesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const editorValue = useRef<TinyMCEEditor | null>(null);
  const { toast } = useToast();

  const [blog, setBlog] = useState<IBlog[]>();

  const handleDescription = (content: any, editor: any) => {
    setDesc(content);
  };

  const updateBlogs = () => {
    getData("blog")
      .then((res) => {
        setBlog(res.blog);
      })
      .catch((err) => console.log(err));
  };

  const HandleSubmit = () => {
    if (!title || !shortdesc || !desc) {
      return toast({
        variant: "destructive",
        title: "Empty Fields",
        description: "Admin, Please enter all fields.",
      });
    }

    const addBlog = { title, shortdesc, desc };

    postData("blog", addBlog)
      .then((res) => {
        if (res.success) {
          updateBlogs();
          setTitle("");
          setShortDesc("");
          setDesc("");
          return toast({
            variant: "default",
            title: "Sucessfull",
            description: "Admin, Blog has been added successfully. ",
          });
        }
      })
      .catch((err) => {
        return toast({
          variant: "destructive",
          title: "Error Occured",
          description: "Admin, Sorry to say, But some error Occured",
        });
      });
  };

  // Getting all the blog pages
  useEffect(() => {
    updateBlogs();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div
          className="mt-20 rounded-lg w-[90%] m-auto"
          style={{ padding: "2rem" }}
        >
          <div
            className="rounded-lg"
            style={{
              backgroundColor: "hsl(0deg 0% 92.28%)",
              padding: "1rem",
              marginBottom: "3rem",
            }}
          >
            <h1
              className="font-extrabold text-6xl text-center"
              style={{
                fontSize: "2rem",
              }}
            >
              Create a Blog
            </h1>
            <div style={{ marginBottom: "1rem" }}>
              <label className="block mb-2 font-extrabold" htmlFor="name">
                Title :
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                name="name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-full p-3 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 border"
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label className="block mb-2 font-extrabold" htmlFor="name">
                Short Description :
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                name="name"
                value={shortdesc}
                onChange={(e) => {
                  setShortDesc(e.target.value);
                }}
                className="w-full p-3 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 border"
              />
            </div>

            <div>
              <label className="font-extrabold">Long Description : </label>
              <div className="mt-3">
                <Editor
                  apiKey="37gpsm2ef91syeebx9x8cbl2u7g32cfnb47yo44gfwl5t55n"
                  value={desc}
                  onInit={(evt, editor) => (editorValue.current = editor)}
                  init={{
                    plugins: [
                      "anchor",
                      "autolink",
                      "charmap",
                      "codesample",
                      "emoticons",
                      "lists",
                      "searchreplace",
                      "table",
                      "visualblocks",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],
                  }}
                  initialValue="Please Enter your Blog Details!"
                  onEditorChange={handleDescription}
                />
              </div>
            </div>
            <div className="w-full flex m-auto mt-5 mb-5">
              <Button onClick={HandleSubmit} className="mt-20 w-[50%] m-auto">
                Submit
              </Button>
            </div>
          </div>
          <div
            className="rounded-lg"
            style={{
              backgroundColor: "hsl(0deg 0% 92.28%)",
              padding: "1rem",
            }}
          >
            <h1
              className="font-extrabold mb-5 text-center"
              style={{
                fontSize: "2rem",
              }}
            >
              View Blog
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">S.no</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Short Desc</TableHead>
                  <TableHead className="text-center border-black">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blog?.map((ele, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{ele.title}</TableCell>
                    <TableCell>{ele.shortdesc}</TableCell>
                    <TableCell className="text-center border">
                      <div className="flex gap-5 justify-center items-center">
                        <Button
                          className="bg-red-500"
                          onClick={() => {
                            deleteData("blog", ele._id)
                              .then((res) => {
                                if (res.success) {
                                  updateBlogs();
                                  return toast({
                                    variant: "default",
                                    title: "Sucessfull",
                                    description:
                                      "Admin, Blog deleted successfully. ",
                                  });
                                }
                              })
                              .then((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Blog;
