import { pgTable, unique, serial, text, foreignKey, integer, varchar, date, numeric, boolean } from "drizzle-orm/pg-core"

export const giftees = pgTable("giftees", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	relationship: varchar({ length: 20 }),
	birthday: date(),
	otherInfo: text("other_info"),
	name: text(),
});

export const gift = pgTable("gift", {
	id: serial().primaryKey().notNull(),
	gifteeId: integer("giftee_id").notNull(),
	link: text(),
	otherInfo: text("other_info"),
	holidayId: integer("holiday_id"),
	giftName: text("gift_name"),
	price: numeric(),
	purchased: boolean().default(false),
	userId: text("user_id").notNull()
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
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.gifteeId],
		foreignColumns: [giftees.id],
		name: "fk_gift_recipient"
	}),
]);
