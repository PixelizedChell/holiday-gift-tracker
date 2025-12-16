'use client'
import { getGifteesRows, getHolidayRows, postGift, postHoliday } from "@app/actions";
import CurrencyInput from "@components/currency-input";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
    const [gifteeRows, setGifteeRows] = useState([]);
    const [holidayRows, setHolidayRows] = useState([]);
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
    return (
        <Paper>
            <DialogTitle>Add A Gift</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the recipient, holiday and gift information.
                </DialogContentText>
                <br></br>
                <Divider />
                <br></br>
                <form action={postGift} id="add-gift-form">
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-recipient-label">Giftee</InputLabel>
                            <Select
                                labelId="select-recipient-label"
                                id="select-recipient"
                                label="Giftee"
                                name="gift-recipient"
                                required
                                control={false}
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
                                control={false}
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
                        />
                        <TextField
                            autoFocus
                            required
                            id="gift-link"
                            name="gift-link"
                            label="Link to Purchase"
                            fullWidth
                            variant="standard"
                        />
                        <CurrencyInput name="gift-price" label="Price" id="gift-price" />
                        <TextField
                            multiline
                            id="other-gift-info"
                            name="other-gift-info"
                            label="Other Information"
                            variant="standard"
                        />
                        <FormControlLabel control={<Switch defaultChecked={false} name="gift-purchased" value="true" />} label="Already purchased?" />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }}>Cancel</Button>
                <Button type="submit" form="add-gift-form">
                    Submit
                </Button>
            </DialogActions>
        </Paper>
    )
}