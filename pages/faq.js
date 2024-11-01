import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import * as React from 'react'
import notifyImage from '../public/Images/notify.png'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import pt from 'locales/pt'
import en from 'locales/en'
import { useState } from 'react'

const drawerWidth = 240

export default function Faq({ language }) {
  const [myValue, setMyValue] = useState(language || 'pt')

  const t = myValue === 'en' ? en : pt
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        background: '#F2F5F6',
        minHeight: '100vh',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 1, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            color: '#002152',
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
            ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
            mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
          }}
        >
          Faq
        </Typography>
        <Image src={notifyImage} alt="notify" />
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant="p"
              sx={{
                color: '#1A1859',
                fontSize: '20px',
                fontWeight: `${expanded === 'panel1' ? '700' : '400'}`,
                lineHeight: '27px',
              }}
            >
              How do I become a partner broker?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="p"
              sx={{
                color: '#32414C',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '25px',
              }}
            >
              You are on the right page! Complete the registration, send the
              requested documents and wait for the confirmation email of your
              registration.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              variant="p"
              sx={{
                color: '#1A1859',
                fontSize: '20px',
                fontWeight: `${expanded === 'panel2' ? '700' : '400'}`,
                lineHeight: '27px',
              }}
            >
              How will I be activated on the platform to start answering?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="p"
              sx={{
                color: '#32414C',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '25px',
              }}
            >
              You are on the right page! Complete the registration, send the
              requested documents and wait for the confirmation email of your
              registration.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              variant="p"
              sx={{
                color: '#1A1859',
                fontSize: '20px',
                fontWeight: `${expanded === 'panel3' ? '700' : '400'}`,
                lineHeight: '27px',
              }}
            >
              What documents do I need to become a partner broker?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="p"
              sx={{
                color: '#32414C',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '25px',
              }}
            >
              You are on the right page! Complete the registration, send the
              requested documents and wait for the confirmation email of your
              registration.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}
