const express = require('express');
const router = express.Router();
const booklist = require('./booklistController');
const getbookjson = require('./getBookJson');

router.get('/booklist/getRandomBooks', booklist.getRandomBooks)
router.delete('/booklist/deleteAll', booklist.deleteAll);
router.post('/booklist/populate', getbookjson.populate);
router.get('/booklist/search/:field/:value', booklist.search);
router.get('/booklist',booklist.index);
router.get('/booklist/:id',booklist.show);
router.post('/booklist/create',booklist.create);
router.delete('/booklist/:id',booklist.delete);
router.put('/booklist/:id',booklist.update);
router.put('/booklist/updatestatus/:id/:type/:status', booklist.updatestatus);
router.get('/booklist/statuslist/:id/:status', booklist.statuslist);


module.exports = router;