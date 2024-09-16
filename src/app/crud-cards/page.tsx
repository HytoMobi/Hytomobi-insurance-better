"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState, FC, ChangeEvent, FormEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getData } from "../apiFunction/Getmethod";
import { postData } from "../apiFunction/Postmethod";
import { deleteData } from "../apiFunction/Deletemethod";
import { patchData } from "../apiFunction/Patchmethod";
import ProtectedRoute from "@/components/ProtectedRoute";

interface CardFormData {
  imageUrl: string;
  desc: string;
  bankName: string;
  redirectLink: string;
}

interface EditCardFormData {
  id: string;
  imageUrl: string;
  desc: string;
  bankName: string;
  redirectLink: string;
}

interface ICard {
  _id: string;
  imageUrl: string;
  bankName: string;
  desc: string;
  redirectLink: string;
}

const CrudCard = () => {
  const [formData, setFormData] = useState<CardFormData>({
    imageUrl: "",
    desc: "",
    bankName: "",
    redirectLink: "",
  });
  const [allCard, setAllCard] = useState<ICard[]>();
  const { toast } = useToast();

  const updateCards = async () => {
    try {
      const res = await getData("card");
      setAllCard(res.cards);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === "")) {
      return toast({
        variant: "destructive",
        title: "Fields cannot be empty",
        description: "Please fill in all the fields.",
      });
    }

    try {
      const res = await postData("card", formData);
      if (res.success) {
        setAllCard((prevCards) => [...(prevCards || []), res.newCard]);
        setFormData({
          imageUrl: "",
          desc: "",
          bankName: "",
          redirectLink: "",
        });
        toast({
          variant: "default",
          title: "Success",
          description: "Card added successfully.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while adding the card.",
      });
    }
  };

  const handleEditCard = (updatedCard: ICard) => {
    setAllCard((prevCards) =>
      prevCards?.map((card) =>
        card?._id === updatedCard?._id ? updatedCard : card
      )
    );
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await deleteData("card", cardId);
      setAllCard((prevCards) =>
        prevCards?.filter((card) => card._id !== cardId)
      );
      toast({
        variant: "default",
        title: "Success",
        description: "Card deleted successfully.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while deleting the card.",
      });
    }
  };

  useEffect(() => {
    updateCards();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        {/* Form for Adding a Card */}
        <div className=" w-[90%] m-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-4xl font-extrabold mb-5 text-center">
            Add new card
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["imageUrl", "desc", "bankName", "redirectLink"].map(
              (field: any) => (
                <div key={field}>
                  <label className="block text-lg font-semibold mb-2">
                    {field === "imageUrl"
                      ? "Image URL"
                      : field === "desc"
                      ? "Short Description"
                      : field === "bankName"
                      ? "Bank Name"
                      : "Redirect Link"}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field as keyof CardFormData]}
                    onChange={handleInputChange}
                    placeholder={field}
                    className="w-full px-4 py-3 border rounded-md"
                  />
                </div>
              )
            )}
            <button
              type="submit"
              className="w-[50%] flex justify-center h-10 items-center m-auto mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Card List */}
        <div className=" w-[90%] m-auto rounded-lg mt-10 mb-10 p-4 bg-gray-200">
          <h1 className="font-extrabold mb-5 text-center text-2xl">
            View Cards
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.no</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Short Desc</TableHead>
                <TableHead>Redirect Link</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCard?.map((ele, i) => (
                <TableRow key={ele?._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <img
                      src={ele?.imageUrl}
                      alt="Card"
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell>{ele?.bankName}</TableCell>
                  <TableCell>{ele?.desc}</TableCell>
                  <TableCell>{ele?.redirectLink}</TableCell>
                  <TableCell className="text-center flex justify-center items-center gap-5">
                    <EditPopupBox ele={ele} updateCard={handleEditCard} />
                    <Button
                      onClick={() => handleDeleteCard(ele._id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CrudCard;

interface IPopup {
  ele: ICard;
  updateCard: (updatedCard: ICard) => void;
}

const EditPopupBox: FC<IPopup> = ({ ele, updateCard }) => {
  const [formData, setFormData] = useState<EditCardFormData>({
    id: ele?._id,
    imageUrl: ele?.imageUrl,
    desc: ele?.desc,
    bankName: ele?.bankName,
    redirectLink: ele?.redirectLink,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field.trim() === "")) {
      return toast({
        variant: "destructive",
        title: "Empty values",
        description: "Please enter all the values.",
      });
    }

    setLoading(true);

    try {
      const res = await patchData("card", formData);
      if (res.success) {
        updateCard(res.updateCard);
        toast({
          variant: "default",
          title: "Card Updated successfully",
          className: "bg-green-600 text-white border-none",
        });
        setIsOpen(false);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating the card.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger>
          <Button className="bg-green-500">Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-end items-center gap-36 ">
              <h1 className="text-center font-bold text-3xl">Edit Card</h1>
              <AlertDialogCancel
                className="text-2xl"
                onClick={() => setIsOpen(false)}
              >
                X
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mt-5 space-y-3">
              {["imageUrl", "desc", "bankName", "redirectLink"].map((field) => (
                <div key={field}>
                  <label className="block text-lg font-semibold">
                    {field === "imageUrl"
                      ? "Image URL"
                      : field === "desc"
                      ? "Short Description"
                      : field === "bankName"
                      ? "Bank Name"
                      : "Redirect Link"}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field as keyof EditCardFormData]}
                    onChange={handleChange}
                    placeholder={field}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {loading ? <LoadingSpinner /> : "Submit"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
