import {Link} from "react-router-dom";

export const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (id) => <Link to={`books/${id}`}>{id}</Link>
    },
    {
        title: 'isbn',
        dataIndex: 'isbn',
        key: 'isbn',
        sorter: (a, b) => a.isbn - b.isbn,
    },
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        width: "20%",
        sorter: (a, b) => a.title.localeCompare(b.title)
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'author',
        dataIndex: 'author',
        key: 'author',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.author.localeCompare(b.author)
    },
    {
        title: 'publicationDate',
        dataIndex: 'publicationDate',
        key: 'publicationDate',
        render: (date) => (new Date(date)).toLocaleDateString(),
        sorter: (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
    },
    {
        title: 'reviews',
        dataIndex: 'reviews',
        render: (reviews) => <>{reviews.map(review => review.body)}</>,
        key: 'reviews',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Edit</a>,
    },
    ]






