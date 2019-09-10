var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).single('file');

//  upload.array('logo', 2)  多文件

router.post("/pic", function (req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.send({ code : 0, msg : err})
        }else {
            res.send({code : 1, path : req.file.path})
        }
    })
    
});

module.exports = router;