import { pgTable, unique, serial, text, foreignKey, integer, varchar, date, numeric, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().unique().notNull(),
	passwordHash: text("password_hash").notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text().unique().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const giftees = pgTable("giftees", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	relationship: varchar({ length: 20 }),
	birthday: date(),
	otherInfo: text("other_info"),
	name: text(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "fk_user"
	}),
]);

export const gift = pgTable("gift", {
	id: serial().primaryKey().notNull(),
	gifteeId: integer("giftee_id").notNull(),
	link: text(),
	otherInfo: text("other_info"),
	holidayId: integer("holiday_id"),
	giftName: text("gift_name"),
	price: numeric(),
	purchased: boolean().default(false),
}, (table) => [
	foreignKey({
		columns: [table.gifteeId],
		foreignColumns: [giftees.id],
		name: "fk_recipient"
	}),
]);

export const holiday = pgTable("holiday", {
	id: serial().primaryKey().notNull(),
	date: date().notNull(),
	holidayName: text("holiday_name"),
	gifteeId: integer("giftee_id"),
}, (table) => [
	foreignKey({
		columns: [table.gifteeId],
		foreignColumns: [giftees.id],
		name: "fk_gift_recipient"
	}),
]);
