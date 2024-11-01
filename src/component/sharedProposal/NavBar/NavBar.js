import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider, createTheme } from '@mui/material'

const NavBar = (props) => {
	const { handleDrawerToggle, drawerWidth, isDarkModeClose, handleTheme } =
		props

	const theme = createTheme({
		typography: {
			fontFamily: ['Lato', 'Inter', 'sans-serif'].join(','),
		},
	})

	const [anchorEl, setAnchorEl] = React.useState(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					flexGrow: 1,
					display: {
						xs: 'inline',
						sm: 'inline',
						md: 'inline',
						lg: 'none',
					},
				}}
			>
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
						background: '#F2F5F6',
						color: '#D6D7E3',
						boxShadow: 'none',
						borderRadius: '12px 12px 0 0',
					}}
				>
					<Toolbar>
						<IconButton
							// color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>

						<Box sx={{ flexGrow: 1 }} />
					</Toolbar>
				</AppBar>
			</Box>
		</ThemeProvider>
	)
}

export default NavBar
