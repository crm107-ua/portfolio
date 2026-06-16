import "server-only";

import nodemailer from "nodemailer";
import type { ContactPayload } from "@/server/contact-security.server";
import { mailConfig, portfolioRecipientEmail } from "@/server/mail.config.server";

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.encryption === "ssl",
    auth: {
      user: mailConfig.username,
      pass: mailConfig.password,
    },
  });

  const sentAt = new Date().toISOString();

  await transporter.sendMail({
    from: mailConfig.from,
    to: portfolioRecipientEmail,
    replyTo: payload.email,
    subject: `New portfolio contact — ${payload.name}`,
    text: [
      "New message from your portfolio contact form",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Sent at: ${sentAt}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Sent at:</strong> ${escapeHtml(sentAt)}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
