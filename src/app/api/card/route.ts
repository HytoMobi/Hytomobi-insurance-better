import { NextResponse } from "next/server";
import { connect } from "@/db/db";
import cardModel from "@/models/card.models";

export async function POST(req: Request, res: Response) {
  
  const { imageUrl, bankName, desc, redirectLink } = await req.json();

  await connect();

  try {
    if (!imageUrl || !desc || !bankName || !redirectLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the values",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const newCard = new cardModel({ imageUrl, desc, bankName, redirectLink });
    await newCard.save();
    return NextResponse.json(
      {
        success: true,
        message: "Card Successfully Added",
        newCard,
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
    const Card = await cardModel.find();
    return NextResponse.json(
      {
        success: true,
        message: "Cards fetched Sucessfully",
        cards: Card,
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
    const updateCard = await cardModel.findByIdAndUpdate(
      id,
      { $set: fieldsToUpdate },
      { new: true } // Return the updated document
    );

    // If the document with the provided ID is not found
    if (!updateCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Card not found. Please provide a correct ID.",
          responseBody: null,
        },
        { status: 404 } // Not found
      );
    }

    // Return the success response
    return NextResponse.json(
      {
        success: true,
        message: "card updated successfully.",
        updateCard, // Optionally return the updated document
      },
      { status: 200 } // Success
    );
  } catch (error) {
    console.error("Error updating blog:", error);

    // Return error response in case of a server issue
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred while updating the card.",
      },
      { status: 500 } // Server error
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  await connect();

  try {
    const { id } = await req.json();

    const deleteCard = await cardModel.findByIdAndDelete({
      _id: id,
    });

    if (!deleteCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Blog ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "card Deleted successfully",
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
