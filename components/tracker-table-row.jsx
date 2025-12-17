"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import { getTrackerRows } from '@app/actions';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddUpdateGift from './add-update-gift';
export const dynamic = 'force-dynamic'

const purchasedText = (row) => {
    if (row.purchased) {
        return <Typography key={row.gift_name + " purchased"}>Purchased</Typography>
    } else {
        return <Typography key={row.gift_name + " not yet purchased"} className={'unpurchased-cell'} ><b>Not yet purchased</b></Typography>
    }
}

export default function TrackerTableRow({ row, index, fetchRows }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const handleClose = () => {
        setEditModalOpen(false);
    };

    return (
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
            <TableCell>
                <Tooltip title="Edit">
                    <IconButton onClick={() => setEditModalOpen(true)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell><Tooltip title="Delete"><IconButton><DeleteIcon /></IconButton></Tooltip></TableCell>
            <Dialog open={editModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
                <AddUpdateGift editing={true} row={row} onClose={handleClose} fetchRows={fetchRows} />
            </Dialog>
        </TableRow>
    )
}