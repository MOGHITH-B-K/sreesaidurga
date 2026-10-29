CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY,
	"username" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY,
	"bill_type" text NOT NULL,
	"bill_id" integer NOT NULL,
	"customer_name" text NOT NULL,
	"customer_phone" text NOT NULL,
	"customer_address" text,
	"items" jsonb NOT NULL,
	"total_amount" double precision NOT NULL,
	"booking_date" text NOT NULL,
	"notes" text,
	"status" text DEFAULT 'booked' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar_bookings" (
	"id" serial PRIMARY KEY,
	"booking_date" text NOT NULL,
	"bill_type" text NOT NULL,
	"customer_name" text NOT NULL,
	"customer_phone" text NOT NULL,
	"notes" text,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"phone" text NOT NULL UNIQUE,
	"address" text,
	"photo_urls" jsonb,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"rate" double precision NOT NULL,
	"category" text,
	"product_type" text NOT NULL,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"min_stock_level" integer DEFAULT 5 NOT NULL,
	"total_sales" integer DEFAULT 0 NOT NULL,
	"total_rentals" integer DEFAULT 0 NOT NULL,
	"last_restocked" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rental_bills" (
	"id" serial PRIMARY KEY,
	"serial_no" integer NOT NULL,
	"from_date" text NOT NULL,
	"to_date" text,
	"customer_name" text NOT NULL,
	"customer_phone" text NOT NULL,
	"customer_address" text,
	"items" jsonb NOT NULL,
	"subtotal" double precision NOT NULL,
	"transport_fees" double precision NOT NULL,
	"tax_percentage" double precision DEFAULT 0 NOT NULL,
	"tax_amount" double precision NOT NULL,
	"tax_type" text,
	"advance_amount" double precision NOT NULL,
	"total_amount" double precision NOT NULL,
	"is_paid" boolean NOT NULL,
	"customer_feedback" text,
	"shop_name" text,
	"shop_address" text,
	"shop_phone_1" text,
	"shop_phone_2" text,
	"shop_logo_url" text,
	"shop_qr_url" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales_bills" (
	"id" serial PRIMARY KEY,
	"serial_no" integer NOT NULL,
	"bill_date" text NOT NULL,
	"customer_name" text NOT NULL,
	"customer_phone" text NOT NULL,
	"customer_address" text,
	"items" jsonb NOT NULL,
	"subtotal" double precision NOT NULL,
	"tax_percentage" double precision DEFAULT 0 NOT NULL,
	"tax_amount" double precision NOT NULL,
	"tax_type" text,
	"advance_amount" double precision NOT NULL,
	"total_amount" double precision NOT NULL,
	"is_paid" boolean NOT NULL,
	"customer_feedback" text,
	"shop_name" text,
	"shop_address" text,
	"shop_phone_1" text,
	"shop_phone_2" text,
	"shop_logo_url" text,
	"shop_qr_url" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"token" text NOT NULL UNIQUE,
	"expires_at" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_settings" (
	"id" serial PRIMARY KEY,
	"shop_name" text NOT NULL,
	"shop_address" text,
	"phone_number_1" text,
	"phone_number_2" text,
	"logo_url" text,
	"payment_qr_url" text,
	"language" text DEFAULT 'english' NOT NULL,
	"theme" text DEFAULT 'light' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stock_history" (
	"id" serial PRIMARY KEY,
	"product_id" integer NOT NULL,
	"change_type" text NOT NULL,
	"quantity_change" integer NOT NULL,
	"previous_quantity" integer NOT NULL,
	"new_quantity" integer NOT NULL,
	"notes" text,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_admin_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("id");--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id");