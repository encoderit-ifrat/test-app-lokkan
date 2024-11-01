import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";

function BaseModal({
  children,
  isShowing,
  isClose,
  disableBackdropClick,
  disableEscapeKeyDown,
}) {
  return (
    <Modal
      open={isShowing}
      onClose={(event, reason) => {
        if (
          (disableBackdropClick && reason === "backdropClick") ||
          (disableEscapeKeyDown && reason === "escapeKeyDown")
        ) {
          return;
        }
        isClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}

export default BaseModal;
