import styled from 'styled-components';
import { Menu } from 'antd';
const fontFamily = 'IBM Plex Sans';

export const MainMenu = styled(Menu)`
    font-family: ${fontFamily};
    .ant-menu-submenu {
        background-color: white;
    }

    .ant-menu-item:hover {
        background-color: white !important;
    }

    .ant-menu-sub {
        background: white !important;
    }

    .ant-menu-item-selected {
        background-color: white !important;
        color: #6c5ffc !important;
    }

    .ant-menu-item-group-title {
        font-size: 12px !important;
        font-weight: 700 !important;
        padding-left: 24px;
    }

    .ant-menu-item {
        font-size: 13.3px;
        color: #74829c;
    }

    .ant-menu-submenu-title {
        font-size: 15px;
        font-weight: 600 !important;
        color: #74829c;
    }

    .ant-menu-submenu-selected > .ant-menu-submenu-title {
        color: #6c5ffc !important;
    }

    .ant-menu-item.ant-menu-item-selected,
    .ant-menu-submenu-title.ant-menu-submenu-open {
        font-size: 15px;
        color: #6c5ffc;
    }
`;
