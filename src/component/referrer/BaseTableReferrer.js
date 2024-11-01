import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatBrazilianCurrency } from "@/utils/useUtilities";

const BaseTableReferrer = ({ headers, rowData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell
                key={i}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#002152",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#002152",
                }}
              >
                {row?.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#002152",
                }}
              >
                {formatBrazilianCurrency(
                  (+row?.total_commission_amount || 0)?.toFixed(2)
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#002152",
                }}
              >
                {formatBrazilianCurrency(
                  (+row?.total_paid_amount || 0)?.toFixed(2)
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#002152",
                }}
              >
                {formatBrazilianCurrency(
                  (row?.total_remaining_amount || 0)?.toFixed(2)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTableReferrer;
