'use client'
import { getGifteesRows } from '@app/actions';
import { AddGiftee } from '@components/add-giftee';
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

export default function GifteesTable() {
    const [modalOpen, setModalOpen] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    useEffect(() => {
      async function fetchRows() {
        const rows = await getGifteesRows();
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
                            <TableCell>Name</TableCell>
                            <TableCell>Relationship</TableCell>
                            <TableCell>Birthday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.length > 0 && tableRows.map((row, index) => (
                            <TableRow
                                key={'row' + index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.relationship}</TableCell>
                                <TableCell>{dayjs(row.birthday).format('MM/DD/YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            <Button onClick={()=>setModalOpen(true)} variant='contained'>Add a New Giftee</Button>
            <AddGiftee open={modalOpen} handleClose={()=> setModalOpen(false)}/>
        </div>
    );
}