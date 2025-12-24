'use server'
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { gift, giftees, holiday } from '../db/schema';
import { auth } from '@clerk/nextjs/server';

export const getTrackerRows = async () => {
    // AI Assistance was used to help translate my initial SQL statement to Drizzle's formatting. I then used this as well as Drizzle's documentation to create the other calls to Drizzle.
    const { userId, isAuthenticated } = await auth();
    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        return await db.select({
            giftId: gift.id,
            gifteeId: giftees.id,
            recipientName: giftees.name,
            giftName: gift.giftName,
            link: gift.link,
            price: gift.price,
            otherInfo: gift.otherInfo,
            holidayId: holiday.id,
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
            .where(eq(holiday.userId, userId))
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

export const updateGift = async (formData, giftId) => {
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
        await db.update(gift).set({
            gifteeId: gifteeId,
            holidayId: holidayId,
            giftName: giftName,
            link: link,
            price: price,
            otherInfo: otherInfo,
            purchased: purchased,
            userId: userId
        })
        .where(eq(gift.id, giftId));
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

export const deleteGift = async (giftId) => {
    const { userId, isAuthenticated } = await auth();

    if (!userId || !isAuthenticated) {
        return { error: 'Not authenticated' };
    }
    try {
        await db.delete(gift).where(eq(gift.id, giftId));
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}