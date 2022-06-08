CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS "public"."files" (
  "id" uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "name" text NOT NULL,
  "size" int NOT NULL,
  "mimetype" text,
  "uploaded_by_ip_address" text NOT NULL
);