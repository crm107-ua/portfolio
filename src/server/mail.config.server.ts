import "server-only";

/**
 * SMTP configuration — server-only, never imported from client components.
 */
export const mailConfig = {
  driver: "smtp" as const,
  host: "smtp.gmail.com",
  port: 465,
  username: "trollers.info@gmail.com",
  password: "cuymzsxnyzytmmai",
  encryption: "ssl" as const,
  from: "Portfolio Contact <trollers.info@gmail.com>",
  /** All portfolio form submissions are delivered here */
  to: "caromamusic@gmail.com",
} as const;

export const portfolioRecipientEmail = mailConfig.to;
