var api = "http://program.pzhkj.cn"





function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}



document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, {
    passive: false
});