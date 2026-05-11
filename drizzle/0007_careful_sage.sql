CREATE TYPE "public"."approved" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "sppd" ADD COLUMN "approved" "approved" DEFAULT 'pending';