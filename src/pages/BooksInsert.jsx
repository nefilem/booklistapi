import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class BooksInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            rating: '',
            time: '',
        }
    }

    handleChangeInputISBN13 = async event => {
        const isbn13 = event.target.value
        this.setState({ isbn13 })
    }

    handleChangeInputBookname = async event => {
        const bookname = event.target.value
        this.setState({ bookname })
    }

    handleChangeInputAuthorsname = async event => {
        const authorsname = event.target.value
        this.setState({ authorsname })
    }

    handleChangeInputImagelink = async event => {
        const imagelink = event.target.value
        this.setState({ imagelink })
    }

    handleIncludeBook = async () => {
        const { isbn13, bookname, authorsname, imagelink } = this.state        
        const payload = { isbn13, bookname, authorsname, imagelink, read:false, returned:false }

        await api.insertBook(payload).then(res => {
            window.alert(`Book inserted successfully`)
            this.setState({
                isbn13: '',
                bookname: '',
                authorsname: '',
                imagelink: '',
            })
        })
    }

    render() {
        const { isbn13, bookname, authorsname, imagelink } = this.state
        return (
            <Wrapper>
            <div style={{ height: 700, width: '85%', margin: '30px auto', background:'white', padding:'30px',borderRadius:'10px' }}>
                <Title>Create Book</Title>

                <Label>ISBN-13 ID: </Label>
                <InputText
                    type="text"
                    value={isbn13}
                    onChange={this.handleChangeInputISBN13}
                />

                <Label>Book Name: </Label>
                <InputText
                    type="text"
                    value={bookname}
                    onChange={this.handleChangeInputBookname}
                />

                <Label>Authors Name(s): </Label>
                <InputText
                    type="text"                    
                    value={authorsname}
                    onChange={this.handleChangeInputAuthorsname}
                />

                <Label>Image Link (URL): </Label>
                <InputText
                    type="text"
                    value={imagelink}
                    onChange={this.handleChangeInputImagelink}
                />

                <Button onClick={this.handleIncludeBook}>Add Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
        </div>
            </Wrapper>
        )
    }
}

export default BooksInsert
