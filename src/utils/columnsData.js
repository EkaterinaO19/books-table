import {Link} from "react-router-dom";
import {Button, Input, Space} from "antd";
import useDelete from "../hooks/useDelete";
import {SearchOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import Highlighter from 'react-highlight-words';


const ActionComponent = ({record}) => {
    const deleteBookHandler = useDelete("books");
    return (
        <Space size="middle">
            <Link to={record["@id"]}>show</Link>
            <Link to={record["@id"] + '/edit'}>edit</Link>
            <a onClick={() => deleteBookHandler.mutate(record)}>delete</a>
        </Space>
    );
};


export const useColumnSearchProps = (dataIndex) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    return ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    {/*<Button*/}
                    {/*    type="link"*/}
                    {/*    size="small"*/}
                    {/*    onClick={() => {*/}
                    {/*        close();*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    close*/}
                    {/*</Button>*/}
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        // onFilter: (value, record) =>
        //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
};


export const useColumns = () => {
    const title = useColumnSearchProps('title');
    const author = useColumnSearchProps('author');
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            render: (id) => <Link to={`books/${id}`}>{id}</Link>,
            // sortDirections: ['asc', 'desc']
        },
        {
            title: 'isbn',
            dataIndex: 'isbn',
            key: 'isbn',
            sorter: true,
            // sorter: (a, b) => a.isbn - b.isbn,
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            width: "20%",
            sorter: true,
            ...title
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            width: "40%",
        },
        {
            title: 'author',
            dataIndex: 'author',
            key: 'author',
            sorter: true,
            ...author
        },
        {
            title: 'publicationDate',
            dataIndex: 'publicationDate',
            key: 'publicationDate',
            width: "10%",
            render: (date) => (new Date(date)).toLocaleDateString(),
            sorter: true,
        },
        {
            title: 'reviews',
            dataIndex: 'reviews',
            render: (reviews) => <>{reviews.map(review => <Link to={`reviews/${review?.id}`}>{review?.id}</Link>)}</>,
            key: 'reviews',
        },
        {
            title: 'Action',
            key: 'id',
            render: (record) => <ActionComponent record={record}/>,
        },
    ]
    return (columns)
}