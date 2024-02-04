import { styled } from 'styled-components';
import { Pagination } from 'antd';

export const AntPagination = styled(Pagination)`
    display: flex;
    justify-content: center;

    .ant-pagination-item,
    .ant-pagination-prev,
    .ant-pagination-next {
        border: 1px solid #dadde1;
        border-radius: 0;
        margin: 0 !important;
        padding: 0 10px;
        font-size: 16px !important;
        @media (max-width: 768px) {
            font-size: 0.8rem !important;
        }
    }

    .ant-pagination-next {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .ant-pagination-prev {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .ant-pagination-item {
        a {
            color: inherit;
        }

        &.ant-pagination-item-active {
            background-color: #272727;
            border: 1px solid #272727;
            a {
                color: #fff;
            }
        }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
        a {
            color: inherit;
        }
    }

    .ant-pagination-prev {
        margin-right: 10px;
    }

    .ant-pagination-next {
        margin-left: 10px;
    }

    .ant-pagination-options-size-changer {
        display: none;
    }
`;
