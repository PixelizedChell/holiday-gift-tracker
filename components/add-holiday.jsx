import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postHoliday } from "@app/actions";

export function AddHoliday({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <Container>
                <div className={'bg-white rounded-sm text-neutral-600'}>
                    <div className="flex flex-col gap-4 px-6 py-8">
                        <DialogTitle>Add A New Holiday</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the holiday information to the list.
                            </DialogContentText>
                            <form action={postHoliday} onSubmit={handleClose} id="add-holiday-form">
                                <Stack spacing={3}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="name"
                                        name="holiday-name"
                                        label="Holiday Name"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Date *" name="date" required />
                                    </LocalizationProvider>
                                </Stack>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" form="add-holiday-form">
                                Submit
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Container>
        </Dialog>
    );
}
