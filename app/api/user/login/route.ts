import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    if (!email || !password) {
      return new NextResponse("Email and password must be provided", {
        status: 400,
      });
    }
    // find user given the email
    const user = await User.findByEmail(email.toLowerCase());
    if (!user) {
      return new NextResponse("Email o password errate", {
        status: 401,
      });
    }
    // check if the provided password is valid
    const passwordsMatch = await User.comparePassword(password, user.password);
    if (!passwordsMatch) {
      return new NextResponse("Email o password errate", {
        status: 404,
      });
    }
    // Create a JWT token
    const secret = "secret"; // can be put in .env file
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });
    return NextResponse.json({ token });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
}
