import React, { useState } from 'react';

import {
    HomeOutlined,
    CaretRightOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';
import { MainMenu } from './styles';
import { useNavigate } from 'react-router-dom';

export default function SideMenu({ setMenu = null }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [selectedPath, setSelectedPath] = useState([]);

    const [openKeys, setOpenKeys] = useState([]);

    const onSelect = (event) => {
        setSelectedKeys(event.selectedKeys);
        setSelectedPath(event.keyPath);
    };

    const onDeselect = (event) => {
        setSelectedKeys(event.selectedKeys);
        setSelectedPath(event.keyPath);
    };

    const onOpenChange = (event) => {
        setOpenKeys(event);
    };

    console.log(user);

    const items = [
        getItem(
            'MAIN',
            'g1',
            null,
            [
                getItem(
                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        Dashboard
                    </span>,
                    'sub1',
                    <HomeOutlined width={'15px'} height="15px" />,
                ),
            ],
            'group',
        ),

        getItem(
            'MODULES',
            'g2',
            null,
            [
                user.user.role.id < 2 &&
                    getItem('User Management', 'sub2', null, [
                        getItem(
                            'Merchants',
                            'sub2-sub1',
                            selectedPath.includes('sub2-sub1') ? (
                                <CaretDownOutlined />
                            ) : (
                                <CaretRightOutlined />
                            ),
                            [
                                getItem('Create New', '6'),
                                getItem('All Merchants', '5'),
                                getItem('All Documents', '8'),
                                getItem('Waitlist Users', '7'),
                            ],
                        ),
                    ]),
                user.user.role.id < 2 &&
                    getItem('Influencer', 'sub3', null, [
                        getItem('Create Influencer', '10', null),
                        getItem('Influencer Record', '9', null),
                    ]),
                getItem('Campaign Management', 'sub4', null, [
                    getItem('Create Campaign', '11', null),
                    getItem('Monitor Campaign', '12', null),
                ]),
                user.user.role.id < 2 &&
                    getItem('Payments Management', 'sub5', null, [
                        getItem('Manage Payments', '13', null),
                        getItem('Influencer Withdrawal Request', '14', null),
                    ]),
                user.user.role.id < 2 &&
                    getItem('Support Management', 'sub6', null, [
                        getItem('Manage', '15', null),
                    ]),
                getItem('Report Management', 'sub7', null, [
                    getItem('Monitor & analyze', '16', null),
                    getItem('Campaign Performance', '17', null),
                    getItem('Payment Transactions', '18', null),
                ]),
                user.user.role.id < 2 &&
                    getItem('Settings', 'sub8', null, [
                        getItem('System Parameters', '19', null),
                    ]),
            ],
            'group',
        ),
    ];
    const onClick = (e) => {
        switch (e.key) {
            case 'sub1':
                navigate('/');
                setMenu && setMenu(false);
                break;
            case '5':
                navigate('/user-management-module');
                setMenu && setMenu(false);
                break;
            case '6':
                navigate('/create-merchant-account');
                setMenu && setMenu(false);
                break;
            case '7':
                navigate('/waitlist-users');
                setMenu && setMenu(false);
                break;
            case '8':
                navigate('/all-documents');
                setMenu && setMenu(false);
                break;
            case '10':
                navigate('/create-influencer-account');
                setMenu && setMenu(false);
                break;
            case '9':
                navigate('/influencer-records');
                setMenu && setMenu(false);
                break;
            case '11':
                navigate('/create-new-campaign');
                setMenu && setMenu(false);
                break;
            case '12':
                navigate('/campaign-records');
                setMenu && setMenu(false);
                break;
            case '13':
                navigate('/manage-payments');
                setMenu && setMenu(false);
                break;
            case '14':
                navigate('/payment-withdraw-requests');
                setMenu && setMenu(false);
                break;
            case '15':
                navigate('/support-manage');
                setMenu && setMenu(false);
                break;
            case '16':
                navigate('/reporting-monitor');
                setMenu && setMenu(false);
                break;
            case '17':
                navigate('/reporting-campaigns');
                setMenu && setMenu(false);
                break;
            case '18':
                navigate('/reporting-transactions');
                setMenu && setMenu(false);
                break;
            case '19':
                navigate('/settings');
                setMenu && setMenu(false);
                break;
            default:
                // Handle other keys or do nothing
                setMenu && setMenu(false);
                break;
        }
    };

    return (
        <MainMenu
            onClick={onClick}
            style={{
                width: '16.875rem',
                border: 'none',
                height: '90vh',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            onDeselect={onDeselect}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
        />
    );
}
