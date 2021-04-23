let ld = {};

ld.data = {};
ld.vars = {};

ld.vars.selectFiles = document.getElementById("selectFiles");
ld.vars.fileList = document.getElementById("fileList");
ld.vars.uploadAll = document.getElementById("uploadAll");

ld.FilePicker = new pluginJs.FilePicker({ multiple: true })
ld.FileList = new LinkDropFileList()




ld.pick = async () => {
    ld.FileList.pick()
}


ld.setListeners = () => {

    ld.vars.selectFiles.addEventListener("click", () => {
        ld.pick()
    })

    ld.vars.uploadAll.addEventListener("click", async () => [
        await ld.FileList.upload()
    ])

}


ld.init = async () => {
    ld.setListeners()

}



ld.init()