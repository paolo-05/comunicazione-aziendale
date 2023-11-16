// 9/11/2023 this API endpoint deletes a user by a given ID.

import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = String(formData.get("token"));
    const id = Number(formData.get("id"));

    const data = isTokenExpired(token);
    if (data.payload.email === "") {
      return new Response("Autorizzazione scaduta", { status: 401 });
    }
    if (!id) {
      return new NextResponse("Id richiesto", { status: 400 });
    }
    if (!(await User.findById(id))) {
      return new NextResponse("Utente non trovato", { status: 404 });
    }
    await User.deleteUser(id);
    return NextResponse.json({ message: "Utente eleminato con successo" });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
