/**
 * Created by humorHan on 2017/7/7.
 */
// 设置事件监听器
window.addEventListener("DOMContentLoaded", function () {
    // 获取元素
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = {"video": true},
        errBack = function (error) {
            console.log("Video capture error: ", error.code);
        };

    // 设置video监听器
    if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        }, function (error) {
            console.log("Video capture error: ", error.code);
        });
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            }, function (error) {
                console.log("Video capture error: ", error.code);
            }
        });
    }
}, false);