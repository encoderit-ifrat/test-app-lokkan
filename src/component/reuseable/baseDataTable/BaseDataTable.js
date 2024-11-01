import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { useState } from "react";
import BaseModal from "../baseModal/BaseModal";
import { Tooltip } from "@mui/material";
import ReferrerModal from "@/component/referrer/ReferrerModal";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const BaseDataTable = ({ headers, rowData }) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const handleViewModalOpen = (id) => {
    setRowId(id);
    setViewModalOpen(true);
  };
  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };
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
                  (row?.total_paid_amount || 0)?.toFixed(2)
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
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#1976d2",
                  cursor: "pointer",
                }}
                onClick={() => handleViewModalOpen(row?.id)}
              >
                To view
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BaseModal isShowing={viewModalOpen} isClose={handleViewModalClose}>
        <Tooltip title="Something">
          <>
            <ReferrerModal
              handleClose={handleViewModalClose}
              referrer_id={rowId}
            />
          </>
        </Tooltip>
      </BaseModal>
    </TableContainer>
  );
};

export default BaseDataTable;
