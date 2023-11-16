// used for editing a user's record

import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const token = String(formData.get("token"));
    const id = Number(formData.get("id"));
    const email = String(formData.get("email"));
    const oldPassword = String(formData.get("oldPassword"));
    const password = String(formData.get("password"));
    const canModifyUsers =
      String(formData.get("power")).toLowerCase() === "true";
    console.log(canModifyUsers);
    const name = String(formData.get("name"));
    const lastName = String(formData.get("lastName"));

    if (email === "" || name === "" || lastName === "") {
      return new NextResponse("I campi non possono essere vuoti.", {
        status: 400,
      });
    }
    const oldUser = await User.findById(id);
    if (!oldUser) {
      return new NextResponse("Utente non trovato", { status: 404 });
    }
    if (oldPassword !== "null" && password !== "null") {
      const passwordsMatch = await User.comparePassword(
        oldPassword,
        oldUser.password
      );
      if (!passwordsMatch) {
        return new NextResponse("La vecchia password non corrisponde.", {
          status: 401,
        });
      }
    }
    if (
      !(await User.editUser(
        id,
        email,
        password,
        canModifyUsers,
        name,
        lastName
      ))
    ) {
      return new NextResponse(
        "Esiste un utente già registrato con questa email.",
        { status: 409 }
      );
    }
    return NextResponse.json({ message: "Utente modificato con successo" });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
