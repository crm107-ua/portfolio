import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();

  cookieStore.set("contact-csrf", csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });

  return NextResponse.json({ csrfToken });
}
