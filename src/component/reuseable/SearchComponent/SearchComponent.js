import React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import DirectionsIcon from '@mui/icons-material/Directions'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Grid, Typography } from '@mui/material'
import searchIcon from '../../../../public/Images/search.png'
import Image from 'next/image'
import en from 'locales/en'
import pt from 'locales/pt'

function SearchComponent({
	marginY,
	handleSearch,
	handleSearchBtn,
	languageName,
}) {
	const t = languageName === 'en' ? en : pt
	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{ marginY: marginY }}
		>
			<Paper
				component="form"
				sx={{
					// p: "2px 4px",
					display: 'flex',
					alignItems: 'center',
					// border: "1px solid red",
					boxShadow: 'none',
					border: '1px solid #D3D3DF',
					borderRadius: '4px',
					width: {
						xs: '100%',
						sm: '100%',
						md: '80%',
						xl: '80%',
						lg: '80%',
					},
				}}
			>
				<Grid sx={{ paddingRight: 2, width: '100%' }}>
					{/* <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
					<InputBase
						fullWidth
						sx={{ ml: 1, flex: 1 }}
						placeholder={t['search']}
						inputProps={{
							'aria-label': 'search google maps',
							style: {
								color: '#9F9FA9',
								fontSize: '20px',
							},
						}}
						onChange={(e) => handleSearch(e)}
					/>
				</Grid>
				<Box
					sx={{
						backgroundColor: '#00C1B4',
						padding: '1vh',
						borderRadius: '0px 4px 4px 0px',
						boxShadow: '0px 4px 34px rgba(0, 0, 0, 0.08)',
						border: '1px solid #00C1B4',
						width: {
							xs: '25%',
							sm: '25%',
							md: '15%',
							lg: '15%',
							xl: '15%',
						},
						textAlign: 'center',
					}}
					onClick={handleSearchBtn}
				>
					<Image src={searchIcon} alt="search" />
				</Box>
			</Paper>
		</Grid>
	)
}

export default SearchComponent
