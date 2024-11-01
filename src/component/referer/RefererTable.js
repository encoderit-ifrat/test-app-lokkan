import React from "react";
import BaseDataTable from "../reuseable/baseDataTable/BaseDataTable";
import { Box } from "@mui/material";
import { useGetRefererQuery } from "@/queries/useGetRefererQuery";

function RefererTable() {
  const { data: refererData } = useGetRefererQuery();
  return (
    <Box>
      <BaseDataTable
        headers={[
          "Pessoas nomeadas",
          "Quantia",
          "Valor recebido",
          "Saldo a receber",
          "Nomeados",
        ]}
        rowData={refererData}
      />
    </Box>
  );
}

export default RefererTable;
