import { NextResponse } from "next/server";
import { connect } from "@/db/db";
import BlogModel from "@/models/blog.model";


export async function POST(req: Request, res: Response) {
  const { title, desc, shortdesc } = await req.json();

  await connect();

  try {
    if (!title || !desc || !shortdesc) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the values",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const newBlog = new BlogModel({ title, desc, shortdesc });
    await newBlog.save();
    return NextResponse.json(
      {
        success: true,
        message: "Blog Successfully Added",
        blog: newBlog,
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
    const Blogs = await BlogModel.find();
    return NextResponse.json(
      {
        success: true,
        message: "Blog fetched Added",
        blog: Blogs,
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

export async function PUT(req: Request, res: Response) {
  await connect();

  try {
    const { id, ...body } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide an ID.",
        },
        { status: 400 } // Use 400 for bad request
      );
    }

    const updateBlog = await BlogModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updateBlog) {
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
        message: "Blog updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  await connect();

  try {
    const { id } = await req.json();

    const deleteBlog = await BlogModel.findByIdAndDelete({
      _id: id,
    });

    if (!deleteBlog) {
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
        message: "Blog Deleted successfully",
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
