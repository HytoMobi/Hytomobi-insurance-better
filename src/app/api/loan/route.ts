import { NextResponse } from "next/server";
import { connect } from "@/db/db";
import loanModel from "@/models/loan.models";

export async function POST(req: Request, res: Response) {
  const {
    imageUrl,
    bankName,
    rating,
    loanAmount,
    maxTenure,
    bestRate,
    processingFee,
    redirectLink,
  } = await req.json();

  await connect();

  try {
    if (
      !imageUrl ||
      !rating ||
      !bankName ||
      !redirectLink ||
      !loanAmount ||
      !maxTenure ||
      !bestRate ||
      !processingFee
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the values",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const newLoan = new loanModel({
      imageUrl,
      bankName,
      rating,
      loanAmount,
      maxTenure,
      bestRate,
      processingFee,
      redirectLink,
    });
    await newLoan.save();
    return NextResponse.json(
      {
        success: true,
        message: "Loan Successfully Added",
        newLoan,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  await connect();
  try {
    const Loan = await loanModel.find();
    return NextResponse.json(
      {
        success: true,
        message: "Loans fetched Sucessfully",
        Loan,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, res: Response) {
  await connect(); // Ensure the database connection is established

  try {
    // Extract the ID and the fields to update from the request body
    const { id, ...fieldsToUpdate } = await req.json();

    // Check if the ID is provided
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide an ID.",
        },
        { status: 400 } // Bad request
      );
    }

    // Ensure at least one field is provided for updating
    if (Object.keys(fieldsToUpdate).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide fields to update.",
        },
        { status: 400 } // Bad request
      );
    }

    // Update only the provided fields using the $set operator
    const updateLoan = await loanModel.findByIdAndUpdate(
      id,
      { $set: fieldsToUpdate },
      { new: true } // Return the updated document
    );

    // If the document with the provided ID is not found
    if (!updateLoan) {
      return NextResponse.json(
        {
          success: false,
          message: "Loan not found. Please provide a correct ID.",
          responseBody: null,
        },
        { status: 404 } // Not found
      );
    }

    // Return the success response
    return NextResponse.json(
      {
        success: true,
        message: "Loan updated successfully.",
        updateLoan, // Optionally return the updated document
      },
      { status: 200 } // Success
    );
  } catch (error) {
    console.error("Error updating Loan:", error);

    // Return error response in case of a server issue
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred while updating the loan.",
      },
      { status: 500 } // Server error
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  await connect();

  try {
    const { id } = await req.json();

    const deleteCard = await loanModel.findByIdAndDelete({
      _id: id,
    });

    if (!deleteCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Loan ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Loan Deleted successfully",
        responseBody: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred.",
      },
      { status: 500 }
    );
  }
}
