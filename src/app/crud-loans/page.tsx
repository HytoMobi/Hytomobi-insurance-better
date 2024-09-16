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

interface LoanFormData {
  imageUrl: string;
  bankName: string;
  rating: string;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
}

interface EditLoanFormData {
  id: string;
  imageUrl: string;
  bankName: string;
  rating: string;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
}

interface ILoan {
  _id: string;
  imageUrl: string;
  bankName: string;
  rating: string;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
}

const CrudLoan = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    imageUrl: "",
    bankName: "",
    rating: "",
    loanAmount: "",
    maxTenure: "",
    bestRate: "",
    processingFee: "",
    redirectLink: "",
  });
  const [allLoan, setAllLoan] = useState<ILoan[]>();
  const { toast } = useToast();

  const updateLoan = async () => {
    try {
      const res = await getData("loan");
      setAllLoan(res.Loan);
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
      const res = await postData("loan", formData);
      if (res.success) {
        setAllLoan((prevCards) => [...(prevCards || []), res.newLoan]);
        setFormData({
          imageUrl: "",
          bankName: "",
          rating: "",
          loanAmount: "",
          maxTenure: "",
          bestRate: "",
          processingFee: "",
          redirectLink: "",
        });
        toast({
          variant: "default",
          title: "Success",
          description: "Loan added successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "An error occurred while adding the Loan Company. Please enter the value correctly.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while adding the Loan Company.",
      });

      console.log(err, "This is Error message");
    }
  };

  const handleEditCard = (updateLoan: ILoan) => {
    setAllLoan((prevCards) =>
      prevCards?.map((loan) =>
        loan?._id === updateLoan?._id ? updateLoan : loan
      )
    );
  };

  const handleDeleteCard = async (loanId: string) => {
    try {
      await deleteData("loan", loanId);
      setAllLoan((prevCards) =>
        prevCards?.filter((loan) => loan._id !== loanId)
      );
      toast({
        variant: "default",
        title: "Success",
        description: "Loan Company deleted successfully.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while deleting the Loan Company.",
      });
    }
  };

  useEffect(() => {
    updateLoan();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        {/* Form for Adding a Card */}
        <div className=" w-[90%] m-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-4xl font-extrabold mb-5 text-center">
            Add new Loan Company
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { field: "imageUrl", label: "Image URL" },
              { field: "bankName", label: "Bank Name" },
              { field: "rating", label: "Rating" },
              { field: "loanAmount", label: "Loan Amount" },
              { field: "maxTenure", label: "Max Tenure" },
              { field: "bestRate", label: "Best Rate" },
              { field: "processingFee", label: "Processing Fee" },
              { field: "redirectLink", label: "Redirect Link" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-lg font-semibold mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof LoanFormData]}
                  onChange={handleInputChange}
                  placeholder={label}
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
            ))}

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
            View Loan Companies
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.no</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Max Tenure</TableHead>
                <TableHead>Processing Fee</TableHead>
                <TableHead>Best Rate</TableHead>
                <TableHead className="w-[5%]">Redirect Link</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allLoan?.map((ele, i) => (
                <TableRow key={ele?._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="w-[20%]">
                    <img
                      src={ele?.imageUrl}
                      alt="Card"
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell className="w-[10%]">{ele?.bankName}</TableCell>
                  <TableCell className="w-[5%]">{ele?.rating}</TableCell>
                  <TableCell className="w-[10%]">{ele?.loanAmount}</TableCell>
                  <TableCell className="w-[10%]">{ele?.maxTenure}</TableCell>
                  <TableCell className="w-[10%]">
                    {ele?.processingFee}
                  </TableCell>
                  <TableCell className="w-[10%]">{ele?.bestRate}</TableCell>
                  <TableCell className="w-[5%]">{ele?.redirectLink}</TableCell>
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

export default CrudLoan;

interface IPopup {
  ele: ILoan;
  updateCard: (updatedCard: ILoan) => void;
}

const EditPopupBox: FC<IPopup> = ({ ele, updateCard }) => {
  const [formData, setFormData] = useState<EditLoanFormData>({
    id: ele._id,
    imageUrl: ele.imageUrl,
    bankName: ele.bankName,
    rating: ele.rating,
    loanAmount: ele.loanAmount,
    maxTenure: ele.maxTenure,
    bestRate: ele.bestRate,
    processingFee: ele.processingFee,
    redirectLink: ele.redirectLink,
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
      const res = await patchData("loan", formData);
      if (res.success) {
        updateCard(res.updateLoan);
        toast({
          variant: "default",
          title: "Loan Updated successfully",
          className: "bg-green-600 text-white border-none",
        });
        setIsOpen(false);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating the Loan.",
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
              <h1 className="text-center font-bold text-3xl">Edit Loan</h1>
              <AlertDialogCancel
                className="text-2xl"
                onClick={() => setIsOpen(false)}
              >
                X
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {[
              { field: "imageUrl", label: "Image URL" },
              { field: "bankName", label: "Bank Name" },
              { field: "rating", label: "Rating" },
              { field: "loanAmount", label: "Loan Amount" },
              { field: "maxTenure", label: "Max Tenure" },
              { field: "bestRate", label: "Best Rate" },
              { field: "processingFee", label: "Processing Fee" },
              { field: "redirectLink", label: "Redirect Link" },
            ].map(({ field, label }) => (
              <div key={field} className="col-span-1">
                <label className="block text-lg font-semibold mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof LoanFormData]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full px-4 py-3 border rounded-md"
                />
              </div>
            ))}
            <div className="col-span-2 w-[100%] flex justify-center mt-6">
              <Button
                type="submit"
                className="bg-blue-500 w-[50%] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
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
