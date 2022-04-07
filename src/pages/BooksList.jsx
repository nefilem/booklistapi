import React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import api from '../api'

import styled from 'styled-components'





const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateBook extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/book/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteBook extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the book ${this.props.id} permanently?`,
            )
        ) {
            api.deleteBookById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class ReadBook extends Component {
    ReadUser = event => {
        event.preventDefault()

        let setreadval = !Boolean(this.props.val);

        if (
            window.confirm(
                `Do you want to set the read status of the book ${this.props.id} to ${setreadval}?`,
            )
        ) {
            api.readBookById(this.props.id, !Boolean(this.props.val));
            window.location.reload();
        }
    }

    render() {
        return <ReadBook onClick={this.readUser}>{this.setreadval}</ReadBook>
    }
}


class BooksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllBooks().then(books => {
            console.log("Books:",books);                        
            this.setState({
                books: books.data.map((element) => {return ({id: element._id, isbn13: element.isbn13, bookname: element.bookname, authorsname: element.authorsname, imagelink: element.imagelink, read: element.read, returned: element.returned})}),
                isLoading: false,
            })
        })
    }

    render() {
        const { books, isLoading } = this.state
        console.log('TCL1: BooksList -> render -> books', books)
        
        const columns = [
            {
                headerName: 'ISBN No.',
                field: 'isbn13',
                width: 150             
            },
            {
                headerName: 'Book Name',
                field: 'bookname',
                width: 300
            },
            {
                headerName: 'Authors Name(s)',
                field: 'authorsname',
                width: 300
            },
            {
                headerName: 'Book Image',
                field: 'imagelink',
                width: 150,
                renderCell: (params) => {
                    return (
                      <div>
                        <img src={params.row.imagelink} alt='' />
                        {params.row.username}
                      </div>)
                }              
            },
            {
                headerName: 'Read',
                field: 'read',
                width: 100
            },
            {
                headerName: 'Returned',
                field: 'returned',
                width: 100
            },
            {
                Header: 'Delete',
                field: '',
                renderCell: (props) => {
                    return (
                        <span>
                            <DeleteBook id={props.row.isbn13} />
                        </span>
                    )
                },
            },
            // {
            //     Header: '',
            //     field: '',
            //     Cell: function(props) {
            //         return (
            //             <span>
            //                 <UpdateBook id={props.original.isbn13} />
            //             </span>
            //         )
            //     },
            // },
        ]

        //let showTable = true
        console.log("Books3:",books);
        // if (books === undefined) {
        //     showTable = false;
        // } else if (!books.length) {
        //     showTable = false
        //  }
                  
console.log(columns);

        return (
            <Wrapper>
                <h1>Book List</h1>
                <div style={{ height: 900, width: '100%' }}>
             {<DataGrid
                rows={books}
                columns={columns} 
                pageSize={12}
                rowHeight={300} />}            
                
                </div>
            </Wrapper>
        )
    }
}

export default BooksList
