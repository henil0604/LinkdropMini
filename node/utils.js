let fs = require("fs");
let utils = {};

utils.config = require("../config/default.json")

utils.fs = {};


utils.fs.createFile = (path, content = "") => {
    console.log(path)
    return new Promise(resolve => {
        fs.writeFile(path, content, function (err) {
            resolve(err)
        });
    })
}

utils.fs.writeBuffer = (path, buffer) => {
    return new Promise(resolve => {
        fs.open(path, 'w', function (err, fd) {
            fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                resolve(err)
            })
        })
    })
}







module.exports = utils;
