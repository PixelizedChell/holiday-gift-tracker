'use server'
import { eq, isNull, or } from 'drizzle-orm';
import { db } from './db/index';
import { gift, recipients, holiday } from './db/schema';

export const getTrackerRows = async (userId) => {
    return await userId ? db.select({
        giftId: gift.id,
        recipientName: recipients.name,
        giftName: gift.giftName,
        link: gift.link,
        price: gift.price,
        holidayName: holiday.holidayName,
        holidayDate: holiday.date,
        purchased: gift.purchased,
    }).from(gift)
        .innerJoin(
            recipients,
            or(
                eq(recipients.id, gift.recipientId),
                isNull(gift.recipientId),
            ),
        )
        .innerJoin(holiday, eq(holiday.id, gift.holidayId))
        .where(eq(recipients.userId, userId)) : [];
}