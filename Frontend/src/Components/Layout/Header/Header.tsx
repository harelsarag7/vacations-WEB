import { Avatar, Menu, MenuItem } from "@mui/material";
import deepOrange from "@mui/material/colors/deepOrange";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { logout } from "../../../App/authSlice";
import logoTextWhitePng from "../Header/logo-vacations-text-white-png.png"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const settings = ['Logout'];
function Header(): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userRedux = useSelector((state: any) => state.auth)
  const [pages, setPages] = useState<string[]>(['Home', 'Blog'])
  
  
  useEffect(() => {
    if(userRedux?.role === "ADMIN"){
      setPages(['Home', 'Likes', 'Blog'])
    }
  }, [])

    function logoutButton(){ 
        dispatch(logout());
        navigate("/login")
    }    




    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
        
        // navigate("/vacationslikes")
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  

    return (



        <div className="Header">
            {/* <div className="container">
               
                <div className="logo"><img src={logoTextAliceBlue} alt="" /></div>
		    	
                <div className="categories-container">
			        <div className="categories">
                    </div>
                 </div>

                 <div>
                 <div>{userRedux? 
                 <div className="avatar-header" onClick={logoutButton} >
                         <Avatar 
                          sx={{ bgcolor: deepOrange[500] }}>{userRedux.firstName?.charAt(0).toLocaleUpperCase()}
                            </Avatar>
                         <div className="logout-text">Logout</div> 
                 </div>
                 : <></>
                        }</div>
                </div>




            </div> */}
                <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {/* <img src={logoTextAliceBlue} width={180} alt="" /> */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
   


                  <MenuItem key={page} onClick={() => {
                    navigate(`/${page}`)
                    handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
          <img src={logoTextWhitePng} width={180} alt="" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* LOGO */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                    handleCloseNavMenu()
                    navigate(`/${page}`)
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userRedux.firstName?.charAt(0).toLocaleUpperCase()} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={logoutButton}>
                  <Typography  textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
        </div>
    );
}

export default Header;




