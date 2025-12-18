'use client'
import AddUpdateGift from "@components/add-update-gift";
import { Paper } from "@mui/material";

export default function Page() {
    return (
        <Paper>
            <AddUpdateGift editing={false} row={{}} onClose={() => {}}/>
        </Paper>
    )
}