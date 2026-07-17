CREATE TABLE "trips" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"source" text,
	"document" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
