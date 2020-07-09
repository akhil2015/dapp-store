import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(txnHash, block, from, to, amount) {
  return { txnHash, block, from, to, amount };
}

const rows = [
  createData('0xd2c2f9302c2033dfd9c211095a4fd6c98595f45b7f1afcfd95dcd043f872756c', 159, 6.0, 24, 4.0),
  createData('0x84e411c92b768c83efa5c6fa76303cbc3ff0ee6da12ee16f52e36f156b355618', 237, 9.0, 37, 4.3),
  createData('0xa3eabe47da48f37090121ebc90b8e902544f2bf30b023b1af34f1cbe50c0f307', 262, 16.0, 24, 6.0),
  createData('0xa742cc259342e9199cd88ea8f9c6fd35088ac78b0a84bd06a55ef4a809533613', 305, 3.7, 67, 4.3),
];
// export class SimpleTable extends React.Component {
//   render(){
//     const classes = useStyles();
//     return (
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell> TxnHash</TableCell>
//               <TableCell align="right">block</TableCell>
//               <TableCell align="right">from</TableCell>
//               <TableCell align="right">to</TableCell>
//               <TableCell align="right">amount</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.txnHash}
//                 </TableCell>
//                 <TableCell align="right">{row.block}</TableCell>
//                 <TableCell align="right">{row.from}</TableCell>
//                 <TableCell align="right">{row.to}</TableCell>
//                 <TableCell align="right">{row.amount}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     ); 
//   }
// }
export function SimpleTable() {
  const classes = useStyles();

  return (
    <div className="recent-txns" >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <div className="table-primary-header">
              Recent Transactions
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center"> TxnHash</TableCell>
            <TableCell align="right">block</TableCell>
            {/* <TableCell align="right">from</TableCell>
            <TableCell align="right">to</TableCell> */}
            <TableCell align="right">amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.txnHash}
              </TableCell>
              <TableCell align="right">{row.block}</TableCell>
              <TableCell align="right">{row.from}</TableCell>
              {/* <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}