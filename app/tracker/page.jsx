"use server";

import { getTrackerRows } from 'helpers';
import { auth } from '@clerk/nextjs/server';
import TrackerTable from '@components/tracker-table';

export default async function Page() {
  
  const { userId } = await auth()
  const rows = await getTrackerRows(userId)
  return (
    <TrackerTable rows={rows} />
  );
}