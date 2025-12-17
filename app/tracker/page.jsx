"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { getTrackerRows } from '@app/actions';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TrackerTableRow from '@components/tracker-table-row';
export const dynamic = 'force-dynamic'

export default function Page() {
  const [tableRows, setTableRows] = useState([]);
  
  async function fetchRows() {
    const rows = await getTrackerRows();
    if (rows?.length > 0) {
      setTableRows(rows);
    }
  }
  useEffect(() => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.length > 0 && tableRows.map((row, index) => <TrackerTableRow key={"row" + index} row={row} index={index} fetchRows={fetchRows} />)}
        </TableBody>
      </Table>
    </TableContainer >
  );
}