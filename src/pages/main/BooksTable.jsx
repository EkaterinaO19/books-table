import React from 'react';
import {Table} from "antd";
import {columns} from "../../utils/columnsData";

function BooksTable(props) {
    return (
        <Table columns={columns} dataSource={props.data} rowKey={(data)=>data.id} />
    );
}

export default BooksTable;