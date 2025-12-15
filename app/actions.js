'use server'
import { eq, or, isNull } from 'drizzle-orm';
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

export const postGiftee = async (formData) => {
    const { userId, isAuthenticated } = await auth();
    const gifteeName = formData.get("name");
    const relationship = formData.get("relationship")
    const birthday = new Date(formData.get("birthday")).toISOString()
    if (userId && isAuthenticated) {
        return await db.insert(giftees).values({
            name: gifteeName,
            relationship: relationship,
            birthday: birthday,
            userId: userId
        }).returning({gifteeId: giftees.id})
            .then(async (giftee) => {
                return await db.insert(holiday).values({
                    holidayName: `${gifteeName}'s Birthday`,
                    date: birthday,
                    userId: userId,
                    gifteeId: giftee[0].gifteeId
                })
            })
    }
}

export const postHoliday = async (formData) => {
    const { userId, isAuthenticated } = await auth();
    const holidayName = formData.get("holiday-name");
    const holidayDate = new Date(formData.get("date")).toISOString()
    return userId && isAuthenticated && await db.insert(holiday).values({
        holidayName: holidayName,
        date: holidayDate,
        userId: userId
    })
}

export const getHolidayRows = async () => {
    const { userId, isAuthenticated } = await auth();
    return isAuthenticated && userId ? await db.select({
        holidayName: holiday.holidayName,
        holidayDate: holiday.date,
    })
        .from(holiday)
        .leftJoin(
            giftees,
            eq(holiday.gifteeId, giftees.id),
        )
        .where(
            or(
                eq(giftees.userId, userId),
            ),
        ) : [];
}

export const postGift = async (formData) => {
    const { userId, isAuthenticated } = await auth();
    const gifteeName = formData.get("name");
    const relationship = formData.get("relationship")
    const birthday = new Date(formData.get("birthday"))
    return userId && isAuthenticated && await db.insert(giftees).values({
        name: gifteeName,
        relationship: relationship,
        birthday: birthday,
        userId: userId
    })
}