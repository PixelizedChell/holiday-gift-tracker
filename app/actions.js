'use server'
import { eq, or } from 'drizzle-orm';
import { db } from '../db/index';
import { gift, giftees, holiday } from '../db/schema';
import { auth } from '@clerk/nextjs/server';

export const getTrackerRows = async () => {
    const { userId, isAuthenticated } = await auth()
    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        return await db.select({
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
                eq(giftees.id, gift.gifteeId),
            )
            .innerJoin(holiday, eq(holiday.id, gift.holidayId))
            .where(eq(giftees.userId, userId))
    } catch (error) {
        return { error: error.message };
    }
}

export const getGifteesRows = async () => {
    const { userId, isAuthenticated } = await auth();
    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        return await db.select({
            id: giftees.id,
            name: giftees.name,
            relationship: giftees.relationship,
            birthday: giftees.birthday,
        }).from(giftees)
            .where(eq(giftees.userId, userId));
    } catch (error) {
        return { error: error.message };
    }
}

export const postGiftee = async (formData) => {
    const { userId, isAuthenticated } = await auth();
    const gifteeName = formData.get("name");
    const relationship = formData.get("relationship")
    const birthday = new Date(formData.get("birthday")).toISOString()

    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        const giftee = await db.insert(giftees).values({
            name: gifteeName,
            relationship: relationship,
            birthday: birthday,
            userId: userId
        }).returning({ gifteeId: giftees.id })
        
        await db.insert(holiday).values({
            holidayName: `${gifteeName}'s Birthday`,
            date: birthday,
            userId: userId,
            gifteeId: giftee[0].gifteeId
        })
        
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

export const postHoliday = async (formData) => {
    const { userId, isAuthenticated } = await auth();
    const holidayName = formData.get("holiday-name");
    const holidayDate = new Date(formData.get("date")).toISOString()

    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        await db.insert(holiday).values({
            holidayName: holidayName,
            date: holidayDate,
            userId: userId
        })
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

export const getHolidayRows = async () => {
    const { userId, isAuthenticated } = await auth();

    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        return await db.select({
            id: holiday.id,
            holidayName: holiday.holidayName,
            holidayDate: holiday.date,
        })
            .from(holiday)
            .leftJoin(
                giftees,
                eq(holiday.gifteeId, giftees.id),
            )
            .where(eq(giftees.userId, userId))
    } catch (error) {
        return { error: error.message };
    }
}

export const postGift = async (formData) => {
    const { userId, isAuthenticated } = await auth();

    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }

    const gifteeId = parseInt(formData.get("gift-recipient"));
    const holidayId = parseInt(formData.get("gift-holiday"));
    const giftName = formData.get("gift-name");
    const link = formData.get("gift-link");
    const price = formData.get("gift-price")?.replace('$', '').replace(/,/g, '') || '0';
    const otherInfo = formData.get("other-gift-info") || '';
    const purchased = formData.get("gift-purchased") === 'on' || formData.get("gift-purchased") === 'true';

    try {
        await db.insert(gift).values({
            gifteeId: gifteeId,
            holidayId: holidayId,
            giftName: giftName,
            link: link,
            price: price,
            otherInfo: otherInfo,
            purchased: purchased,
            userId: userId
        });
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}