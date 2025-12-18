"use client";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import { deleteGift } from '@app/actions';
import { useState } from 'react';
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

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
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
                    <IconButton onClick={setEditModalOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip title="Delete">
                    <IconButton onClick={() => setDeleteModalOpen(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <Dialog open={editModalOpen} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
                <AddUpdateGift editing={true} row={row} onClose={handleCloseEditModal} fetchRows={fetchRows} />
            </Dialog>
            <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal} maxWidth="md" fullWidth>
                <Container>
                    <DialogTitle>Delete Gift?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete this gift?</DialogContentText>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                            <Button onClick={async () => {
                                await deleteGift(row.giftId);
                                handleCloseDeleteModal();
                                await fetchRows();
                            }}>
                                Delete
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Container>
            </Dialog>
        </TableRow>
    )
}