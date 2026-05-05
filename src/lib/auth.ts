import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
    },
  }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      nip: { type: "string" },
      rank: { type: "string" },
      role: { type: "string" },
      position: { type: "string" },
    },
  },
  advanced: {
    disableCSRFCheck: true,
  },
});
