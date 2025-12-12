'use server'
import { eq, or } from 'drizzle-orm';
import { db } from '../db/index';
import { gift, giftees, holiday } from '../db/schema';
import { auth } from '@clerk/nextjs/server';

export const getTrackerRows = async () => {
    const { userId, isAuthenticated } = await auth()
    return isAuthenticated && userId ? await db.select({
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

export const getGifteesRows = async () => {
    const { userId, isAuthenticated } = await auth();
    return isAuthenticated && userId ? await db.select({
        name: giftees.name,
        relationship: giftees.relationship,
        birthday: giftees.birthday,
    }).from(giftees)
        .where(eq(giftees.userId, userId)) : [];
}

export const postGiftee = async () => {
    const { userId, isAuthenticated } = await auth();
    return userId && isAuthenticated ? await db.insert({
        name: giftees.name,
        relationship: giftees.relationship,
        birthday: giftees.birthday,
        userId: userId
    }).from(giftees)
        .where(eq(giftees.userId, userId)) : [];
}