import React, {useRef, useState} from 'react';
import {Alert, Button, Input, Space, Table} from 'antd';
import {useQuery} from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorPage from "../../components/UI/ErrorPage";
import {useColumns} from "../../utils/columnsData";
import qs from 'qs';


function TablePage(props) {
    const columns = useColumns();
    const [tableParams, setTableParams] = useState({
        page: 1,
        itemsPerPage: 10,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        setShowAlert(true)
    };


    const {isLoading, error, data} = useQuery({
        queryKey: ['booksData', tableParams],
        queryFn: () =>
            fetch(`https://demo.api-platform.com/books?${qs.stringify(tableParams)}`)
                .then((res) => res.json()),
    });

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    if (isLoading) return <LoadingSpinner/>
    if (error) return <ErrorPage/>
    const alertMessage = `${selectedRowKeys.length} items selected`;


    function handleChange(pagination, filters, sorter) {

        const titleSearchInput = filters && filters.title ? filters.title.toString() : null;
        const authorSearchInput = filters && filters.author ? filters.title.toString() : null;

        if(titleSearchInput){
            setTableParams(prevState => ({...prevState, title: titleSearchInput}));
        } else if(authorSearchInput){
            setTableParams(prevState => ({...prevState, author: authorSearchInput}))
        } else { return null; }


        console.log(titleSearchInput,authorSearchInput)

        let sortOrder;
        if (sorter.order === 'ascend') {
            sortOrder = 'ASC'
        } else if (sorter.order === 'descend') {
            sortOrder = 'DESC'
        } else {
            return sortOrder;
        }
        setTableParams(prevState => ({
            ...prevState,
            page: pagination.current,
            itemsPerPage: pagination.pageSize,
            order: {
                [sorter.field]: sortOrder
            },

        }))
    }

    return (
        <>
            {showAlert &&
                <Alert message={alertMessage} type="info" closable showIcon action={
                    <Button size="small" danger>Delete</Button>}/>
            }
            <Table
                pagination={{
                    current: tableParams.page,
                    pageSize: tableParams.itemsPerPage,
                    total: data && data['hydra:totalItems']
                }}
                columns={columns}
                dataSource={data['hydra:member']}
                rowSelection={rowSelection}
                rowKey={(data) => data.id}
                onChange={handleChange}
            />
        </>
    );
}

export default TablePage;