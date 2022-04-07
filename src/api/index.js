import axios from 'axios'

const api = axios.create({
    baseURL: 'https://booklistapi.herokuapp.com',
})

export const insertBook = payload => api.post(`/booklist/create`, payload)
export const getAllBooks = () => api.get(`/booklist`)
export const updateBookById = (id, payload) => api.put(`/booklist/${id}`, payload)
export const deleteBookById = id => api.delete(`/booklist/${id}`)
export const getBookById = id => api.get(`/booklist/${id}`)

const apis = {
    insertBook,
    getAllBooks,
    updateBookById,
    deleteBookById,
    getBookById,
}

export default apis
