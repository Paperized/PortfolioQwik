import {pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";
import type { InferModel } from 'drizzle-orm';

export const PostTable = pgTable('post', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 255}).notNull(),
  timestamp: timestamp('timestamp', {mode: 'date'}).defaultNow(),
  preview_image: varchar('preview_image', {length: 255}),
  preview_content: varchar('preview_content', {length: 500}).notNull(),
  content: text('content').notNull()
});

export type Post = InferModel<typeof PostTable>;

export type PreviewPost = Omit<Post, 'content'>;

export const AdminTokenTable = pgTable('admin_token', {
  token: varchar('token', {length: 255}).primaryKey(),
  createdAt: timestamp('created_at', {mode: 'date'}).defaultNow(),
  expiresAt: timestamp('expires_at', {mode: 'date'}).notNull()
});