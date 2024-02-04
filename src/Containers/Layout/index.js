import React, { Children } from 'react';
import {
    MainContainer,
    SideMenuContainer,
    HeaderContainer,
    ContentContainer,
} from './styles';
import Header from '../../Components/Header';
import SideMenu from '../../Components/SideMenu';

export default function Layout({ children }) {
    return (
        <MainContainer>
            <SideMenuContainer>
                <SideMenu />
            </SideMenuContainer>
            <HeaderContainer>
                <Header />
                <ContentContainer>{children}</ContentContainer>
            </HeaderContainer>
        </MainContainer>
    );
}
