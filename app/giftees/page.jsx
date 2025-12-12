'use server'
import { getGifteesRows } from '@/helpers';
import { auth } from '@clerk/nextjs/server';
import GifteesTable from '@components/giftees-table';
import { Button } from '@mui/material';
import { purple } from '@mui/material/colors';

export default async function Page() {
    const { userId } = await auth()
    const rows = await getGifteesRows(userId)
    return (
        <GifteesTable rows={rows} />
    )
}