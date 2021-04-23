var commonJs;
commonJs = {}

Array.prototype.random = function (n) {
    if (n && n > 1) {
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(this[Math.floor(Math.random() * this.length)]);
        }
        return a;
    } else {
        return this[Math.floor(Math.random() * this.length)];
    }
}

commonJs.isParamExists = (param) => {
    var field = param;
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1)
        return true;
    else if (url.indexOf('&' + field + '=') != -1)
        return true;

    return false
}

commonJs.getGetValue = (param) => {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

commonJs.insertGetParam = (url, name, value) => {
    if (url.length === 0) {
        return;
    }

    let rawURL = url;

    // URL with `?` at the end and without query parameters
    // leads to incorrect result.
    if (rawURL.charAt(rawURL.length - 1) === "?") {
        rawURL = rawURL.slice(0, rawURL.length - 1);
    }
    const parsedURL = new URL(rawURL);
    let parameters = parsedURL.search;

    parameters += (parameters.length === 0) ? "?" : "&";
    parameters = (parameters + name + "=" + value);

    return (parsedURL.origin + parsedURL.pathname + parameters);
}

commonJs.getGetList = (url = location.href) => {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        if (vars[i] != "") {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return params;
}

commonJs.objectToUrlQuery = (params) => {
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return queryString;
}

commonJs.asyncPost = (file, data, callback = null, xhr = false, onprogressXhr, onreadyXhr) => {
    if (xhr) {
        return new Promise((resolve, reject) => {

            var req = new XMLHttpRequest();
            req.onprogress = onprogressXhr;
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(req.responseText)
                }
            };

            req.open("POST", file + "?" + commonJs.objectToUrlQuery(data), true);
            req.send();

        })
    } else {
        return new Promise((resolve, reject) => {

            $.post(file, data, (data, status) => {
                if (typeof (callback) == "function") {
                    callback(data, status);
                }
                resolve(data);
            })
        })
    }
}

commonJs.fetch = (url, body, method = "post") => {
    return new Promise(resolve => {
        fetch(url, {
            method: method,
            body: body
        }).then((res) => {
            resolve(res);
        }).catch((e) => {
            resolve(e);
        })
    })
}

commonJs.removeElementFromArray = (arr, value) => {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        }
    }

    return arr;
}

commonJs.generateToken = (n) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

commonJs.isArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

commonJs.delayer = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms);
    })
}

commonJs.isValidJsonString = (jsonString) => {

    if (!(jsonString && typeof jsonString === "string")) {
        return false;
    }

    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }

}

commonJs.copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

commonJs.alert = (data) => {

    if (document.getElementsByClassName("wc_ALLCOMMON_js_alert").length > 0) {
        document.getElementsByClassName("wc_ALLCOMMON_js_alert")[0].remove()
    }

    return new Promise((resolve) => {
        document.body.innerHTML += `
            <div class="wc_ALLCOMMON_js_alert">
                <div class="wc_ALLCOMMON_js_alert_card">
                    <div class="wc_ALLCOMMON_js_alert_card_title">
                        ${data.title}
                    </div>
                    <div class="wc_ALLCOMMON_js_alert_card_text">
                        ${data.value}
                    </div>

                    <div class="wc_ALLCOMMON_js_alert_card_button">
                        <button id="wc_js_alert_button" class="wc_ALLCOMMON_btn_btn_primary">Done</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementsByClassName("wc_ALLCOMMON_js_alert")[0].style.cursor = "not-allowed";

        document.getElementsByClassName("wc_ALLCOMMON_js_alert_card")[0].style.cursor = "auto"

        document.getElementsByClassName("wc_ALLCOMMON_js_alert")[0].style.backgroundColor = "rgba(0, 0, 0, .7)";

        if (data.titleColor != undefined) {
            document.getElementsByClassName("wc_ALLCOMMON_js_alert_card_title")[0].style.color = data.titleColor;
        }

        if (data.textColor != undefined) {
            document.getElementsByClassName("wc_ALLCOMMON_js_alert_card_text")[0].style.color = data.textColor;
        }

        if (data.ondone == undefined) {
            data.ondone = function () {
                resolve()
            }
        }

        if (data.buttonValue == undefined) {
            data.buttonValue = "Done";
        }

        document.getElementById("wc_js_alert_button").innerHTML = data.buttonValue

        document.getElementById("wc_js_alert_button").addEventListener("click", async () => {
            document.getElementsByClassName("wc_ALLCOMMON_js_alert_card")[0].classList.add("wc_ALLCOMMON_js_alert_card_animate_down")

            await commonJs.delayer(200)

            document.getElementsByClassName("wc_ALLCOMMON_js_alert")[0].style.cursor = "auto";

            document.getElementsByClassName("wc_ALLCOMMON_js_alert")[0].remove()

            data.ondone()

            resolve()
        })
    })
}

commonJs.generateNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

commonJs.getElementStyle = (element, property) => {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

commonJs.rotateElement = (el, degree) => {
    el.style.transform = `rotate(${degree}deg)`;
}

commonJs.rotateElementWithT = (el, deg, ms) => {
    $(el).animate(
        { deg: deg },
        {
            duration: ms,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
}

commonJs.fadeIn = (element, duration) => {
    return new Promise((resolve, reject) => {
        (function increment(value = 0) {
            computedStyle = window.getComputedStyle(element);
            if (computedStyle.opacity == '0.9') {
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

commonJs.fadeOut = (element, duration) => {
    return new Promise((resolve, reject) => {
        $(element).fadeOut(duration, () => {
            resolve()
        })
    })
};

commonJs.isRunningFromConsole = (keys) => {
    let fromConsole = typeof keys === 'function' && keys.toString().indexOf('Command Line API') !== -1
    if (fromConsole) {
        return true
    } else {
        return false
    }
}

commonJs.toNumberEncoder = (str = String("")) => {
    let returnN = "";
    let splittedStr = str.split("");

    for (let i = 0; i < splittedStr.length; i++) {
        let str1 = splittedStr[i];

        returnN += str1.charCodeAt().toString();
        if (i != splittedStr.length - 1) {
            returnN += ":"
        }
    }

    return {
        str: returnN.split(":").join(""),
        key: returnN
    }
}

commonJs.toNumberDecoder = (key = String("")) => {
    let returnStr = "";
    let splittedN = key.split(":");

    for (let i = 0; i < splittedN.length; i++) {
        let str1 = splittedN[i];

        returnStr += String.fromCharCode(str1)
    }

    return returnStr;
}

commonJs.findByAttribute = (attr, val = null) => {
    let returnData = [];
    for (let i = 0; i < document.querySelectorAll("*").length; i++) {
        let e = document.querySelectorAll("*")[i];

        if (e.getAttribute(attr) != null) {
            if (val != null) {
                if (e.getAttribute(attr) == val) {
                    returnData.push(e)
                }
            } else {
                returnData.push(e)
            }
        }
    }


    if (returnData.length == 1) {
        return returnData[0];
    } else if (returnData.length == 0) {
        return null;
    } else {
        return returnData;
    }
}

commonJs.importScript = (url) => {
    return new Promise((resolve) => {

        let script = document.createElement("script")
        script.src = url;
        script.onload = () => {
            resolve()
        }


        document.head.appendChild(script);
    })
}

commonJs.requestFullScreen = (element) => {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

commonJs.calculateLastedTime = (ms) => {
    let curr = new Date()
    let prev = new Date(ms);

    var ms_Min = 60 * 1000;
    var ms_Hour = ms_Min * 60;
    var ms_Day = ms_Hour * 24;
    var ms_Mon = ms_Day * 30;
    var ms_Yr = ms_Day * 365;
    var diff = curr - prev;
    if (diff < ms_Min) {
        return "Just Now";
    } else if (diff < ms_Hour) {
        return Math.round(diff / ms_Min) + ' Minutes';
    } else if (diff < ms_Day) {
        return Math.round(diff / ms_Hour) + ' Hours';
    } else if (diff < ms_Mon) {
        return Math.round(diff / ms_Day) + ' Days';
    } else if (diff < ms_Yr) {
        return Math.round(diff / ms_Mon) + ' Months';
    } else {
        return Math.round(diff / ms_Yr) + ' Years';
    }
}

commonJs.boldString = (text) => {
    var bold = /\*(.*?)\*/gm;
    var html = text.replace(bold, '<strong>$1</strong>');
    return html;
}

commonJs.setCaret = (el, pos) => {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(el, pos)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}

commonJs.scrollToBottom = (div) => {
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

commonJs.scrollSmoothToBottom = (div, ms = 100) => {
    $(div).animate({
        scrollTop: div.scrollHeight - div.clientHeight
    }, ms);
}

commonJs.openFilePicker = () => {
    return new Promise(resolve => {

        let FilePicker = document.createElement("input");
        FilePicker.type = "file";
        FilePicker.style.position = "fixed";
        FilePicker.style.top = "0";
        FilePicker.style.left = "0";
        FilePicker.style.width = "0";
        FilePicker.style.height = "0";
        FilePicker.style.opacity = "0";

        document.body.appendChild(FilePicker)

        FilePicker.click()
        FilePicker.addEventListener("input", (e) => {
            resolve(FilePicker.files)
        })

        FilePicker.remove()

    })
}

commonJs.formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}