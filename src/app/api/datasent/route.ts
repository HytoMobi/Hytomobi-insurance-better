import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { name, email, phone, location, query } = await req.json();

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || "";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: process.env.GOOGLE_SHEET_RANGE || "",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, email, phone, location, query]],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data Successfully Added",
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
