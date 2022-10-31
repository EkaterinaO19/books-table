import React from 'react';
import {Table} from "antd";
import {columns} from "./columnsData";

function TableComponent(props) {
    return (
        <>
            <Table columns={columns} dataSource={props.data} rowKey={(data)=>data.id} />
        </>
    );
}

export default TableComponent;