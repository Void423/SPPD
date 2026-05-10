ALTER TABLE "sppd" ALTER COLUMN "sppdNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sppd" ADD CONSTRAINT "sppd_sppdNumber_unique" UNIQUE("sppdNumber");