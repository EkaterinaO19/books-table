import React, {useRef, useState} from 'react';
import {Alert, Button, Input, Layout, message, Popconfirm, Space, Table} from 'antd';
import {useQuery} from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorPage from "../../components/UI/ErrorPage";
import {useColumns} from "../../utils/columnsData";
import qs from 'qs';
import {Link} from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useDeleteForId from "../../hooks/useDeleteForId";


function TablePage(props) {
    const columns = useColumns();
    const deleteForIdMutation = useDeleteForId('Books');
    const [tableParams, setTableParams] = useState({
        page: 1,
        itemsPerPage: 10,
    });

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        setShowAlert(true)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };


    const {isLoading, error, data} = useQuery({
        queryKey: ['booksData', tableParams],
        queryFn: () =>
            fetch(`https://demo.api-platform.com/books?${qs.stringify(tableParams)}`)
                .then((res) => res.json()),
    });


    const alertMessage = `${selectedRowKeys.length} items selected`;
    const deleteMessage = `${selectedRowKeys.length} element(s) deleted`;

    if (isLoading) return <LoadingSpinner/>
    if (error) return <ErrorPage/>

    function handleChange(pagination, filters, sorter) {
        const titleSearchInput = filters && filters.title ? filters.title.toString() : null;
        const authorSearchInput = filters && filters.author ? filters.title.toString() : null;

        if(titleSearchInput){
            setTableParams(prevState => ({...prevState, title: titleSearchInput}));
        } else if(authorSearchInput){
            setTableParams(prevState => ({...prevState, author: authorSearchInput}))
        } else { return null; }

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


    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = async() => {
        setConfirmLoading(true);
        await  Promise.all(selectedRowKeys.map(id=>deleteForIdMutation.mutateAsync(id)));
        setOpen(false);
        setConfirmLoading(false);
        setSelectedRowKeys([]);
        setShowAlert(false);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };



    return (
        <Layout>
            <h1 style={{display:'flex', justifyContent: 'center', fontSize:'30px', margin:'10px'}}>Book List</h1>
            <Button type="primary" style={{display:'flex',width:'fit-content'}}><Link to={'/create'}>Create Book</Link></Button>

            {showAlert &&
                <Alert message={alertMessage} type="info" closable showIcon
                       action={
                           <Popconfirm
                               title={deleteMessage}
                               placement="leftBottom"
                               cancelText="Undo"
                               open={open}
                               onConfirm={handleOk}
                               okButtonProps={{
                                   loading: confirmLoading,
                               }}
                               onCancel={handleCancel}
                           >
                            <Button onClick={showPopconfirm} size="small" danger>Delete</Button>
                           </Popconfirm>
                       }
                />
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
                rowKey={(data) => data["@id"]}
                onChange={handleChange}
            />
        </Layout>
    );
}

export default TablePage;