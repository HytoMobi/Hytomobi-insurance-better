"use client";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";

interface IPopup {
  title: string;
  section: string;
}

const Popup: FC<IPopup> = ({ title, section }) => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    query: "Insurance",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog open/close

  const { toast } = useToast();

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
          query: "Insurance",
        });
        toast({
          // variant: "default",
          title: "Request Successfully",
          description: "We'll be in touch soon to answer your questions.",
          className: "bg-green-600 text-white border-none",
        });
        setIsOpen(false); // Close the dialog on success
      } else {
        setContactInfo({
          name: "",
          email: "",
          phone: "",
          location: "",
          query: "Insurance",
        });
        setLoading(false);
        setIsOpen(false); // Close the dialog on success
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Successfully",
        description: "Request successfully made, we will contact you soon.",
      });
      setLoading(false);
      setIsOpen(false); // Close the dialog on success
    }
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="w-[100%]">
          {section === "hero" ? (
            <a
              href="#"
              className="inline-flex justify-center w-[100%] gap-2 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdAddCall />
              Contact Now
            </a>
          ) : (
            <a
              href="#contact-form"
              className="inline-block py-3 px-6 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition duration-300 ease-in-out"
            >
              Contact Now and explore plans
            </a>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-end">
              <AlertDialogCancel className="font-extrabold text-xl w-[5%]">
                X
              </AlertDialogCancel>
            </div>

            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
              Get best{" "}
              <strong className="underline text-blue-600">{title}</strong> at
              lowest cost.
            </h2>

            <div className="w-full md:w-[100%] mt-3 md:mt-0">
              <form
                className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg text-left"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 "
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
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={contactInfo.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={loading}
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
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Popup;
