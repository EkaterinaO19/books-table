import {Button, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import 'antd/dist/antd.css';
import Search from "antd/es/input/Search";
import TableComponent from "./components/TableComponent";
import {useQuery, useQueryClient} from "react-query";
import React from "react";
import {useNavigate} from "react-router-dom";



function App() {
    const { isLoading, error, data, isError, isSuccess } = useQuery('booksData', () =>
        fetch('https://demo.api-platform.com/books').then(res =>
            res.json()
        ), {
        isError: (error) => {
            alert(error.message)
        }
    });

    const navigate = useNavigate();
    const handelToCreateBook = () => {
        navigate('books/create')
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

  return (
    <>
        <Layout>
            <h1 style={{display:'flex', justifyContent: 'center', fontSize:'30px', margin:'10px'}}>Book List</h1>
            <div style={{display: 'flex', justifyContent:'right', marginBottom:'20px'}}>
                <Search
                    placeholder="input search text"
                    style={{
                       width: 200,
                    }}
                />
                <Button onClick={handelToCreateBook} type="primary">Create Book</Button>
            </div>
            <Content>
                {data['hydra:member'] && Array.isArray(data['hydra:member'] )&& <TableComponent
                    data={data['hydra:member']} />
                }
            </Content>
        </Layout>
    </>
  );
}

export default App;
