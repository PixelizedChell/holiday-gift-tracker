'use client'
import { postHoliday } from "@app/actions";
import CurrencyInput from "@components/currency-input";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField } from "@mui/material";

export default function Page() {
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
                <form action={postHoliday} id="add-holiday-form">
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-recipient-label">Giftee</InputLabel>
                            <Select
                                labelId="select-recipient-label"
                                id="select-recipient"
                                value={0}
                                label="Giftee"
                                required
                                onChange={() => { }}
                            >
                                <MenuItem value={10}>Giftee 1</MenuItem>
                                <MenuItem value={20}>Giftee 2</MenuItem>
                                <MenuItem value={30}>Giftee 3</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-holiday-label">Holiday</InputLabel>
                            <Select
                                labelId="select-holiday-label"
                                id="select-holiday"
                                value={0}
                                label="Holiday"
                                required
                                onChange={() => { }}
                            >
                                <MenuItem value={10}>Hannukah</MenuItem>
                                <MenuItem value={20}>Christmas</MenuItem>
                                <MenuItem value={30}>New Year's</MenuItem>
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
                        <CurrencyInput name="gift-price" label="Price" id="gift-price"/>
                        <FormControlLabel control={<Switch defaultChecked={false} name="gift-purchased" />} label="Already purchased?" />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }}>Cancel</Button>
                <Button type="submit" form="add-holiday-form">
                    Submit
                </Button>
            </DialogActions>
        </Paper>
    )
}