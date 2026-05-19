CREATE TABLE "sppd" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" varchar,
	"sppd_number" varchar NOT NULL,
	"purpose" text NOT NULL,
	"transportation" varchar NOT NULL,
	"depart" varchar NOT NULL,
	"destination" varchar NOT NULL,
	"day" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sppd" ADD CONSTRAINT "sppd_employee_id_user_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;