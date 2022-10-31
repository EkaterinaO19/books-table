import React from 'react';
import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


function BookCard() {
    return (
        <>
            <Link to={'/'}><LeftOutlined/>Back</Link>
            <h1 style={{display:'flex', justifyContent:'center'}}>Edit Book <p>dncndnc</p></h1>
            <form style={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
                <Input style={{width:'400px'}} placeholder={'ISBN'} />
                <Input style={{width:'400px'}} placeholder={'Title'} />
                <TextArea style={{width:'400px'}} placeholder={'Description'} rows={4} />
                <Input style={{width:'400px'}} placeholder={'Author'} />
                <Input style={{width:'400px'}} placeholder={'Publication Date'} />
                <TextArea style={{width:'400px'}} placeholder={'Reviews'} rows={4} />
                <Button type="primary">Submit</Button>
            </form>
        </>
    );
}

export default BookCard;