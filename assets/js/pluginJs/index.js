var pluginJs = {}

pluginJs.data = {};
pluginJs.utils = {};

pluginJs.utils.fadeInOut = {}

pluginJs.data.Tooltip = {};
pluginJs.data.Model = {};

pluginJs.data.Tooltip.declared = [];
pluginJs.data.Model.declared = [];


pluginJs.utils.random = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

pluginJs.utils.fadeInOut.fadeIn = (element, duration) => {
    return new Promise((resolve, reject) => {
        (function increment(value = 0) {
            computedStyle = window.getComputedStyle(element);
            if (computedStyle.opacity == "0.9") {
                resolve()
            }

            element.style.opacity = String(value);
            if (element.style.opacity !== '1') {
                setTimeout(() => {
                    increment(value + 0.1);
                }, duration / 10);
            }
        })();
    })
};

pluginJs.utils.fadeInOut.fadeOut = (element, duration) => {
    return new Promise((resolve, reject) => {
        (function decrement() {
            computedStyle = window.getComputedStyle(element);

            if (computedStyle.opacity == "0") {
                resolve()
            }
            (element.style.opacity -= 0.1) < 0 ? null : setTimeout(() => {
                decrement();
            }, duration / 10);
        })();
    })
};


pluginJs.SweetAlert = class {
    constructor(options) {

        this.options = this._filterOptions(options);
        this.DOM = this._createDOM();

        if (this.options.instantShow == true) {
            this.show()
        }
    }

    show() {
        if (document.getElementById(this.DOM.id) == null) {
            document.body.appendChild(this.DOM);
            this.DOM.focus()
        } else {
            this.hide()
            this.show()
        }
    }

    hide() {
        if (document.getElementById(this.DOM.id) != null) {
            this.DOM.remove()
        }
    }

    _createDOM() {

        let DOMDiv = document.createElement("div");
        let DOMDiv_alert = document.createElement("div");
        let DOMDiv_alert_heading = document.createElement("div");
        let DOMDiv_alert_text = document.createElement("div");
        let DOMDiv_alert_footer = document.createElement("div");

        DOMDiv.style.width = "100vw";
        DOMDiv.style.height = "100vh";
        DOMDiv.style.position = "fixed";
        DOMDiv.style.top = "0";
        DOMDiv.style.left = "0";
        DOMDiv.style.display = "flex";
        DOMDiv.style.justifyContent = "center";
        DOMDiv.style.alignItems = "center";
        DOMDiv.style.zIndex = "9999";
        DOMDiv.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        DOMDiv.id = pluginJs.utils.random(10);

        // For DOMDiv_alert
        for (let i = 0; i < Object.keys(this.options.style.DOMDiv_alert).length; i++) {
            let key = Object.keys(this.options.style.DOMDiv_alert)[i];
            let value = this.options.style.DOMDiv_alert[key];
            DOMDiv_alert.style[key] = value
        }

        // DOMDiv_alert_heading
        for (let i = 0; i < Object.keys(this.options.style.DOMDiv_alert_heading).length; i++) {
            let key = Object.keys(this.options.style.DOMDiv_alert_heading)[i];
            let value = this.options.style.DOMDiv_alert_heading[key];
            DOMDiv_alert_heading.style[key] = value
        }
        DOMDiv_alert_heading.innerHTML = this.options.title;

        // For DOMDiv_alert_text
        for (let i = 0; i < Object.keys(this.options.style.DOMDiv_alert_text).length; i++) {
            let key = Object.keys(this.options.style.DOMDiv_alert_text)[i];
            let value = this.options.style.DOMDiv_alert_text[key];
            DOMDiv_alert_text.style[key] = value
        }
        DOMDiv_alert_text.innerHTML = this.options.text

        // For DOMDiv_alert_footer
        for (let i = 0; i < Object.keys(this.options.style.DOMDiv_alert_footer).length; i++) {
            let key = Object.keys(this.options.style.DOMDiv_alert_footer)[i];
            let value = this.options.style.DOMDiv_alert_footer[key];
            DOMDiv_alert_footer.style[key] = value
        }
        DOMDiv_alert_footer.style.display = "flex";
        DOMDiv_alert_footer.style.justifyContent = "flex";
        DOMDiv_alert_footer.style.alignItems = "flex";
        DOMDiv_alert_footer.style.marginTop = "10px";
        let btn = document.createElement("button");
        btn.className = "wispy_btn_primary"
        btn.innerHTML = "Ok"
        btn.onclick = () => {
            this.hide()
        }
        DOMDiv_alert_footer.appendChild(btn)

        DOMDiv_alert.appendChild(DOMDiv_alert_heading);
        DOMDiv_alert.appendChild(DOMDiv_alert_text);
        DOMDiv_alert.appendChild(DOMDiv_alert_footer);
        DOMDiv.appendChild(DOMDiv_alert);

        return DOMDiv;
    }

    _filterOptions(options) {

        if (options == undefined || typeof (options) != "object") {
            options = {};
        }

        if (options.title == undefined) {
            options.title = "Sweet Alert";
        }

        if (options.text == undefined) {
            options.text = "Sweet Alert Text";
        }

        if (options.instantShow == undefined) {
            options.instantShow = false;
        }

        if (options.listeners == undefined) {
            options.listeners = {}
        }

        if (options.style == undefined) {
            options.style = {};
        }

        if (options.style.DOMDiv_alert == undefined) {
            options.style.DOMDiv_alert = {};
        }

        if (options.style.DOMDiv_alert_heading == undefined) {
            options.style.DOMDiv_alert_heading = {};
        }

        if (options.style.DOMDiv_alert_text == undefined) {
            options.style.DOMDiv_alert_text = {};
        }

        if (options.style.DOMDiv_alert_footer == undefined) {
            options.style.DOMDiv_alert_footer = {};
        }

        if (options.style.DOMDiv_alert.width == undefined) {
            options.style.DOMDiv_alert.width = "auto"
        }

        if (options.style.DOMDiv_alert.height == undefined) {
            options.style.DOMDiv_alert.height = "auto"
        }

        if (options.style.DOMDiv_alert.minWidth == undefined) {
            options.style.DOMDiv_alert.minWidth = "450px"
        }

        if (options.style.DOMDiv_alert.minHeight == undefined) {
            options.style.DOMDiv_alert.minHeight = "180px"
        }

        if (options.style.DOMDiv_alert.maxWidth == undefined) {
            options.style.DOMDiv_alert.maxWidth = "1000px"
        }

        if (options.style.DOMDiv_alert.maxHeight == undefined) {
            options.style.DOMDiv_alert.maxHeight = "1000px"
        }

        if (options.style.DOMDiv_alert.borderRadius == undefined) {
            options.style.DOMDiv_alert.borderRadius = "10px"
        }

        if (options.style.DOMDiv_alert.backgroundColor == undefined) {
            options.style.DOMDiv_alert.backgroundColor = "#F3F6FB"
        }

        if (options.style.DOMDiv_alert.display == undefined) {
            options.style.DOMDiv_alert.display = "flex"
        }

        if (options.style.DOMDiv_alert.alignItems == undefined) {
            options.style.DOMDiv_alert.alignItems = "center"
        }

        if (options.style.DOMDiv_alert.flexDirection == undefined) {
            options.style.DOMDiv_alert.flexDirection = "column"
        }

        if (options.style.DOMDiv_alert.padding == undefined) {
            options.style.DOMDiv_alert.padding = "10px";
        }

        if (options.style.DOMDiv_alert_heading.width == undefined) {
            options.style.DOMDiv_alert_heading.width = "100%";
        }

        if (options.style.DOMDiv_alert_heading.height == undefined) {
            options.style.DOMDiv_alert_heading.height = "45px";
        }

        if (options.style.DOMDiv_alert_heading.textAlign == undefined) {
            options.style.DOMDiv_alert_heading.textAlign = "center";
        }

        if (options.style.DOMDiv_alert_heading.fontSize == undefined) {
            options.style.DOMDiv_alert_heading.fontSize = "25px";
        }

        if (options.style.DOMDiv_alert_heading.fontFamily == undefined) {
            options.style.DOMDiv_alert_heading.fontFamily = `"Ubuntu", sans-sarif`;
        }

        if (options.style.DOMDiv_alert_heading.letterSpacing == undefined) {
            options.style.DOMDiv_alert_heading.letterSpacing = "0px";
        }

        if (options.style.DOMDiv_alert_text.width == undefined) {
            options.style.DOMDiv_alert_text.width = "100%";
        }

        if (options.style.DOMDiv_alert_text.height == undefined) {
            options.style.DOMDiv_alert_text.height = "auto";
        }

        if (options.style.DOMDiv_alert_text.fontFamily == undefined) {
            options.style.DOMDiv_alert_text.fontFamily = `"Ubuntu", sans-sarif`
        }

        if (options.style.DOMDiv_alert_text.fontSize == undefined) {
            options.style.DOMDiv_alert_text.fontSize = "18px";
        }

        if (options.style.DOMDiv_alert_text.textAlign == undefined) {
            options.style.DOMDiv_alert_text.textAlign = "center";
        }

        if (options.style.DOMDiv_alert_text.margin == undefined) {
            options.style.DOMDiv_alert_text.margin = "10px";
        }


        return options;
    }
}

pluginJs.Model = class {
    constructor(options) {
        this.options = this._optionsChecker(options)
        this.DOM = this.createDOM();

        pluginJs.data.Model.declared.push(this);
    }

    show() {
        if (document.getElementById(this.DOM.id) == null) {
            document.body.appendChild(this.DOM);
        } else {
            this.DOM.style.display = "block";
            this.DOM.style.display = "flex"
        }
    }

    hide() {
        if (document.getElementById(this.DOM.id) != null) {
            this.DOM.style.display = "none";
        }
    }

    createDOM() {
        let DOM;
        let DOMModel;
        let DOMModel_header;
        let DOMModel_main;
        let DOMModel_footer;

        DOM = document.createElement("div");
        DOM.style.position = "fixed";
        DOM.style.top = 0;
        DOM.style.left = 0;
        DOM.style.width = "100%";
        DOM.style.height = "100%";
        DOM.style.zIndex = "100";
        DOM.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        DOM.style.display = "flex";
        DOM.style.justifyContent = "center";
        DOM.style.alignItems = "center";
        DOM.id = pluginJs.utils.random(10);

        DOMModel = document.createElement("div");
        DOMModel.style.width = this.options.style.width;
        DOMModel.style.height = this.options.style.height;
        DOMModel.style.display = "flex";
        DOMModel.style.justifyContent = "center";
        DOMModel.style.alignItems = "center";
        DOMModel.style.flexDirection = "column";

        DOMModel_header = document.createElement("div");
        DOMModel_header.style.width = "100%";
        DOMModel_header.style.height = this.options.style.header.height;
        DOMModel_header.style.backgroundColor = this.options.style.header.bgColor;
        DOMModel_header.style.padding = "8px 20px";
        DOMModel_header.style.display = "flex";
        DOMModel_header.style.alignItems = "center";
        DOMModel_header.style.fontSize = this.options.style.header.fontSize;
        DOMModel_header.style.color = this.options.style.header.color
        DOMModel_header.style.fontWeight = this.options.style.header.fontWeight
        DOMModel_header.style.letterSpacing = this.options.style.header.letterSpacing
        DOMModel_header.innerHTML = this.options.title

        DOMModel_main = document.createElement("div");
        DOMModel_main.style.width = "100%";
        DOMModel_main.style.height = "100%";
        DOMModel_main.style.backgroundColor = this.options.style.bgColor;
        DOMModel_main.style.padding = "15px 20px";
        DOMModel_main.style.fontSize = this.options.style.fontSize;
        DOMModel_main.style.color = this.options.style.color;
        DOMModel_main.style.fontWeight = this.options.style.fontWeight
        DOMModel_main.style.letterSpacing = this.options.style.letterSpacing
        DOMModel_main.innerHTML = this.options.text;

        DOMModel_footer = document.createElement("div");
        DOMModel_footer.style.width = "100%";
        DOMModel_footer.style.height = this.options.style.footer.height;
        DOMModel_footer.style.backgroundColor = this.options.style.footer.bgColor;
        DOMModel_footer.style.display = "flex";
        DOMModel_footer.style.alignItems = "center";
        DOMModel_footer.style.padding = "5px 20px";
        DOMModel_footer.style.flexDirection = "row-reverse";

        for (let i = 0; i < this.options.buttons.length; i++) {
            let button = this.options.buttons[i];
            let DOMModel_footer_button;

            DOMModel_footer_button = document.createElement("button");
            DOMModel_footer_button.style.width = button.width;
            DOMModel_footer_button.style.height = button.height;
            DOMModel_footer_button.style.backgroundColor = button.bgColor;
            DOMModel_footer_button.style.borderRadius = "6px";
            DOMModel_footer_button.style.outline = "none";
            DOMModel_footer_button.style.border = "none";
            DOMModel_footer_button.style.color = button.textColor;
            DOMModel_footer_button.style.padding = "5px 10px";
            DOMModel_footer_button.innerHTML = button.value;
            DOMModel_footer_button.onclick = () => {
                button.onClick(this)
            };

            DOMModel_footer.appendChild(DOMModel_footer_button);
        }

        DOMModel.appendChild(DOMModel_header)
        DOMModel.appendChild(DOMModel_main)
        DOMModel.appendChild(DOMModel_footer)
        DOM.appendChild(DOMModel);
        return DOM;
    }


    _optionsChecker(o) {
        if (typeof (o) != "object" || o == null || o == undefined) {
            o = {};
        }

        if (o.style == undefined) {
            o.style = {};
        }

        if (o.style.width == undefined) {
            o.style.width = "500px";
        }

        if (o.style.height == undefined) {
            o.style.height = "200px";
        }

        if (o.style.bgColor == undefined) {
            o.style.bgColor = "#36393F";
        }

        if (o.style.borderRadius == undefined) {
            o.style.borderRadius = "5px";
        }

        if (o.style.fontSize == undefined) {
            o.style.fontSize = "15px";
        }

        if (o.style.color == undefined) {
            o.style.color = "#fff";
        }

        if (o.style.fontWeight == undefined) {
            o.style.fontWeight = "500";
        }

        if (o.style.letterSpacing == undefined) {
            o.style.letterSpacing = "0.6px";
        }

        if (o.style.boxShadow == undefined) {
            o.style.boxShadow = "var(--box_shadow_full_property)";
        }

        if (o.style.header == undefined) {
            o.style.header = {};
        }

        if (o.style.header.height == undefined) {
            o.style.header.height = "150px";
        }

        if (o.style.header.fontSize == undefined) {
            o.style.header.fontSize = "20px";
        }

        if (o.style.header.color == undefined) {
            o.style.header.color = "#7289DA";
        }

        if (o.style.header.fontWeight == undefined) {
            o.style.header.fontWeight = "500";
        }

        if (o.style.header.letterSpacing == undefined) {
            o.style.header.letterSpacing = "0.6px";
        }

        if (o.style.header.bgColor == undefined) {
            o.style.header.bgColor = "#2F3136";
        }

        if (o.style.footer == undefined) {
            o.style.footer = {};
        }

        if (o.style.footer.height == undefined) {
            o.style.footer.height = "200px";
        }

        if (o.style.footer.fontSize == undefined) {
            o.style.footer.fontSize = "20px";
        }

        if (o.style.footer.bgColor == undefined) {
            o.style.footer.bgColor = "#2F3136";
        }

        if (o.title == undefined) {
            o.title = "Warning!";
        }

        if (o.text == undefined) {
            o.text = "Are You Sure You Want To Perform This Action?"
        }

        if (Array.isArray(o.buttons) == false) {
            o.buttons = [];
        }

        if (o.buttons.length == 0) {
            o.buttons.push({})
        }

        for (let i = 0; i < o.buttons.length; i++) {
            let button = o.buttons[i];

            if (button.value == undefined) {
                button.value = "Done";
            }

            if (button.width == undefined) {
                button.width = "80px";
            }

            if (button.height == undefined) {
                button.height = "40px";
            }

            if (button.bgColor == undefined) {
                button.bgColor = "#7289DA";
            }

            if (button.textColor == undefined) {
                button.textColor = "#fff";
            }

            if (button.onClick == undefined) {
                button.onClick = (that) => { that.hide() }
            }

        }


        return o;
    }
}

pluginJs.Loader = class {

    constructor(options) {
        this.data = {};
        this.data.shown = false
        this.options = this._filterOptions(options);
        this.fixedPosTags = ["input", "i", "img"];
        this.lastDegree = 0;
        this.intervalOfAnimation;
        this.DOM = this._createDOM();

        window.addEventListener("resize", () => {
            if (this.data.shown) {
                this.setPos()
            }
        })

        if (this.options.instantShow == true) {
            this.show()
        }
    }

    setPos() {
        if (this.fixedPosTags.indexOf(this.options.el.tagName.toLowerCase()) > -1) {

            let pos = this.options.el.getBoundingClientRect();

            this.options.el.style.position = this.lastPositionStyle;
            this.domTEMP.style.position = "fixed";
            this.domTEMP.style.display = "flex"
            this.domTEMP.style.top = pos.top + "px";
            this.domTEMP.style.left = pos.left + "px";
            this.domTEMP.style.width = pos.width + "px";
            this.domTEMP.style.height = pos.height + "px";
            this.DOM.style.borderRadius = this.styleOfEl.borderRadius
            if (pos.x == 0 && pos.y == 0 && pos.top == 0 && pos.left == 0 && pos.right == 0 && pos.bottom == 0 && pos.width == 0 && pos.height == 0) {
                this.domTEMP.style.display = "none"
            }

        }
    }

    show() {
        if (document.getElementById(this.DOM.id) == null && this.data.shown == false) {
            this.lastPositionStyle = window.getComputedStyle(this.options.el).position
            this.options.el.style.position = "relative";
            this.DOM.style.display = "flex";
            this.DOM.style.opacity = "1"
            if (this.fixedPosTags.indexOf(this.options.el.tagName.toLowerCase()) > -1) {
                this.setPos()
                document.body.appendChild(this.DOM)
            } else {
                this.options.el.appendChild(this.DOM) || console.warn("Could Not Show The Loader")
            }
            pluginJs.utils.fadeInOut.fadeIn(this.DOM, 100);
            this.data.shown = true;
            this.animate(this.loader)
        }
    }

    async hide() {
        if (document.getElementById(this.DOM.id) != null && this.data.shown == true) {
            clearInterval(this.intervalOfAnimation);
            await commonJs.fadeOut(this.DOM, 800)
            this.DOM.remove()
            this.options.el.style.position = this.lastPositionStyle;
            this.data.shown = false;
        }
    }

    _createDOM() {
        this.domTEMP = document.createElement("div");
        this.loader = document.createElement("i");
        this.styleOfEl = window.getComputedStyle(this.options.el, null)

        this.domTEMP.style.width = "100%";
        this.domTEMP.style.height = "100%";
        this.domTEMP.style.backgroundColor = this.options.backgroundColor;
        this.domTEMP.style.zIndex = "9999";
        this.domTEMP.style.display = "flex";
        this.domTEMP.style.justifyContent = "center";
        this.domTEMP.style.alignItems = "center";
        this.domTEMP.style.position = "absolute";
        this.domTEMP.style.top = "0";
        this.domTEMP.style.left = "0";
        this.domTEMP.id = pluginJs.utils.random(10)

        this.loader.className = "fas fa-brain logo";
        let loader_fontSize;
        if (parseInt(this.styleOfEl.getPropertyValue("width")) < 100 || parseInt(this.styleOfEl.getPropertyValue("height")) < 50) {
            loader_fontSize = "20px";
        } else if (parseInt(this.styleOfEl.getPropertyValue("width")) < 300 || parseInt(this.styleOfEl.getPropertyValue("height")) < 150) {
            loader_fontSize = "30px";
        } else if (parseInt(this.styleOfEl.getPropertyValue("width")) < 500 || parseInt(this.styleOfEl.getPropertyValue("height")) < 250) {
            loader_fontSize = "40px";
        } else if (parseInt(this.styleOfEl.getPropertyValue("width")) < 700 || parseInt(this.styleOfEl.getPropertyValue("height")) < 350) {
            loader_fontSize = "45px";
        } else {
            loader_fontSize = "50px"
        }
        this.loader.style.fontSize = loader_fontSize;
        if (this.options.fontSize != undefined) {
            this.loader.style.fontSize = this.options.fontSize;
        }
        this.loader.style.color = this.options.color

        this.domTEMP.appendChild(this.loader);

        return this.domTEMP;
    }


    animate(loader) {

        this.intervalOfAnimation = setInterval(async () => {
            this.lastDegree = this.lastDegree + 360;

            $(loader).animate(
                { deg: this.lastDegree },
                {
                    duration: 500,
                    step: function (now) {
                        $(this).css({ transform: 'rotate(' + now + 'deg)' });
                    }
                }
            );
        }, this.options.intervalOfSpinning)

    }


    _filterOptions(options) {

        if (options == undefined || typeof (options) != "object") {
            options = {};
        }

        if (options.el == undefined) {
            options.el = document.body;
        }

        if (options.instantShow == undefined) {
            options.instantShow = false;
        }

        if (options.backgroundColor == undefined) {
            options.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }

        if (options.intervalOfSpinning == undefined) {
            options.intervalOfSpinning = 1000
        }

        if (options.color == undefined) {
            options.color = "black";
        }

        return options;
    }

}

pluginJs.ModelNew = class {
    constructor(options) {
        this.options = this._filterOptions(options);

        this.DOM = this.createDOM();


    }

    async show() {
        return new Promise(async (resolve) => {
            await this.options.listeners.onbeforeshow()
            if (document.getElementById(this.DOM.id) == null) {
                this.options.targetElement.appendChild(this.DOM)
                await pluginJs.utils.fadeInOut.fadeIn(this.DOM, 200);
            }
            this.options.listeners.onshow(this)
            resolve()
        })
    }

    async hide() {
        return new Promise(async (resolve) => {
            if (document.getElementById(this.DOM.id) != null) {
                await pluginJs.utils.fadeInOut.fadeOut(this.DOM, 100)
                document.getElementById(this.DOM.id).remove()
            }

            this.options.listeners.onhide(this)
            resolve()
        })
    }

    rebuild() {
        this.options = this._filterOptions(this.options);
        this.DOM = this.createDOM();
        this.options.listeners.onrebuild(this)
    }

    submit(data, options) {
        options = options == undefined ? {} : options
        options.hideAfter = options.hideAfter == undefined ? false : options.hideAfter

        if (options.hideAfter) {
            this.hide();
        }

        this.options.listeners.onsubmit(data, this);
    }

    createDOM() {
        let dom = document.createElement("div");
        let model = document.createElement("div");
        let header = document.createElement("div");
        let close = document.createElement("div");
        let body = document.createElement("div");
        let footer = document.createElement("div");

        dom.style.width = "100%";
        dom.style.height = "100%";
        dom.style.display = "flex";
        dom.style.justifyContent = "center";
        dom.style.alignItems = "center";
        dom.style.position = "fixed";
        dom.style.top = "0";
        dom.style.left = "0";
        dom.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
        dom.id = pluginJs.utils.random(10);

        model.style.width = "400px";
        model.style.height = "230px";
        model.style.backgroundColor = "#ffffff";
        model.style.display = "flex";
        model.style.alignItems = "center";
        model.style.flexDirection = "column";
        model.style.borderRadius = "10px";
        model.style.overflow = "hidden";
        model.style.fontFamily = `"Ubuntu", sans-sarif`
        for (let i = 0; i < Object.keys(this.options.style.model).length; i++) {
            let key = Object.keys(this.options.style.model)[i];
            let value = this.options.style.model[key];
            model.style[key] = value;
        }

        close.style.width = "30px";
        close.style.height = "100%";
        close.style.fontSize = "30px";
        close.style.color = "white";
        close.style.display = "flex";
        close.style.justifyContent = "center";
        close.style.alignItems = "center";
        close.style.margin = "0 15px"
        close.style.cursor = "pointer"
        close.innerHTML = `<i class="fas fa-times"></i>`;
        close.onclick = () => {
            this.hide();
        }

        header.style.width = "100%";
        header.style.minHeight = "60px";
        header.style.backgroundColor = "#004DFC";
        header.style.display = "flex";
        header.style.flexDirection = "row-reverse"
        header.style.alignItems = "center"
        header.style.color = "white"
        header.style.padding = "5px 10px";
        for (let i = 0; i < Object.keys(this.options.style.header).length; i++) {
            let key = Object.keys(this.options.style.header)[i];
            let value = this.options.style.header[key];
            header.style[key] = value;
        }
        if (this.options.dom.header != null) {
            if (Array.isArray(this.options.dom.header)) {
                for (let i = 0; i < this.options.dom.header.length; i++) {
                    let e = this.options.dom.header[i];
                    header.appendChild(e)
                }
            } else {
                header.appendChild(this.options.dom.header)
            }
        }

        body.style.width = "100%";
        body.style.height = "100%";
        body.style.backgroundColor = "transparent";
        body.style.display = "flex";
        body.style.justifyContent = "center"
        body.style.alignItems = "center"
        body.style.padding = "10px";
        for (let i = 0; i < Object.keys(this.options.style.body).length; i++) {
            let key = Object.keys(this.options.style.body)[i];
            let value = this.options.style.body[key];
            body.style[key] = value;
        }
        if (this.options.dom.body != null) {
            if (Array.isArray(this.options.dom.body)) {
                for (let i = 0; i < this.options.dom.body.length; i++) {
                    let e = this.options.dom.body[i];
                    body.appendChild(e)
                }
            } else {
                body.appendChild(this.options.dom.body)
            }
        }

        footer.style.width = "100%";
        footer.style.minHeight = "70px";
        footer.style.backgroundColor = "#F3F6FB";
        footer.style.display = "flex";
        footer.style.alignItems = "center";
        footer.style.flexDirection = "row-reverse";
        footer.style.padding = "5px 10px";
        for (let i = 0; i < Object.keys(this.options.style.footer).length; i++) {
            let key = Object.keys(this.options.style.footer)[i];
            let value = this.options.style.footer[key];
            footer.style[key] = value;
        }
        if (this.options.dom.footer != null) {
            if (Array.isArray(this.options.dom.footer)) {
                for (let i = 0; i < this.options.dom.footer.length; i++) {
                    let e = this.options.dom.footer[i];
                    footer.appendChild(e)
                }
            } else {
                footer.appendChild(this.options.dom.footer)
            }
        }

        dom.wispyChilds = {};
        dom.wispyChilds.model = model;
        model.wispyChilds = {};
        model.wispyChilds.header = header;
        model.wispyChilds.body = body;
        model.wispyChilds.footer = footer;

        if (this.options.closeBtn) {
            header.prepend(close)
        }
        model.appendChild(header)
        model.appendChild(body)
        model.appendChild(footer)
        dom.appendChild(model)
        return dom;
    }

    _filterOptions(o) {

        if (o == undefined || typeof (o) != "object") {
            o = {}
        }

        if (o.style == undefined) {
            o.style = {}
        }

        if (o.style.model == undefined) {
            o.style.model = {};
        }

        if (o.style.header == undefined) {
            o.style.header = {};
        }

        if (o.style.body == undefined) {
            o.style.body = {};
        }

        if (o.style.footer == undefined) {
            o.style.footer = {};
        }

        if (o.dom == undefined) {
            o.dom = {};
        }

        if (o.dom.header == undefined) {
            let header = document.createElement("div");
            header.innerHTML = "Are You Sure?";
            header.style.width = "100%";
            header.style.fontSize = "20px";

            o.dom.header = header;
        }

        if (o.dom.body == undefined) {
            let body = document.createElement("div");
            body.innerHTML = "Are You Sure that You want to Perform This Action?"
            body.style.width = "100%";
            body.style.fontSize = "16px";

            o.dom.body = body;
        }

        if (o.dom.footer == undefined) {
            let okButton = document.createElement("button");
            let cancelButton = document.createElement("button");
            okButton.className = "wispy_btn_primary";
            okButton.style.width = "70px";
            okButton.style.borderRadius = "7px";
            okButton.innerHTML = "Yes";
            okButton.onclick = () => {
                this.submit(true, { hideAfter: true })
            }

            cancelButton.className = "wispy_btn_primary"
            cancelButton.style.width = "70px";
            cancelButton.style.backgroundColor = "#C31907";
            cancelButton.style.borderRadius = "7px";
            cancelButton.innerHTML = "No";
            cancelButton.onclick = () => {
                this.submit(false, { hideAfter: true })
            }

            o.dom.footer = [okButton, cancelButton];
        }

        if (o.targetElement == undefined) {
            o.targetElement = document.body
        }

        if (o.listeners == undefined) {
            o.listeners = {};
        }

        if (o.listeners.onshow == undefined) {
            o.listeners.onshow = () => { }
        }

        if (o.listeners.onhide == undefined) {
            o.listeners.onhide = () => { }
        }

        if (o.listeners.onrebuild == undefined) {
            o.listeners.onrebuild = () => { }
        }

        if (o.listeners.onsubmit == undefined) {
            o.listeners.onsubmit = () => { }
        }

        if (o.listeners.onbeforeshow == undefined) {
            o.listeners.onbeforeshow = () => { };
        }

        if (o.closeBtn == undefined) {
            o.closeBtn = true
        }

        return o
    }
}

pluginJs.BlockScreen = class {

    constructor(options) {
        this.fixedPosTags = ["input", "img", "i", "div"]
        this.options = this._filterOptions(options);
        this.data = {};

        this.DOM = this.createDOM();

        window.addEventListener("resize", () => {
            this.setPos()
        })
    }

    show() {
        return new Promise(async (resolve) => {
            if (document.getElementById(this.DOM.id) == null) {
                if (this.setPos()) {
                    document.body.appendChild(this.DOM)
                } else {
                    this.data.targetElementLastPos = window.getComputedStyle(this.options.targetElement).getPropertyValue("position");
                    console.log(this.options.targetElement)
                    console.log(this.data.targetElementLastPos)

                    if (this.data.targetElementLastPos != "relative") {
                        this.options.targetElement.style.position = "relative"
                    }

                    this.options.targetElement.appendChild(this.DOM);
                }
                await pluginJs.utils.fadeInOut.fadeIn(this.DOM, 100);
            }
            resolve()
        })
    }

    setPos() {
        if (this.fixedPosTags.indexOf(this.options.targetElement.tagName.toLowerCase()) > -1) {

            let pos = this.options.targetElement.getBoundingClientRect();

            this.options.targetElement.style.position = this.lastPositionStyle;
            this.DOM.style.position = "fixed";
            this.DOM.style.display = "flex"
            this.DOM.style.top = pos.top + "px";
            this.DOM.style.left = pos.left + "px";
            this.DOM.style.width = eval(`${pos.width}${this.options.widthOpration}`) + "px";
            this.DOM.style.height = eval(`${pos.height}${this.options.heightOpration}`) + "px";
            this.DOM.style.borderRadius = window.getComputedStyle(this.options.targetElement, null).borderRadius
            if (pos.x == 0 && pos.y == 0 && pos.top == 0 && pos.left == 0 && pos.right == 0 && pos.bottom == 0 && pos.width == 0 && pos.height == 0) {
                this.DOM.style.display = "none"
            }

            return true;
        } else {
            return false
        }
    }

    rebuild() {
        this.DOM = this.createDOM();
    }

    hide() {
        return new Promise(async (resolve) => {
            if (document.getElementById(this.DOM.id) != null) {
                await pluginJs.utils.fadeInOut.fadeOut(this.DOM, 100);
                document.getElementById(this.DOM.id).remove()

                if (this.data.targetElementLastPos == "static") {
                    this.data.targetElementLastPos = "flex";
                }
                this.options.targetElement.style.position = this.data.targetElementLastPos
            }
            resolve()
        })
    }

    createDOM() {

        let dom = document.createElement("div");
        let header = document.createElement("div");
        let text = document.createElement("div");

        dom.style.backgroundColor = "#F3F6FB"
        dom.style.width = "100%";
        dom.style.height = "100%";
        dom.style.display = "flex";
        dom.style.justifyContent = "center";
        dom.style.alignItems = "center";
        dom.style.flexDirection = "column";
        dom.style.position = "absolute";
        dom.style.top = "0";
        dom.style.left = "0";
        dom.style.color = "#aaa";
        dom.style.userSelect = "none"
        dom.id = pluginJs.utils.random(10)
        for (let i = 0; i < Object.keys(this.options.style.dom).length; i++) {
            let key = Object.keys(this.options.style.dom)[i];
            let value = this.options.style.dom[key];
            dom.style[key] = value;
        }

        header.style.fontSize = "100px"
        header.innerText = this.options.title;
        for (let i = 0; i < Object.keys(this.options.style.header).length; i++) {
            let key = Object.keys(this.options.style.header)[i];
            let value = this.options.style.header[key];
            header.style[key] = value;
        }


        text.innerText = this.options.text;
        for (let i = 0; i < Object.keys(this.options.style.text).length; i++) {
            let key = Object.keys(this.options.style.text)[i];
            let value = this.options.style.text[key];
            text.style[key] = value;
        }

        dom.appendChild(header)
        dom.appendChild(text)


        return dom;
    }

    _filterOptions(o) {

        if (o == undefined || typeof (o) != "object") {
            o = {};
        }

        if (o.style == undefined) {
            o.style = {};
        }

        if (o.style.dom == undefined) {
            o.style.dom = {};
        }

        if (o.style.header == undefined) {
            o.style.header = {};
        }

        if (o.style.text == undefined) {
            o.style.text = {};
        }

        if (o.title == undefined) {
            o.title = "☺";
        }

        if (o.text == undefined) {
            o.text = "Nothing To See Here";
        }

        if (o.targetElement == undefined) {
            o.targetElement = document.body
        }

        if (o.widthOpration == undefined) {
            o.widthOpration = "+0";
        }

        if (o.heightOpration == undefined) {
            o.heightOpration = "+0"
        }


        return o;
    }

}

pluginJs.Tooltip = class {
    constructor(options) {
        this.options = this._filterOptions(options);
    }


    _filterOptions(o) {

        if (o == undefined || typeof (o) != "object") {
            o = {};
        }

        if (o.el == undefined) {
            throw new Error(`Please Defined "el" Argument in Options`)
        }



    }
}

pluginJs.ImageShower = class {


}

pluginJs.KeyHandler = class {

    constructor(options) {

        this.data = {};
        this.data.keyDowns = {};
        this.data.lastCallbackTimeStamp = 0;
        this.options = this._filterOptions(options);
        this.defaultListener()

    }

    defaultListener() {
        this.options.target.addEventListener("keydown", (e) => {
            this.addEvent(e)
        })
        this.options.target.addEventListener("keyup", (e) => {
            this.removeEvent(e)
        })
    }

    addEvent(e) {
        this.data.keyDowns[e.which] = true;
    }

    removeEvent(e) {
        delete this.data.keyDowns[e.which]
    }

    checkTime() {
        if (Date.now() - this.data.lastCallbackTimeStamp > this.options.cooldown) {
            this.data.lastCallbackTimeStamp = Date.now()
            return true;
        } else {
            return false;
        }
    }

    onDown(keys = [], callback = () => { }, options = {}) {
        options.preventDefault = options.preventDefault == undefined ? false : options.preventDefault
        this.options.target.addEventListener("keydown", (e) => {
            this.addEvent(e)

            let pressed = false;
            let returnEvents = null;
            let checked = [];

            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];

                if (this.data.keyDowns[key]) {
                    checked.push(true)
                } else {
                    checked.push(false)
                }

            }

            if (checked.indexOf(false) == -1) {
                pressed = true;
            }

            if (pressed && this.checkTime()) {
                if (options.preventDefault) {
                    e.preventDefault()
                }
                returnEvents = e;
                callback(returnEvents)
            }
        })
    }

    waitUntilDown(keys, options = {}) {
        return new Promise(resolve => {
            this.onDown(keys, resolve, options)
        })

    }


    _filterOptions(o) {
        if (typeof (o) != "object" || o == undefined) {
            o = {};
        }

        if (o.target == undefined) {
            o.target = window;
        }

        if (o.cooldown == undefined) {
            o.cooldown = 200;
        }



        return o;
    }

}

pluginJs.FilePicker = class {
    constructor(options) {
        this.options = this._filterOptions(options);
        this.DOM = this.createDOM()

    }

    pick() {
        let timeOut = null;
        return new Promise(resolve => {
            this.DOM.remove()
            this.clearFiles()
            document.body.appendChild(this.DOM);

            this.DOM.click()
            this.DOM.addEventListener("change", (e) => {
                timeOut != null ? clearTimeout(timeOut) : null;
                resolve(this.DOM.files);
            })

            timeOut = setTimeout(() => {
                resolve("Failed To Get Files")
            }, 60000);
        })
    }

    createDOM() {
        let input = document.createElement("input");
        input.type = "file";
        input.style.width = "0"
        input.style.height = "0"
        input.style.position = "fixed";
        input.style.top = "0";
        input.style.left = "0";
        input.style.opacity = "0";

        if (this.options.multiple) {
            input.multiple = true;
        }

        return input;
    }

    clearFiles() {
        this.DOM.value = ""
    }

    _filterOptions(o) {

        if (o == undefined || typeof (o) != "object") {
            o = {};
        }

        if (o.multiple == undefined) {
            o.multiple = false;
        }


        return o;
    }
}