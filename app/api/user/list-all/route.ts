import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = String(formData.get("token"));

    const data = isTokenExpired(token);
    if (data.payload.email === "") {
      return new NextResponse("Autorizzazione scaduta", { status: 401 });
    }
    try {
      const users = await User.listAll();
      return NextResponse.json({ users });
    } catch (err: any) {
      throw new Error(err);
    }
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
