// Paolo Bianchessi, 8/11/2023
// Here we send back the user object by given ID in the request.

import { User } from "@/models/userModel";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = String(formData.get("token"));
    const id = Number(formData.get("id"));

    if (!token) {
      return new NextResponse("Non autorizzato", {
        status: 401,
      });
    }
    if (!id) {
      return new NextResponse("ID richiesto", {
        status: 400,
      });
    }
    const fullUser = await User.findById(id);
    if (!fullUser) {
      return new NextResponse("Utente non trovato", { status: 404 });
    }
    const user = {
      id: fullUser.id,
      email: fullUser.email,
      canModifyUsers: fullUser.canModifyUsers,
      name: fullUser.name,
      lastName: fullUser.lastName,
    };
    return NextResponse.json({ user });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
