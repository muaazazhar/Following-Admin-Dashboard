import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
`;
export const SideMenuContainer = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
    flex: 1.5;
    padding-top: 5rem;
    background-color: white;
    min-height: 90vh;
    z-index: 100;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const HeaderContainer = styled.div`
    flex: 8.5;
`;

export const ContentContainer = styled.div`
    padding: 2.375rem 2.0625rem;
    background-color: #ffffff;
    @media (max-width: 480px) {
        padding: 0;
    }
`;
