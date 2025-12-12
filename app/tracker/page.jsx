"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import UpdatePurchased from '@components/UpdatePurchased';
import { getTrackerRows } from '@app/actions';
import { useEffect, useState } from 'react';
export const dynamic = 'force-dynamic'

const purchasedText = (row) => {
  if (row.purchased) {
    return <Typography key={row.gift_name + " purchased"}>Purchased</Typography>
  } else {
    return <Typography key={row.gift_name + " not yet purchased"} className={'unpurchased-cell'} ><b>Not yet purchased</b></Typography>
  }
}

export default function TrackerTable() {
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    async function fetchRows() {
      const rows = await getTrackerRows();
      if (rows?.length > 0) {
        setTableRows(rows);
      }
    }
    fetchRows();
  }, [])
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
            <TableCell>Mark as purchased?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.length > 0 && tableRows.map((row, index) => (
            <TableRow
              key={'row' + index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.recipientName}
              </TableCell>
              <TableCell>{row.giftName}</TableCell>
              <TableCell><a href={row.link}>{row.link}</a></TableCell>
              <TableCell>{row.holidayName} {dayjs(row.holidayDate).format('MM/DD/YYYY')}</TableCell>
              <TableCell align="left">${row.price}</TableCell>
              <TableCell align="left">{purchasedText(row)}</TableCell>
              <TableCell align="left"><UpdatePurchased row={row} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}