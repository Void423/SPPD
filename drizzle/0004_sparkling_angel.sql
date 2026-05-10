ALTER TABLE "sppd" DROP CONSTRAINT "sppd_employeeId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sppd" ADD COLUMN "sppdNumber" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "sppd" ADD CONSTRAINT "sppd_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;