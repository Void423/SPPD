import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../../api/database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  advanced: {
    disableCSRFCheck: true
  },
  user: {
    additionalFields: {
      nip: {
        type: "string",
        notNull: true,
        unique: true,
      },
      role: {
        type: "string",
        notNull: true,
        default: "karyawan",
      },
      position: {
        type: "string",
        notNull: true,
        default: "staff",
      },
    }
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
