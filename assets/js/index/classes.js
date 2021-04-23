
class LinkDropFileList {
    constructor() {

        this.cache = {};
        this.cache.files = [];
    }

    upload() {
        return new Promise(async resolve => {
            let loader = new pluginJs.Loader();
            loader.show()
            let formData = new FormData()
            for (let i = 0; i < this.cache.files.length; i++) {
                const file = this.cache.files[i].file;
                formData.append("files", file);
                formData.append('fileId', commonJs.generateToken(10))
            }
            let zipId = commonJs.generateToken(5);
            formData.append("zipId", zipId)

            let upload = await commonJs.fetch('/api/upload', formData);
            let uploadRes = JSON.parse(await upload.text());

            if (uploadRes.status == "success") {
                this.cache.files = [];
                location.href = `/d/${uploadRes.result.zipId}`
            } else {
                alert(uploadRes.err)
            }

            loader.hide()
            resolve()
        })
    }

    remove(id) {
        for (let i = 0; i < this.cache.files.length; i++) {
            let file = this.cache.files[i];
            if (file.file.id == id) {
                this.cache.files.splice(i, 1);
            }
        }
        this.refreshDOM()
    }

    checkUploadAllBtn() {
        if (this.cache.files.length > 0) {
            ld.vars.uploadAll.removeAttribute("disabled");
        } else {
            ld.vars.uploadAll.setAttribute("disabled", "true");
        }
    }

    refreshDOM() {
        this.checkUploadAllBtn()
        ld.vars.fileList.innerHTML = "";
        for (let i = 0; i < this.cache.files.length; i++) {
            let file = this.cache.files[i];
            file.addDom()
        }
    }

    pick() {
        return new Promise(async resolve => {

            let FilePicker = new pluginJs.FilePicker({ multiple: true });

            let files = await FilePicker.pick()

            if (typeof (files) == "object") {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    let options = {}
                    options.onremove = (id) => {
                        this.remove(id)
                    }
                    this.cache.files.push(new LinkDropFile(file, options))
                }
            }

            this.refreshDOM()
            resolve()
        })
    }
}


class LinkDropFile {

    constructor(file, options = {
        onremove: () => { }
    }) {
        this.options = options;
        this.file = file;
        this.file.id = commonJs.generateToken(10);
        this.DOM = this.createDOM()
        this.addDom()
    }

    remove() {
        this.options.onremove(this.file.id)
    }

    addDom() {
        ld.vars.fileList.appendChild(this.DOM)
    }

    createDOM() {
        let fileItem = document.createElement("div");
        let fileName = document.createElement("div");
        let roundDivider = document.createElement("div");
        let fileSize = document.createElement("div");
        let remove = document.createElement("button");

        fileItem.className = "fileItem";
        fileName.className = "fileName";
        roundDivider.className = "roundDivider";
        fileSize.className = "fileSize";
        remove.className = "remove";
        fileItem.setAttribute("id", this.file.id)

        fileName.innerHTML = this.file.name;
        fileSize.innerHTML = commonJs.formatBytes(this.file.size);
        remove.innerHTML = "x";
        remove.onclick = () => {
            this.remove()
        }

        fileItem.appendChild(fileName);
        fileItem.appendChild(roundDivider);
        fileItem.appendChild(fileSize);
        fileItem.appendChild(remove);
        return fileItem;
    }

    upload() { }

}