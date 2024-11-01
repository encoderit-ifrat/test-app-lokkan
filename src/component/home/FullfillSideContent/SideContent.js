import { Box, Grid } from '@mui/material'
import React from 'react'
import backgroundLaptop from '../../../../public/Images/laptopBackground.png'
import Laptop from '../../../../public/Images/laptop.png'
import Tree from '../../../../public/Images/tree.png'
import Image from 'next/image'

function SideContent() {
	return (
		<Grid
			container
			direction="row"
			justifyContent={{
				xs: 'flex-end',
				sm: 'flex-end',
				md: 'center',
				lg: 'flex-end',
			}}
			alignItems="center"
		>
			<Box
				sx={{
					position: 'absolute',
					// mb: { xs: 0, sm: 0, md: 0, lg: 45, xl: 0 },
				}}
			>
				<Image src={backgroundLaptop} alt="backgroundLaptop" />
			</Box>
			<Box
				sx={{
					display: { lg: 'flex', xl: 'inline' },
					position: 'relative',
					mt: 15,
				}}
			>
				<Image src={Laptop} alt="Laptop" />
				<Image height={400} width={200} src={Tree} alt="Tree" />
			</Box>
		</Grid>
	)
}

export default SideContent
