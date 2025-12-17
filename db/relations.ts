import { relations } from "drizzle-orm/relations";
import { giftees, gift, holiday } from "./schema";

export const recipientsRelations = relations(giftees, ({ one, many }) => ({
	gifts: many(gift),
	holidays: many(holiday),
}));

export const giftRelations = relations(gift, ({ one }) => ({
	recipient: one(giftees, {
		fields: [gift.gifteeId],
		references: [giftees.id]
	}),
}));

export const holidayRelations = relations(holiday, ({ one }) => ({
	recipient: one(giftees, {
		fields: [holiday.gifteeId],
		references: [giftees.id]
	}),
}));