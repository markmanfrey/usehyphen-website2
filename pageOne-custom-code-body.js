var cursorXray = document.getElementById('cursorXray');
var cursorResize = document.getElementById('cursorResize');
var cursorTumble = document.getElementById('cursorTumble');
var offsetkitchenHalf1 = document.getElementById('offsetKitchenHalf1');
var offsetXray = document.getElementById('offsetXray');
var offsetResize = document.getElementById('offsetResize');
var addIcon = document.getElementById('addIcon');
var subtractIcon = document.getElementById('subtractIcon');
var container = document.getElementById('resizeMakelineLottie');
var animation;
const parentMask = document.getElementById('offset');
const scrollMagicDiv = document.getElementById('scrollMagicDiv');
const parent = document.getElementById('parent');
const targetDiv = document.getElementById('kitchenXrayTest');
var controller = new ScrollMagic.Controller();

if (scrollMagicDiv) {
    var stickyStopPoint = scrollMagicDiv.offsetHeight + scrollMagicDiv.offsetTop;
    var vhInPixels = window.innerHeight * 4.5; 
    var scene = new ScrollMagic.Scene({
        triggerElement: '.scrollMagicDiv',
        duration: vhInPixels,
        triggerHook: 0,
    })
    .setPin(".scrollMagicDiv")
    .addTo(controller)
    .on("enter", function (e) {
        document.querySelector('.content').style.opacity = '1';
    })
    .on("leave", function (e) {
        document.querySelector('.content').style.opacity = '1';
    });

    var videoAzimuth = document.getElementById('cloudinaryAzimuthVideo');
    var triggerElement = document.getElementById('triggerElement');
    var sceneAzimuth = new ScrollMagic.Scene({
            triggerElement: triggerElement,
            triggerHook: 0,
        })
        .on("enter", function (event) {
            videoAzimuth.play();
        })
        .on("leave", function (event) {
            videoAzimuth.pause();
            videoAzimuth.currentTime = 0;
        })
        .addTo(controller);
} else {
    console.error('Element with class "scrollMagicDiv" not found.');
}

if (container) {
    animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://uploads-ssl.webflow.com/65aad9ed9c946a529975e7cd/660cc5723392cefdd6198b27_makeline_v4-resize-CROP_4.lottie.json'
    });
    animation.addEventListener('data_ready', function() {
        var specificFrame = 10;
        animation.goToAndStop(specificFrame, true);
    });
} else {
    console.error("Lottie container not found.");
}
var cld = cloudinary.Cloudinary.new({ cloud_name: 'davkwryyf' });

var playerXray = cld.videoPlayer('cloudinaryXrayVideo', {
    autoplay: true,
    loop: true,
    muted: true,
    controls: false,
    sourceTypes: ['mp4'],
    transformation: { quality: 'auto:best' }
});
var playerAzimuth = cld.videoPlayer('cloudinaryAzimuthVideo', {
    autoplay: false,
    loop: false,
    muted: true,
    controls: false,
    sourceTypes: ['mp4'],
    transformation: { quality: 'auto:best' }
});

const toggleButton = document.querySelector("#cursorXray");
let isVideoPlaying = false;
const pauseIconUrl = 'https://uploads-ssl.webflow.com/65aad9ed9c946a529975e7cd/65f2127b37eb82bdb6667f87_cursorXrayPause.png';
const playIconUrl = 'https://uploads-ssl.webflow.com/65aad9ed9c946a529975e7cd/65f346e3d682ea1b918a56ed_cursorXrayPlay.png';

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      if(window.location.hash) {
        const id = window.location.hash;
        const element = document.querySelector(productOverview);
        if(element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    
    document.querySelector("#splineScene2 > canvas").style.scale = 2.33;
    if (!toggleButton) {
        console.error("ToggleButton (div) not found.");
        return;
    }
    function togglePlay() {
        if (isVideoPlaying) {
            playerXray.pause();
        } else {
            playerXray.play();
        }
    }    
    function updateToggleButton() {
        if (isVideoPlaying) {
            toggleButton.style.backgroundImage = `url('${pauseIconUrl}')`;
        } else {
            toggleButton.style.backgroundImage = `url('${playIconUrl}')`;
        }
    }
    playerXray.on('play', function() {
        isVideoPlaying = true;
        updateToggleButton();
    });
    playerXray.on('pause', function() {
        isVideoPlaying = false;
        updateToggleButton();
    });
    playerXray.on('ended', function() {
        isVideoPlaying = false;
        updateToggleButton();
    });
    toggleButton.addEventListener("click", togglePlay);
    if (!cursorXray || !cursorResize || !offsetXray || !offsetResize) {
            console.error('Initialization failed: One or more elements not found.');
    } else {
        var lastCursorX = 0;
        var lastCursorY = 0;
        function updateCursorVisibility(e) {
            var offsetXrayRect = offsetXray.getBoundingClientRect();
            var offsetResizeRect = offsetResize.getBoundingClientRect();
            var offsetkitchenHalf1Rect = offsetkitchenHalf1.getBoundingClientRect();

            const isInXray = (lastCursorX >= offsetXrayRect.left && lastCursorX <= offsetXrayRect.right && 
            lastCursorY >= offsetXrayRect.top && lastCursorY <= offsetXrayRect.bottom);
            const isOutXray = !(lastCursorX >= offsetXrayRect.left && lastCursorX <= offsetXrayRect.right && 
            lastCursorY >= offsetXrayRect.top && lastCursorY <= offsetXrayRect.bottom);
            const isInKitchen = (lastCursorX >= offsetkitchenHalf1Rect.left && lastCursorX <= offsetkitchenHalf1Rect.right &&
            lastCursorY >= offsetkitchenHalf1Rect.top && lastCursorY <= offsetkitchenHalf1Rect.bottom);
            const isOutKitchen = !(lastCursorX >= offsetkitchenHalf1Rect.left && lastCursorX <= offsetkitchenHalf1Rect.right &&
            lastCursorY >= offsetkitchenHalf1Rect.top && lastCursorY <= offsetkitchenHalf1Rect.bottom);
            const isInResize = (lastCursorX >= offsetResizeRect.left && lastCursorX <= offsetResizeRect.right &&
            lastCursorY >= offsetResizeRect.top && lastCursorY <= offsetResizeRect.bottom);
            cursorTumble.style.display = (isInKitchen) ? 'block' : 'none';
            cursorXray.style.display = (isInXray && isOutKitchen) ? 'block' : 'none';
            cursorResize.style.display = (isInResize && isOutXray) ? 'flex' : 'none';

        }
        document.addEventListener('mousemove', function(e) {
            lastCursorX = e.pageX - window.pageXOffset;
            lastCursorY = e.pageY - window.pageYOffset;
            cursorTumble.style.left = (lastCursorX - 41) + 'px';
            cursorTumble.style.top = (lastCursorY - 41) + 'px';
            cursorXray.style.left = (lastCursorX - 41) + 'px';
            cursorXray.style.top = (lastCursorY - 41) + 'px';
            cursorResize.style.left = (lastCursorX - 80) + 'px';
            cursorResize.style.top = (lastCursorY - 41) + 'px';
            updateCursorVisibility();
        });

        cursorResize.addEventListener('click', function() {
            if (!animation) {
                console.error("Lottie animation not initialized.");
                return;
            }
            var addIconOpacity = parseFloat(window.getComputedStyle(addIcon).opacity);
            var addIconOpacityClamp = Math.max(.2, Math.min(addIconOpacity, 1))
var subtractIconOpacity = parseFloat(window.getComputedStyle(subtractIcon).opacity);
var subtractOpacityClamp = Math.max(.2, Math.min(subtractIconOpacity, 1));
var currentFrame = animation.currentFrame;
            console.log(`Click detected on resizeCursor. addIconOpacity: ${addIconOpacityClamp}, subtractIconOpacity: ${subtractOpacityClamp}`);

            if (addIconOpacityClamp > 0.5) {
                var nextFrame = currentFrame + 1;
                console.log("Playing forward.");
                animation.goToAndStop(nextFrame, true);
            } else if (subtractIconOpacity > 0.5) {
                var previousFrame = currentFrame - 1;
                if(previousFrame >= 0) { 
                        animation.goToAndStop(previousFrame, true);
                        console.log(`Attempting to decrement frame. Previous frame: ${previousFrame}`);
                    }   else {
                    console.log(`Previous frame calculation was less than 0. No action taken.`);
                }
            }
            
        });

        window.addEventListener('scroll', function() {
            updateCursorVisibility();
        });
    }
});
