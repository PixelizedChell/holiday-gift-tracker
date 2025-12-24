"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getTrackerRows } from '@app/actions';
import { useEffect, useState } from 'react';
import TrackerTableRow from '@components/tracker-table-row';
import { Typography } from '@mui/material';
import { useUser } from '@clerk/nextjs';
export const dynamic = 'force-dynamic'

export default function Page() {
    const { isSignedIn } = useUser();
    const [tableRows, setTableRows] = useState([]);

    async function fetchRows() {
        const rows = await getTrackerRows();
        setTableRows(rows);
    }
    useEffect(() => {
        fetchRows();
    }, [])

    const loggedInComponents = () => {
        if (tableRows.length > 0) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Gift Name</TableCell>
                                <TableCell>Gift Link</TableCell>
                                <TableCell>Holiday</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Purchased</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map((row, index) =>
                                <TrackerTableRow key={"row" + index} row={row} index={index} fetchRows={fetchRows} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else {
            return (
                <Typography className="mb-6 text-lg" sx={{ fontWeight: 'bold' }}>
                    You have no gifts listed. Please add giftees, holidays, and gifts.
                </Typography>
            )
        }
    }
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <h1 className="mb-4">Gift Tracker</h1>
                <p className="mb-6 text-lg">
                    Track gifts to buy for friends, family, and more that you plan to buy, along with links and prices.
                </p>
                {isSignedIn ? loggedInComponents() :
                    <Typography className="mb-6 text-lg" sx={{ fontWeight: 'bold' }}>
                        You are not logged in. Please log in to see your gifts.
                    </Typography>}
            </section>
        </div>
    );
}