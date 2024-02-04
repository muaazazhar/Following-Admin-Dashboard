import React, { useEffect, useState } from 'react';
import UserManagementComponent from '../../Components/UserManagement';
import { useNavigate, useLocation } from 'react-router-dom';
import dev, { prod } from '../../services/axios-client';

export default function UserManagementContainer() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [reload, setReload] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const per_page = 100;

    const getAll = (page) => {
        prod.get(`/admin/getAllInfluencers?page=${page}&per_page=${per_page}`, {
            headers: { token: user.token },
        })
            .then(function (response) {
                console.log(response);
                setUsersData(response.data);
            })
            .catch(function (error) {
                if (error.response && error.response.status === 403) {
                    console.log(
                        '403 Forbidden error. Clearing local storage...',
                    );
                    localStorage.removeItem('token'); // Clear the token
                    navigate('/');
                }
            });
    };

    // Verify / No verify user
    const approveUser = (email, verification) => {
        dev.put(
            `/admin/approveUser`,
            { email: email, isApproved: verification },
            {
                headers: { token: user.token },
            },
        )
            .then(function (res) {
                console.log(res);
                setReload(!reload);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    // Delete Users
    const deleteUser = (email) => {
        dev.put(
            `/admin/deleteUser`,
            { email: email },
            {
                headers: { token: user.token },
            },
        )
            .then(function (res) {
                console.log(res);
                setReload(!reload);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        getAll(currentPage);
    }, [currentPage, reload]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <UserManagementComponent
            usersData={usersData?.data}
            totalUsers={usersData?.total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} // Pass setCurrentPage as a prop
            onPageChange={handlePageChange}
            reload={reload}
            setReload={setReload}
            onVerify={approveUser}
            onDelete={deleteUser}
        />
    );
}
