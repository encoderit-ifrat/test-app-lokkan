import { IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import React from 'react'

function BaseCloseButton({handleClose}) {
  return (
    <IconButton
      sx={{
        top: 8,
        right: 8,
        width: 40,
        height: 40,
        position: 'absolute',
        bgcolor: '#FFEBEE',
        ':hover': {
          color: 'red',
          bgcolor: '#FFCDD2',
          cursor:'pointer'
        },
      }}
      onClick={handleClose}
    >
      <CloseOutlinedIcon />
    </IconButton>
  )
}

export default BaseCloseButton
