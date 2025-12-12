"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { useState } from 'react';
import { AddGiftee } from './add-giftee';
import { Button } from '@mui/material';
export const dynamic = 'force-dynamic'

export default function GifteesTable({ rows }) {
    const [modalOpen, setModalOpen] = useState()
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
                        {rows?.map((row, index) => (
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