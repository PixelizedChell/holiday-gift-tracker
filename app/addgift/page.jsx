'use client'
import AddUpdateGift from "@components/add-update-gift";
import { Paper, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Page() {
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const handleClose = async () => {
        setSuccessSnackbarOpen(true);
    }
    return (
        <Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message="Gift added!"
            />
            <AddUpdateGift editing={false} row={{}} onClose={handleClose} />
        </Paper>
    )
}