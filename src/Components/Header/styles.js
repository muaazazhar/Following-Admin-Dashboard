import styled from 'styled-components';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export const MenuIcon = styled(MenuOutlined)`
    display: none;
    @media (max-width: 768px) {
        display: block;
        color: #6c5ffc;
    }
`;

export const IconContainer = styled.div`
    position: relative;
`;

export const ResponsiveMenu = styled.div`
    position: absolute !important;
    left: 0;
    top: 2rem;
    z-index: 100;
    display: ${(props) => (props.showMenu ? 'block' : 'none')};
`;

export const SecButton = styled(Button)`
    border: none;
    box-shadow: 0 0 0 0;
    font-size: 16px;
    color: #6c5ffc;
`;

export const Container = styled.div`
    @media (max-width: 480px) {
        display: none;
    }
    position: relative;
    display: flex;
    padding: 1rem 2rem;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    background-color: white;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const MobileContainer = styled.div`
    display: none;
    @media (max-width: 480px) {
        display: block;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        font-size: 14px;
        background-color: white;
    }
`;
