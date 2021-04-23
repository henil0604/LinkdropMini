let express = require("express")
let router = express.Router()
const multer = require("multer");
let fs = require("fs");
const archiver = require('archiver');
let utils = require("../node/utils");
let snet_core = require("snet_core")

const upload = multer();

router.post("/upload", upload.array('files'), async (req, res) => {
    let resData = {}

    try {

        let zipId = req.body.zipId;
        let fileIds = req.body.fileId;
        let files = req.files;

        let uploadFolderPath = `uploads/${zipId}`;
        let uploadFolderFilesPath = `${uploadFolderPath}/files`;
        let zipPath = `${uploadFolderPath}/${zipId}.zip`;

        await snet_core.fs.createDir(uploadFolderPath);
        await snet_core.fs.createDir(uploadFolderFilesPath);

        let zip = fs.createWriteStream(zipPath);
        let archive = archiver('zip');

        zip.on('close', function () {
            resData = {
                status: "success",
                result: {
                    zipId: zipId
                }
            }

            res.send(resData);
        });

        archive.pipe(zip)

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileExt = file.originalname.split('.').pop();

            let filePath = `${uploadFolderFilesPath}/${fileIds[i]}.${fileExt}`;

            await snet_core.fs.createFile(filePath);

            await utils.fs.writeBuffer(filePath, file.buffer)

            archive.file(filePath, { name: file.originalname })
        }

        archive.finalize();
    } catch (e) {
        resData = {
            status: "error",
            err: "Failed To Upload Files."
        }
        res.send(resData)
    }

})



module.exports = router;