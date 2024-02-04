import React from "react";
import {
  MainContainer,
  CardHeader,
  CardTitle,
  CardBody,
  LisenceDiv,
  StatusDiv,
  TableContainer,
  Text,
  Mobile,
  Desktop,
  CardFooter,
} from "./styles";

import { AntTable } from "../Table/styles";
import DropDown from "../Dropdown";
import Pagination from "../Pagination";
import { Tooltip } from "antd";
import ExportButton from "../Buttons/ExportButton";

export default function UserManagementComponent({
  usersData,
  totalUsers,
  currentPage,
  setCurrentPage,
  onPageChange,
  totalPages,
  onVerify,
  onDelete,
  reload,
  setReload,
}) {
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page); // Notify the parent component about the page change
    setReload(!reload);
  };
  const columns = [
    {
      title: (
        <Tooltip title="Sr. No">
          <span>Sr. No</span>
        </Tooltip>
      ),
      key: "srNo",
      fixed: "left",
      render: (__, ___, index) => (
        <Tooltip title={`Sr. No: ${index + 1 + (currentPage - 1) * pageSize}`}>
          <span>{index + 1 + (currentPage - 1) * pageSize}</span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="NAME">
          <span>NAME</span>
        </Tooltip>
      ),
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (__, { name }) => (
        <Tooltip title={`Name: ${name}`}>
          <Text>{name}</Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="EMAIL">
          <span>EMAIL</span>
        </Tooltip>
      ),
      dataIndex: "email",
      key: "email",
      fixed: "left",
      render: (__, { email }) => {
        return (
          <Tooltip title={email}>
            <Text>
              <u>{email}</u>
            </Text>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <Tooltip title="PHONE NUMBER">
          <span>PHONE NUMBER</span>
        </Tooltip>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      fixed: "left",

      render: (__, { phoneNumber }) => (
        <Tooltip title={`phone number: ${phoneNumber}`}>
          <Text>{phoneNumber}</Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="LICENSED">
          <span>LICENSED</span>
        </Tooltip>
      ),
      dataIndex: "isLicensed",
      key: "isLicensed",
      fixed: "left",

      render: (__, { isLicensed }) => {
        return (
          <LisenceDiv lisenced={isLicensed}>
            {isLicensed ? "Yes" : "No"}
          </LisenceDiv>
        );
      },
    },
    {
      title: (
        <Tooltip title="SNAPCHAT">
          <span>SNAPCHAT</span>
        </Tooltip>
      ),
      dataIndex: "snapchat",
      key: "snapchat",
      fixed: "left",
      render: (__, { snapchat }) => (
        <Tooltip title={`ID: ${snapchat}`}>
          <Text>{snapchat || "- -"}</Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="INSTAGRAM">
          <span>INSTAGRAM</span>
        </Tooltip>
      ),
      dataIndex: "instagram",
      key: "instagram",
      fixed: "left",
      render: (__, { instagram }) => (
        <Tooltip title={`ID: ${instagram}`}>
          <Text>{instagram || "- -"}</Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="TIKTOK">
          <span>TIKTOK</span>
        </Tooltip>
      ),
      dataIndex: "tiktok",
      key: "tiktok",
      fixed: "left",
      render: (__, { tiktok }) => (
        <Tooltip title={`ID: ${tiktok}`}>
          <Text>{tiktok || "- -"}</Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="STATUS">
          <span>STATUS</span>
        </Tooltip>
      ),
      dataIndex: "isVerified",
      key: "isVerified",
      fixed: "left",

      render: (__, { isApproved }) => {
        return (
          <StatusDiv status={isApproved}>
            {isApproved ? "Verified" : "Pending"}
          </StatusDiv>
        );
      },
    },
    {
      title: " ",
      dataIndex: "actions",
      key: "actions",
      fixed: "left",

      render: (__, { id, isApproved, email }) => {
        return (
          <DropDown
            id={id}
            email={email}
            state={isApproved}
            onVerify={onVerify}
            onDelete={onDelete}
            currentPage={currentPage}
          />
        );
      },
    },
  ];

  return (
    <MainContainer>
      <CardHeader>
        <CardTitle>Waitlist Users</CardTitle>
        <Desktop>
          <ExportButton userData={usersData} />
        </Desktop>
        <Mobile>
          <ExportButton userData={usersData} mobileView={true} />
        </Mobile>
      </CardHeader>
      {usersData && usersData.length > 0 ? (
        <CardBody>
          <TableContainer>
            <AntTable
              className="antTable"
              size="middle"
              columns={columns}
              dataSource={usersData} // Use the passed usersData prop
              pagination={false}
            />
          </TableContainer>
        </CardBody>
      ) : !usersData ? (
        <p>Loading...</p>
      ) : (
        <p style={{ fontSize: "13px", color: "gray", fontWeight: 500 }}>
          No Users to display
        </p>
      )}
      <CardFooter>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalUsers={totalUsers}
        />
      </CardFooter>
    </MainContainer>
  );
}
