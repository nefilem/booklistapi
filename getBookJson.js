const axios = require('axios');
const express = require('express');
const { BookList }  = require('./models/booklist');

const apikey="AIzaSyACAH5_xjZzn3E6FcBpmUNsX4yxlRXLIfU";

/**
 * This function retrieves data from google books and returns it to the
 * populate routine.  
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
 * Takes the data from google books api and uses this to populate our 
 * database with books.
 * @param  {} req
 * @param  {} res
 */
exports.populate = async function(req, res) {                                      
            let response = await getJSON(req, res);            
            console.log("return from google books", response.data);

        response.data.items.forEach((bookInfo) => {
            console.log("book info from google books response", bookInfo);
          bookInfo.volumeInfo.industryIdentifiers.forEach((idInfo) => {              
              if (idInfo.type === "ISBN_13") {
                BookList.findOne({isbn13: idInfo.identifier})
                .then((found) => {
                    //console.log(bookInfo.volumeInfo.imageLinks.thumbnail);               
                    if (!found) {  
                        // Added the following chunk of code to try and fix errors displayed on
                        // heroku when deployed to there, didn't seem to fix it and is a little
                        // inefficient but does stop a few errors slipping through and crashing
                        // the app anyway.
                        //
                        let imageLinkVal = "";
                        let returnedVal = false;
                        let readVal = false;
                        let authorsNameVal = "";
                        let bookNameVal = "";
                        let isbn13Val = "";
                        //
                        //bookinfo = undefined;      
                        // if (!(bookInfo.volumeInfo.imageLinks) === undefined) {
                        //     if (!(bookInfo.volumeInfo.imageLinks.thumbnail === undefined)) {
                        //         imageLinkVal = bookInfo.volumeInfo.imageLinks.thumbnail;
                        //     }                            
                        // }
                        imageLinkVal = bookInfo.volumeInfo.imageLinks.thumbnail;
                        if (!(bookInfo.volumeInfo.authors === undefined)) {
                            authorsNameVal = bookInfo.volumeInfo.authors.join(", ");
                        }
                        if (!(bookInfo.volumeInfo.title === undefined)) {
                            bookNameVal = bookInfo.volumeInfo.title;
                        }
                        if (!(idInfo.identifier === undefined)) {
                            isbn13Val = idInfo.identifier;
                        }
                        // End of the chunk of code trying to fix heroku error!

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
