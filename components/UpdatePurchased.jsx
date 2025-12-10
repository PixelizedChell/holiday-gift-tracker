'use client'

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';


export default function UpdatePurchased(props) {
    const { row } = props;
    const [item, setItem] = useState("")
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItem(row.purchased)
    }, [row.purchased])

    return (
        <FormControl fullWidth>
            <InputLabel id="gift-purchased">Gift purchased?</InputLabel>
            <Select
                labelId="gift-purchased"
                id="select-gift-purchased"
                value={item}
                label="Purchased?"
                onChange={(e) => setItem(e.target.value)}
                defaultValue={row.purchased ? 'Yes' : 'No'}
            >
                <MenuItem disabled={!!item} value={"true"}>Yes</MenuItem>
                <MenuItem disabled={!item} value={"false"}>No</MenuItem>
            </Select>
        </FormControl >
    );
}