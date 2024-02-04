import React, { useState } from 'react';
import {
    Container,
    SecButton,
    MobileContainer,
    ResponsiveMenu,
    MenuIcon,
    IconContainer,
} from './styles';
import {
    GlobalOutlined,
    SettingOutlined,
    UserOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { CiDark } from 'react-icons/ci';
import DropDown from '../Dropdown';
import SideMenu from '../SideMenu';
import {
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import authService from '../../services/authService';
import SubHeaderText from '../Text/SubHeaderText';

import back_btn from '../../assets/back_btn.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [menu, setMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(user);
    return (
        <>
            <Container>
                <img
                    src={back_btn}
                    style={{ cursor: 'pointer' }}
                    onClick={goBack}
                />
                <IconContainer>
                    <MenuIcon size={'large'} onClick={() => setMenu(!menu)} />
                    <ResponsiveMenu showMenu={menu}>
                        <SideMenu />
                    </ResponsiveMenu>
                </IconContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SubHeaderText
                        text={`Hello ${
                            user.user.merchant?.name
                                ? user.user.merchant.name
                                : user.user.username
                        }`}
                    />
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar size="middle" icon={<UserOutlined />} />
                    </IconButton>
                    <SecButton>
                        <SettingOutlined />
                    </SecButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                authService.logOut();
                                handleClose();
                            }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Container>
            <MobileContainer>
                <IconContainer>
                    <MenuOutlined onClick={() => setMenu(!menu)} />
                    <ResponsiveMenu showMenu={menu}>
                        <SideMenu setMenu={setMenu} />
                    </ResponsiveMenu>
                </IconContainer>
                <DropDown
                    header={true}
                    name={
                        user.user.merchant?.name
                            ? user.user.merchant.name
                            : user.user.username
                    }
                />
            </MobileContainer>
        </>
    );
}
