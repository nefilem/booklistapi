const { ObjectId } = require('mongodb');
//const uri = "mongodb+srv://dbMongo:pa55word@cluster0.trvjy.mongodb.net/booklist?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { BookList }  = require('./models/booklist');

const createError = require('http-errors');

// exports.showReturned = function(req, res, next){
//     //res.send(booklist.filter((element) => { return element.returned = true))
// }

/**
 * Returns a list of all books from the database
 * @param  {} req
 * @param  {} res
 */
exports.index = async function (req,res) {
    BookList.find()
     .then( (booklistitem) => res.send(booklistitem));
}

/**
 * Returns list of book(s) based on given isbn13 id
 * @param  {} req
 * @param  {} res
 */
exports.show = async function (req,res) {
    BookList.find({isbn13: req.params.id})
     .then( (booklistitem) => res.send(booklistitem));
}

/**
 * Deletes the first item it finds with the isbn13 id given, 
 * given that we shouldn't be able to add multiple books of 
 * the same isbn13 number it should only find one anyway.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.delete = function(req,res,next){
      BookList.deleteOne({isbn13: req.params.id})
        .then( (result) => {
            if(result.deletedCount){
                res.send({result:true});
            }
            else {
                return(next(createError(404,"no book found with that isbn13")))
            }
            
        })	
}

 /**
  * Allows updating of book information for the book with the given
  * isbn13 id number.
  * @param  {} req
  * @param  {} res
  * @param  {} next
  */
 exports.update = async function(req,res,next){
    let missingInfo = [];
    if(!req.body.bookname){        
        missingInfo.push("book name");
    }

    if(!req.body.authorsname){
        missingInfo.push("authors name");
    }

    if (!req.body.isbn13)

    if (missingInfo.length>0) {
        let errorMsg = "";
        if (missingInfo.length = 1) { errorMsg = " is a required input."; } else { errorMsg = " are required inputs."; }
        return (next(createError(400, missingInfo.join(" and ") + errorMsg)));
    }
    
    BookList.findOne({isbn13: req.params.id})
    .then( (book) => {
        if(!book){
            return (next(createError(404,"no such isbn13 number")))
        }
        book.bookname = req.body.bookname;
        book.authorsname = req.body.authorsname;
        book.read = req.body.read;
        book.returned = req.body.returned;

        book.save()
            .then( () => res.send({result: true}))
    });
    
}

/**
 * Allows the user to add book information for a single book, 
 * if a duplicate isbn13 id number is found then the create 
 * function will return an error.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.create = async function (req,res,next){
    let missingInfo = [];
    if(!req.body.bookname){
        missingInfo.push("book name");
    }

    if(!req.body.authorsname){
        missingInfo.push("authors name");
    }

    if (missingInfo.length>0) {
        let errorMsg = "";
        if (missingInfo.length = 1) { errorMsg = " is a required input."; } else { errorMsg = " are required inputs."; }
        return (next(createError(400, missingInfo.join(" and ") + errorMsg)));
    }

    let found = false;

/*
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
*/


    BookList.findOne({isbn13: req.body.isbn13})
    .then( (found) => {
        if (!found) {
            const book = new BookList({
                    isbn13: req.body.isbn13,
                    bookname: req.body.bookname,
                    authorsname: req.body.authorsname,
                    read: req.body.read,
                    returned: false,
                    imagelink: req.body.imagelink
            });

            book.save()
            .then((response) => {
                res.send({result:true});
            });
        } else {
            res.send(next(createError(400, "Duplicate entry, not added to database")));
        }
    });
}

/**
 * Allows update of read or returned status, for example...
 * "/booklist/1234/returned/true" will update the returned 
 * status to true for isbn13 id 1234
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.updatestatus = async function(req,res,next){
    let missingInfo = [];

    if (!req.params.id) {missingInfo.push("ISBN Number")};

    if (!req.params.type) {
        missingInfo.push("type");
    }

    if (!req.params.status) {
        missingInfo.push("status");
    }

    if (missingInfo.length>0) {
        let errorMsg = "";
        if (missingInfo.length = 1) { errorMsg = " is a required input."; } else { errorMsg = " are required inputs."; }
        return (next(createError(400, missingInfo.join(" and ") + errorMsg)));
    }

    BookList.findOne({isbn13: req.params.id})
    .then( (book) => {
        console.log(book);
        
        if(!book){
            return (next(createError(404,"no such isbn13 number")))
        }        
        if (req.params.type === "read") {
            console.log("updating read");
            book.read = Boolean(req.params.status);
        } else if (req.params.type === "returned") {
            console.log("updating returned");
            book.returned = Boolean(req.params.status);
        }
    
        book.save()
            .then( () => res.send({result: true}))
    });
}

/**
 * Returns the status list for returned/read for example...
 * "/booklist/returned/true" returns a list of all books that
 * have the returned status set to true.
 * @param  {} req
 * @param  {} res
 */
exports.statuslist = async function (req,res) {
    if (req.params.id === "read") {
        BookList.find({read: Boolean(req.params.status)})
        .then( (booklistitem) => res.send(booklistitem));
    } else if (req.params.id === "returned") {
        BookList.find({returned: Boolean(req.params.status)})
        .then( (booklistitem) => res.send(booklistitem));
    }
}

/**
 * Returns a list based on given search criteria, for instance...
 * "/booklist/bookname/bronte" would return a list of all books that
 * match bronte in the bookname title. Uses regex too so the match
 * doesn't have to be exact, the given value can be anywhere in the
 * data for given field.
 * @param  {} req
 * @param  {} res
 */
exports.search = async function (req,res) {

    let filter = undefined;

    switch (req.params.field) {
        case "bookname":
            filter = {bookname: { "$regex": String(req.params.value), "$options": "i" } };
            break;
        case "authorsname":
            filter = {authorsname: { "$regex": String(req.params.value), "$options": "i" } };
            break;
        case "read":
            filter = {read: Boolean(req.params.value)};
            break;
        case "returned":
            filter = {returned: Boolean(req.params.value)};
            break;
        case "isbn13":
            filter = {isbn13: { "$regex": String(req.params.value), "$options": "i" } };
            break;
        case "imagelink":
            filter = {imagelink: { "$regex": String(req.params.value), "$options": "i" } };
            break;
        default:
            return "invalid field to search";
            break
    }
    
    BookList.find(filter)
    .then((booklistitem) => { console.log(booklistitem); res.send(booklistitem); });
}