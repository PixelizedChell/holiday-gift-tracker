import { relations } from "drizzle-orm/relations";
import { users, recipients, gift, holiday } from "./schema";

export const recipientsRelations = relations(recipients, ({ one, many }) => ({
	user: one(users, {
		fields: [recipients.userId],
		references: [users.id]
	}),
	gifts: many(gift),
	holidays: many(holiday),
}));

export const usersRelations = relations(users, ({ many }) => ({
	recipients: many(recipients),
}));

export const giftRelations = relations(gift, ({ one }) => ({
	recipient: one(recipients, {
		fields: [gift.recipientId],
		references: [recipients.id]
	}),
}));

export const holidayRelations = relations(holiday, ({ one }) => ({
	recipient: one(recipients, {
		fields: [holiday.recipientId],
		references: [recipients.id]
	}),
}));