import React, {useState} from 'react';
import {Alert, Button, Layout, Popconfirm, Table} from 'antd';
import {QueryClient, useQuery} from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorPage from "../../components/UI/ErrorPage";
import {useColumns} from "../../utils/columnsData";
import qs from 'qs';
import {Link} from "react-router-dom";
import useDeleteForId from "../../hooks/useDeleteForId";
import {BASE_URL, tokenFetch} from "../../utils/constants";
import {CheckCircleTwoTone} from "@ant-design/icons";


function TablePage(options) {
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

    const {isLoading, error, data}= useQuery({
        queryKey: ['booksData', tableParams],
        queryFn: ()=>tokenFetch(`/books?${qs.stringify(tableParams)}`)
    })
    console.log(data)


    function handleChange(pagination, sorter, filters) {
        let sortOrder;
        if (filters.order === "ascend") {
            sortOrder = 'ASC'
        } else if (filters.order === "descend") {
            sortOrder = 'DESC'
        } else {
            sortOrder = filters.order
        }

        const titleSearchInput = filters && filters.title ? filters.title.toString() : null;
            const authorSearchInput = filters && filters.author ? filters.title.toString() : null;

            if (titleSearchInput) {
                setTableParams(prevState => ({...prevState, title: titleSearchInput}));
            }
            if (authorSearchInput) {
                setTableParams(prevState => ({...prevState, author: authorSearchInput}))
            }


        setTableParams(prevState => ({
            ...prevState,
            page: pagination.current,
            itemsPerPage: pagination.pageSize,
            order: {
                [filters.field]: sortOrder
            },
        }))

    }
    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        setShowAlert(true)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    const alertMessage = `${selectedRowKeys.length} items selected`;
    const deleteMessage = `${selectedRowKeys.length} element(s) deleted`;

    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = async() => {
        setConfirmLoading(true);
        await Promise.all(selectedRowKeys.map(id=>deleteForIdMutation.mutateAsync(id)));
        setOpen(false);
        setConfirmLoading(false);
        setSelectedRowKeys([]);
        setShowAlert(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    if (isLoading) return <LoadingSpinner/>
    // if (error) return <ErrorPage/>

    return (
        <Layout>
            <div style={{display:'flex', justifyContent: 'flex-end',}}>
                <Button type="danger" style={{display:'flex',width:'fit-content', margin:'1em'}}><Link to={'/login'}>Logout</Link></Button>
            </div>
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
                dataSource={data?data['hydra:member']:[]}
                rowSelection={rowSelection}
                rowKey={data => data["@id"]}
                onChange={handleChange}
            />
        </Layout>
    );
}

export default TablePage;