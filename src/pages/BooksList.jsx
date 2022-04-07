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
                `Do tou want to delete the book ${this.props.id} permanently?`,
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
                books: books.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { books, isLoading } = this.state
        console.log('TCL: BooksList -> render -> books', this.books)
        
        const columns = [
            {
                Header: 'ID',
                accessor: 'isbn13',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'bookname',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'authorsname',               
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'imagelink',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteBook id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateBook id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        console.log("Books3:",books);
        if (!books.length) {
            showTable = false
         }
         
        return (
            <Wrapper>
                <h1>ghgh</h1>
                <div style={{ height: 300, width: '100%' }}></div>
             {showTable && (     
                           
                
                <DataGrid
                data={books}
                columns={columns}
                loading={isLoading}
                defaultPageSize={10}
                showPageSizeOptions={true}
                minRows={0}
                 />
                )}

            </Wrapper>
        )
    }
}

export default BooksList
