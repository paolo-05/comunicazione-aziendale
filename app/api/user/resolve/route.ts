// Paolo Bianchessi, 5/11/2023
// This is the resolve API endpoint, using the jwt library
// we verify the user's token

import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = String(formData.get("token"));

    if (!token) {
      return new NextResponse("Non autorizzato", {
        status: 401,
      });
    }
    try {
      const data = isTokenExpired(token);
      if (data.payload.email === "") {
        return new Response("Autorizzazione scaduta", { status: 401 });
      }
      const email = data.payload.email.toLowerCase();
      const userAll = await User.findByEmail(email);
      if (!userAll) {
        throw new Error("User not found");
      }
      const user = {
        id: userAll.id,
        email: userAll.email,
        canModifyUsers: userAll.canModifyUsers,
        name: userAll.name,
        lastName: userAll.lastName,
      };
      return NextResponse.json({ user });
    } catch (err) {
      return new NextResponse("Non autorizzato", {
        status: 401,
      });
    }
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
