import { integer, pgTable, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Decks table - each user can create multiple decks
export const decksTable = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  category: varchar({ length: 100 }),
  isPublic: boolean().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Cards table - each deck can have multiple cards
export const cardsTable = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deckId: integer().notNull().references(() => decksTable.id, { onDelete: "cascade" }),
  front: text().notNull(), // Front side of the card (e.g., "Dog")
  back: text().notNull(),  // Back side of the card (e.g., "Kutta")
  hint: text(), // Optional hint for the card
  difficulty: varchar({ length: 50 }).default("medium"), // easy, medium, hard
  position: integer().default(0), // Order within the deck
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Study sessions table - track user's learning progress
export const studySessionsTable = pgTable("study_sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  cardId: integer().notNull().references(() => cardsTable.id, { onDelete: "cascade" }),
  isCorrect: boolean().notNull(),
  responseTime: integer(), // Time taken to answer in milliseconds
  studiedAt: timestamp().notNull().defaultNow(),
});
