'use client'
import { getGifteesRows, getHolidayRows, postGift, updateGift } from "@app/actions";
import CurrencyInput from "@components/currency-input";
import { Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddUpdateGift({ editing, row, onClose, fetchRows }) {
    const [gifteeRows, setGifteeRows] = useState([]);
    const [holidayRows, setHolidayRows] = useState([]);
    const [selectedGiftee, setSelectedGiftee] = useState(row?.gifteeId || '');
    const [selectedHoliday, setSelectedHoliday] = useState(row?.holidayId || '');
    useEffect(() => {
        async function fetchGifteeRows() {
            const rows = await getGifteesRows();
            if (rows?.length > 0) {
                setGifteeRows(rows);
            }
        }
        fetchGifteeRows();
    }, [])
    useEffect(() => {
        async function fetchHolidayRows() {
            const rows = await getHolidayRows();
            if (rows?.length > 0) {
                setHolidayRows(rows);
            }
        }
        fetchHolidayRows();
    }, [])
    useEffect(() => {
        if (row?.gifteeId && gifteeRows.length > 0) {
            setSelectedGiftee(row.gifteeId);
        }
    }, [row?.gifteeId, gifteeRows])
    useEffect(() => {
        if (row?.holidayId && holidayRows.length > 0) {
            setSelectedHoliday(row.holidayId);
        }
    }, [row?.holidayId, holidayRows])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        if (editing) {
            await updateGift(formData, row.giftId);
        } else {
            await postGift(formData);
        }
        handleClose && handleClose();
        fetchRows && fetchRows();
    }

    return (
        <Container>
            <DialogTitle>{editing ? 'Update Gift Information' : 'Add A Gift'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please {editing ? 'update' : 'enter'} the recipient, holiday and gift information.
                </DialogContentText>
                <br></br>
                <Divider />
                <br></br>
                <form onSubmit={handleSubmit} id="add-gift-form">
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-recipient-label">Giftee</InputLabel>
                            <Select
                                labelId="select-recipient-label"
                                id="select-recipient"
                                label="Giftee"
                                name="gift-recipient"
                                required
                                value={selectedGiftee}
                                onChange={(e) => setSelectedGiftee(e.target.value)}
                            >
                                {gifteeRows.length > 0 && gifteeRows.map(row => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-holiday-label">Holiday</InputLabel>
                            <Select
                                labelId="select-holiday-label"
                                id="gift-holiday"
                                label="Holiday"
                                name="gift-holiday"
                                required
                                value={selectedHoliday}
                                onChange={(e) => setSelectedHoliday(e.target.value)}
                            >
                                {holidayRows.length > 0 && holidayRows.map(row => <MenuItem key={row.id} value={row.id}>{row.holidayName}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            required
                            id="gift-name"
                            name="gift-name"
                            label="Gift Name"
                            fullWidth
                            variant="standard"
                            defaultValue={row?.giftName}
                        />
                        <TextField
                            autoFocus
                            required
                            id="gift-link"
                            name="gift-link"
                            label="Link to Purchase"
                            fullWidth
                            variant="standard"
                            defaultValue={row?.link}
                        />
                        <CurrencyInput name="gift-price" label="Price" id="gift-price" defaultValue={row?.price} />
                        <TextField
                            multiline
                            id="other-gift-info"
                            name="other-gift-info"
                            label="Other Information"
                            variant="standard"
                            defaultValue={row?.otherInfo}
                        />
                        <FormControlLabel control={<Switch defaultChecked={row?.purchased || false} name="gift-purchased" value="true" />} label="Already purchased?" />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose || (() => {})}>Cancel</Button>
                <Button type="submit" form="add-gift-form">
                    {editing ? 'Update' : 'Submit'}
                </Button>
            </DialogActions>
        </Container>
    )
}