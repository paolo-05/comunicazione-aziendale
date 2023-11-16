import { User } from "@/models/userModel";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const canModifyUsers =
      String(formData.get("power")).toLowerCase() === "true";
    const name = String(formData.get("name"));
    const lastName = String(formData.get("lastName"));
    if (
      email === "null" ||
      password === "null" ||
      name === "null" ||
      lastName === "null"
    ) {
      return new NextResponse("I campi non possono essere vuoti", {
        status: 400,
      });
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return new NextResponse("Email già registrata", { status: 400 });
    }
    try {
      await User.createUser(email, password, canModifyUsers, name, lastName);
      return NextResponse.json({ message: "Utente registrato con successo" });
    } catch (err: any) {
      return new NextResponse(err, { status: 500 });
    }
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
