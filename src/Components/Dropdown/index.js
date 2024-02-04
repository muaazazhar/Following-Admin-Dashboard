import React from 'react';
import { AntdDropdown, MenuButton } from './styled';
import {
    ExportOutlined,
    DeleteOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
} from '@ant-design/icons';
import {
    GlobalOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { CiDark } from 'react-icons/ci';
import { Avatar } from 'antd';
import TextWithIcon from '../TextWithIcon';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import authService from '../../services/authService';

export default function DropDown({
    header,
    id,
    state,
    onVerify,
    onDelete,
    currentPage,
    email,
    name,
}) {
    const items = !header
        ? [
              {
                  key: 1,
                  label: (
                      <Link to={`/user/${id}?page=${currentPage}`}>
                          <TextWithIcon
                              text={'View'}
                              icon={<ExportOutlined />}
                              color={'#74829C'}
                          />
                      </Link>
                  ),
              },
              {
                  key: 2,
                  label: (
                      <TextWithIcon
                          text={'Delete'}
                          icon={<DeleteOutlined />}
                          color={'#E94E51'}
                          onClick={() => onDelete(email)}
                      />
                  ),
              },
              {
                  key: 3,
                  label: state ? (
                      <TextWithIcon
                          text={'Not Verified'}
                          icon={<CloseCircleFilled />}
                          color={'#E94E51'}
                          onClick={() => onVerify(email, false)}
                      />
                  ) : (
                      <TextWithIcon
                          text={'Verify'}
                          icon={<CheckCircleFilled />}
                          color={'#01AB3B'}
                          onClick={() => onVerify(email, true)}
                      />
                  ),
              },
          ]
        : [
              {
                  key: 1,
                  label: (
                      <TextWithIcon
                          text={'Settings'}
                          icon={<SettingOutlined />}
                          color={'#01AB3B'}
                      />
                  ),
              },
              {
                  key: 2,
                  label: (
                      <TextWithIcon
                          text={name}
                          icon={<UserOutlined />}
                          color={'#01AB3B'}
                      />
                  ),
              },
              {
                  key: 3,
                  label: (
                      <TextWithIcon
                          onClick={() => {
                              authService.logOut();
                          }}
                          text={'Logout'}
                          icon={<Logout />}
                          color={'#01AB3B'}
                      />
                  ),
              },
          ];
    return (
        <AntdDropdown menu={{ items }} placement="bottomRight">
            <MenuButton header={header}>
                {header ? (
                    <Avatar size="middle" icon={<UserOutlined />} />
                ) : (
                    <BsThreeDotsVertical size={'1rem'} />
                )}
            </MenuButton>
        </AntdDropdown>
    );
}
