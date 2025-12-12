import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function AddGiftee({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <Container>
                <div className={'bg-white rounded-sm text-neutral-600'}>
                    <div className="flex flex-col gap-4 px-6 py-8">
                        <DialogTitle>Add A New Giftee</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter your giftee's information to add them to the list.
                            </DialogContentText>
                            <form onSubmit={() => { }} id="add-giftee-form">
                                <Stack spacing={3}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        required
                                        id="relationship"
                                        name="relationship"
                                        label="Relationship"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Birthday *" required/>
                                    </LocalizationProvider>
                                </Stack>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" form="add-giftee-form">
                                Submit
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            </Container>
        </Dialog>
    );
}
