ALTER TABLE "sppd" DROP CONSTRAINT "sppd_employeeId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sppd" ALTER COLUMN "employeeId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sppd" ADD CONSTRAINT "sppd_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;