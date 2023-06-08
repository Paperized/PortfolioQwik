CREATE TABLE IF NOT EXISTS "admin_token" (
	"token" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"preview_image" varchar(255),
	"preview_content" varchar(500) NOT NULL,
	"content" text NOT NULL
);
