const axios = require('axios');
const express = require('express');
const { BookList }  = require('./models/booklist');

const apikey="AIzaSyACAH5_xjZzn3E6FcBpmUNsX4yxlRXLIfU";

/**
 * @param  {} req
 * @param  {} res
 */
let getJSON = async (req, res) => {    
    let response = await axios(`https://www.googleapis.com/books/v1/volumes?q=${req.body.bookname}+author:${req.body.authorsname}&key=${apikey}`)
    .then((response) => {        
        return response;
    });
    //console.log(response);
    return response;
};
/**
 * @param  {} req
 * @param  {} res
 */
exports.populate = async function(req, res) {                                      
            let response = await getJSON(req, res);            
            console.log(response.data);
        response.data.items.forEach((bookInfo) => {

          bookInfo.volumeInfo.industryIdentifiers.forEach((idInfo) => {              
              if (idInfo.type === "ISBN_13") {
                BookList.findOne({isbn13: idInfo.identifier})
                .then((found) => {
                    console.log(bookInfo.volumeInfo.imageLinks.thumbnail);               
                    if (!found) {
                        const book = new BookList({
                            isbn13: idInfo.identifier,
                            bookname: bookInfo.volumeInfo.title,
                            authorsname: bookInfo.volumeInfo.authors.join(", "),
                            read: false,
                            returned: false,
                            imagelink: bookInfo.volumeInfo.imageLinks.thumbnail
                        });

                        book.save()
                        .then((response) => {
                            
                        })
                    }
                }); 
                
                
              }
          })          
        
        })
        
            res.send(response.data);              


}
