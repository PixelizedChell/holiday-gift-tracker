'use client'
import { getHolidayRows } from '@app/actions';
import { AddHoliday } from '@components/add-holiday';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function HolidaysTable() {
    const [modalOpen, setModalOpen] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    useEffect(() => {
      async function fetchRows() {
        const rows = await getHolidayRows();
        if (rows?.length > 0) {
          setTableRows(rows);
        }
      }
      fetchRows();
    }, [modalOpen])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="giftees table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Holiday Name</TableCell>
                            <TableCell>Holiday Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.length > 0 && tableRows.map((row, index) => (
                            <TableRow
                                key={'row' + index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.holidayName}</TableCell>
                                <TableCell>{dayjs(row.holidayDate).format('MM/DD/YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            <Button onClick={()=>setModalOpen(true)} variant='contained'>Add a New Holiday</Button>
            <AddHoliday open={modalOpen} handleClose={()=> setModalOpen(false)}/>
        </div>
    );
}