import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  parseContactPayload,
  verifyCsrfToken,
} from "@/server/contact-security.server";
import { sendContactEmail } from "@/server/send-contact-email.server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const csrfCookie = cookieStore.get("contact-csrf")?.value;
    const body = await request.json();

    if (!verifyCsrfToken(csrfCookie, body?.csrfToken)) {
      return NextResponse.json(
        {
          message: "contact.errors.sessionExpired",
          errors: {},
        },
        { status: 403 },
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          message: "contact.errors.rateLimit",
          errors: {},
        },
        { status: 429 },
      );
    }

    const result = parseContactPayload(body);
    if (!result.ok) {
      return NextResponse.json(
        {
          message: result.message,
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    await sendContactEmail(result.payload);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        message: "contact.errors.server",
        errors: {},
      },
      { status: 500 },
    );
  }
}
