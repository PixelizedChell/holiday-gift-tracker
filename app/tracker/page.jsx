import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { neon } from '@netlify/neon';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

const sql = neon();
const user_id = 1;
const rows = await sql("SELECT recipients.name AS recipient_name, gift.gift_name, gift.link, gift.price, holiday.holiday_name, holiday.date AS holiday_date, purchased FROM gift JOIN recipients ON recipients.id = gift.recipient_id OR gift.recipient_id = NULL JOIN users ON users.id = recipients.user_id JOIN holiday ON holiday.id = gift.holiday_id WHERE users.id = $1;", [user_id])
export const dynamic = 'force-dynamic'

const purchasedText = (row) => {
  if (row.purchased) {
    return <Typography key={row.gift_name + " purchased"}>Purchased</Typography>
  } else {
    return <Typography key={row.gift_name + " not yet purchased"} className={'unpurchased-cell'} ><b>Not yet purchased</b></Typography>
  }
}

export default function Page() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Recipient</TableCell>
            <TableCell>Gift Name</TableCell>
            <TableCell>Gift Link</TableCell>
            <TableCell>Holiday</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Purchased</TableCell>
            <TableCell>Mark as purchased?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell key={row.recipient_name} component="th" scope="row">
                {row.recipient_name}
              </TableCell>
              <TableCell>{row.gift_name}</TableCell>
              <TableCell><a href={row.link}>{row.link}</a></TableCell>
              <TableCell>{row.holiday_name} {dayjs(row.holiday_date).format('MM/DD/YYYY')}</TableCell>
              <TableCell align="left">${row.price}</TableCell>
              <TableCell align="left">{purchasedText(row)}</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}