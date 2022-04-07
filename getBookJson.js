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
                    //console.log(bookInfo.volumeInfo.imageLinks.thumbnail);               
                    if (!found) {  
                        //
                        let imageLinkVal = "";
                        let returnedVal = false;
                        let readVal = false;
                        let authorsNameVal = "";
                        let bookNameVal = "";
                        let isbn13Val = "";
                        //
                        //bookinfo = undefined;      
                        if (!(bookinfo.volumeInfo.imageLinks) === undefined) {
                            if (!(bookInfo.volumeInfo.imageLinks.thumbnail === undefined)) {
                                imageLinkVal = bookInfo.volumeInfo.imageLinks.thumbnail;
                            }                            
                        }
                        if (!(bookInfo.volumeInfo.authors === undefined)) {
                            authorsNameVal = bookInfo.volumeInfo.authors.join(", ");
                        }
                        if (!(bookInfo.volumeInfo.title === undefined)) {
                            bookNameVal = bookInfo.volumeInfo.title;
                        }
                        if (!(idInfo.identifier === undefined)) {
                            isbn13Val = idInfo.identifier;
                        }
                        //                        
                        const book = new BookList({
                            isbn13: isbn13Val,
                            bookname: bookNameVal,
                            authorsname: authorsNameVal,
                            read: readVal,
                            returned: returnedVal,
                            imagelink: imageLinkVal
                        });

                        book.save()
                        .then((response) => {
                           //console.log("created:", book); 
                        })                         
                    }
                }); 
                
                
              }
          })          
        
        })
        
            res.send(response.data);              


}
