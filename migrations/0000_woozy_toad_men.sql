-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "recipients" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"relationship" varchar(20),
	"birthday" date,
	"other_info" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "gift" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipient_id" integer NOT NULL,
	"link" text,
	"other_info" text,
	"holiday_id" integer,
	"gift_name" text,
	"price" numeric,
	"purchased" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "holiday" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"holiday_name" text,
	"recipient_id" integer
);
--> statement-breakpoint
ALTER TABLE "recipients" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift" ADD CONSTRAINT "fk_recipient" FOREIGN KEY ("recipient_id") REFERENCES "public"."recipients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holiday" ADD CONSTRAINT "fk_gift_recipient" FOREIGN KEY ("recipient_id") REFERENCES "public"."recipients"("id") ON DELETE no action ON UPDATE no action;
*/