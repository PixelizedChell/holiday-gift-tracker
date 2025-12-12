'use server'
import { eq, isNull, or } from 'drizzle-orm';
import { db } from './db/index';
import { gift, giftees, holiday } from './db/schema';

export const getTrackerRows = async (userId) => {
    return await userId ? db.select({
        giftId: gift.id,
        recipientName: giftees.name,
        giftName: gift.giftName,
        link: gift.link,
        price: gift.price,
        holidayName: holiday.holidayName,
        holidayDate: holiday.date,
        purchased: gift.purchased,
    }).from(gift)
        .innerJoin(
            giftees,
            or(
                eq(giftees.id, gift.gifteeId)
            ),
        )
        .innerJoin(holiday, eq(holiday.id, gift.holidayId))
        .where(eq(giftees.userId, userId)) : [];
}

export const getGifteesRows = async (userId) => {
    return await userId ? db.select({
        name: giftees.name,
        relationship: giftees.relationship,
        birthday: giftees.birthday,
    }).from(giftees)
        .where(eq(giftees.userId, userId)) : [];
}