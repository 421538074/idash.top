/**
 * 获得浏览器UA信息
 */
function getDeviceObj() {
	var ua = navigator.userAgent.toLowerCase();
	return {
		isInWeixin: /micromessenger/.test(ua),
		isAndroid: /android/.test(ua),
		isIpad: /ipad/.test(ua),
		isIphone: /iphone/.test(ua)
	}
}

/**
 * 根据UA返回是否需要提示用户在浏览器打开
 */
function switchPlatform() {
	var isCanDownload = false;
	var deviceObj = getDeviceObj();
	if (deviceObj.isInWeixin) {
		if (!deviceObj.isAndroid && !deviceObj.isIpad && !deviceObj.isIphone) {
			//在PC端打开,可以直接下载
			isCanDownload = true;
		} else {
			//在移动端微信打开,需要在其他浏览器打开
			isCanDownload = false;
		}
	} else {
		isCanDownload = true;
	}
	return isCanDownload;
}

/**
 * 开始下载
 */
function getDownload(href, title) {
	var isCanDownload = switchPlatform();
	if (isCanDownload) {
		var elem = document.createElement('a');
		elem.href = href.indexOf('pzhkj.cn') == -1 ? api+href : href;
		elem.download = title;
		document.body.appendChild(elem);
		elem.click();
	} else {
		var params = `title=${encodeURI(title)}&href=${encodeURI(href)}`;
		params = Base64.encode(params);
		window.location.href = `user-director.html?${params}`;
	}
}

/**
 * 获得URL参数
 */
function getParams(list) {
    list = list.split('&');
    var param = {};
    list.forEach(function (value, index) {
        var temp = value.split('=');
        param[temp[0]] = decodeURI(temp[1]);
    });
    return param;
}