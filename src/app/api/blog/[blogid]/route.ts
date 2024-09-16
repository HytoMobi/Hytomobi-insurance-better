import { NextResponse } from "next/server";
import BlogModel from "@/models/blog.model";

interface Params {
  blogid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const blogId = params.blogid;

    const getBlogByID = await BlogModel.findOne({ _id: blogId });

    if (!getBlogByID) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog ID is required",
        },
        { status: 400 }
      );
    }

    if (!getBlogByID) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        getBlogByID,
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
