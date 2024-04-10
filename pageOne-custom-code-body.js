document.addEventListener('DOMContentLoaded', function() {
        var cld = cloudinary.Cloudinary.new({ cloud_name: 'davkwryyf' });

        var playerQuad = cld.videoPlayer('cloudinaryQuadVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerGuac = cld.videoPlayer('cloudinaryGuacVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerSixth = cld.videoPlayer('cloudinarySixthVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerSauce = cld.videoPlayer('cloudinarySauceVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerBigmouth = cld.videoPlayer('cloudinaryBigmouthVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerOffspring = cld.videoPlayer('cloudinaryOffspringVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        var playerSensor = cld.videoPlayer('cloudinarySensorVideo', {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            sourceTypes: ['mp4'],
            transformation: { quality: 'auto:best' }
        });
        const moveLeftButton = document.getElementById('hmiToggle-button-left');
        const moveRightButton = document.getElementById('hmiToggle-button-right');
        const hmiMovableDiv = document.getElementById('hmiSliderDiv');
        const ordershmi1 = document.getElementById('ordershmi1');
        moveLeftButton.style.backgroundColor = 'white';
        moveLeftButton.style.color = 'black';

        moveLeftButton.addEventListener('click', function() {
            hmiMovableDiv.style.left = '18%';
            moveLeftButton.style.backgroundColor = 'white';
            moveLeftButton.style.color = 'black';
            moveRightButton.style.backgroundColor = 'black';
            moveRightButton.style.color = 'white';
            ordershmi1.style.filter = 'blur(0px) brightness(100%)';
        });

        moveRightButton.addEventListener('click', function() {
            hmiMovableDiv.style.left = '-37%';
            moveLeftButton.style.backgroundColor = 'black';
            moveLeftButton.style.color = 'white';
            moveRightButton.style.backgroundColor = 'white';
            moveRightButton.style.color = 'black';
            ordershmi1.style.filter = 'blur(5px) brightness(50%)';
        });

        const buttonA = document.getElementById('cabinets-buttonA');
        const buttonB = document.getElementById('cabinets-buttonB');
        const buttonC = document.getElementById('cabinets-buttonC');
        const cabinetsMovableDiv = document.getElementById('cabinets-slidingDiv');
        var cleaningDescriptionText = document.getElementById('cabinetsDescriptionText');
        var textA = "Heated cabinets allow you to hold warm ingredients like proteins and grains to spec. Temperature settings can range from 125°F to 155°F based on your specific culinary needs.";
        var textB = "Cold cabinets ensure consistent freshness and culinary integrity for greens, veggies, and other various categories. Temperature settings can range from 33°F to 41°F.";
        var textC = "Ambient cabinets allow for dry-hold ingredients like crunches, nuts, seeds, croutons, and other various types that don’t require a specific temperature.";
        cleaningDescriptionText.textContent = textA;

        buttonA.style.backgroundColor = 'white';
        buttonA.style.color = 'black';

        buttonA.addEventListener('click', function() {
            cabinetsMovableDiv.style.right = '0%';
            buttonA.style.backgroundColor = 'white';
            buttonB.style.backgroundColor = 'black';
            buttonC.style.backgroundColor = 'black';
            buttonA.style.color = 'black';
            buttonB.style.color = 'white';
            buttonC.style.color = 'white';
            cleaningDescriptionText.textContent = textA;
        });

        buttonB.addEventListener('click', function() {
            cabinetsMovableDiv.style.right = '100%';
            buttonA.style.backgroundColor = 'black';
            buttonB.style.backgroundColor = 'white';
            buttonC.style.backgroundColor = 'black';
            buttonA.style.color = 'white';
            buttonB.style.color = 'black';
            buttonC.style.color = 'white';
            cleaningDescriptionText.textContent = textB;
        });

        buttonC.addEventListener('click', function() {
            cabinetsMovableDiv.style.right = '200%';
            buttonA.style.backgroundColor = 'black';
            buttonB.style.backgroundColor = 'black';
            buttonC.style.backgroundColor = 'white';
            buttonA.style.color = 'white';
            buttonB.style.color = 'white';
            buttonC.style.color = 'black';
            cleaningDescriptionText.textContent = textC;
        });

        const dispenserPrevious = document.getElementById('dispenser-button-previous');
        const dispenserNext = document.getElementById('dispenser-button-next');

        const slides = document.querySelectorAll('#dispenserSliderDiv .dispenserslidecontent');
        let currentSlideIndex = 0;
        
        function updateButtonStates() {
            dispenserNext.style.pointerEvents = 'auto';
            dispenserPrevious.style.pointerEvents = 'none';
            dispenserPrevious.style.opacity = '.5';
            dispenserNext.style.opacity = '1';

            if (currentSlideIndex === 0) {
                dispenserPrevious.style.pointerEvents = 'none';
                dispenserPrevious.style.opacity = '0.5';
            } else {
                dispenserPrevious.style.pointerEvents = 'auto';
                dispenserPrevious.style.opacity = '1';
            }
            if (currentSlideIndex === slides.length - 1) {
                dispenserNext.style.pointerEvents = 'none';
                dispenserNext.style.opacity = '0.5';
            } else {
                dispenserNext.style.pointerEvents = 'auto';
                dispenserNext.style.opacity = '1';
            }
        }

        function initializeSlides() {
            slides.forEach((slide, index) => {
                slide.style.left = index === currentSlideIndex ? '0%' : '100%';
                if (index === currentSlideIndex) {
                    slide.classList.add('active-slide');
                } else {
                    slide.classList.remove('active-slide');
                }
            });
        }

        function changeSlide(direction) {
            console.log(`Moving slide ${direction > 0 ? 'forward' : 'backward'}.`);
            currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
            initializeSlides();
            updateButtonStates();
        }

        initializeSlides();
        updateButtonStates();

        dispenserPrevious.addEventListener('click', function() {
            changeSlide(-1);
        });

        dispenserNext.addEventListener('click', function() {
            changeSlide(1);
        });

        let navButton = $(".nav_button");
      let menuWrap = $(".menu_wrap");
      let menuBackground = $(".menu_background");
      let menuPanels = $(".menu_panel");
      let content = $(".menu_content");
      let lines = $(".nav_button_line");
      let backButton = $(".go-back");
      let opensMore = $(".opens-more");
      let previouslyFocused;
      let activeSubPanel;
    
      let showSubMenu = gsap.timeline({
        paused: true,
        onComplete: () => {
          activeSubPanel.find("a").first().focus();
        },
        onReverseComplete: () => {
          previouslyFocused.focus();
        }
      });
      showSubMenu.to(menuPanels, { x: "-100%", ease: "power1.inOut", duration: 0.4 });
    
      let showMainMenu = gsap.timeline({
        paused: true,
        defaults: { duration: 0.3 },
        onReverseComplete: () => {
          showSubMenu.progress(0);
          showSubMenu.pause();
          navButton.attr("aria-label", "Open Main Menu");
        },
        onComplete: () => {
          menuWrap.find("button").first().focus();
          navButton.attr("aria-label", "Close Main Menu");
        }
      });
      showMainMenu.set(menuWrap, { display: "flex" });
      showMainMenu.set(menuBackground, { display: "block" });
      showMainMenu.from(menuWrap, { x: "100%" });
      showMainMenu.from(menuBackground, { opacity: 0 }, "<");
      showMainMenu.to(lines.eq(0), { y: 9, rotate: 45 }, "<");
      showMainMenu.to(lines.eq(1), { y: -9, rotate: -45 }, "<");
    
      navButton.on("click", function () {
        console.log("menu button clicked");
        if (showMainMenu.progress() === 0) {
          showMainMenu.play();
        } else {
          showMainMenu.reverse();
          navButton.attr("aria-label", "Open Main Menu");
        }
      });
    
      menuBackground.on("click", function () {
        showMainMenu.reverse();
      });
      $(document).on("keydown", function (e) {
        if (e.key === "Escape") showMainMenu.reverse();
      });
    
      opensMore.on("click", function () {
        previouslyFocused = $(this);
        let linkIndex = $(this).index();
        showSubMenu.play();
        content.hide();
        activeSubPanel = content.eq(linkIndex).show();
      });
    
      backButton.on("click", function () {
        showSubMenu.reverse();
      });
      backButton.on("keydown", function (e) {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                activeSubPanel.find("a, button").last().focus();
            }
      });
    
      $("[trap-focus]").each(function () {
        let focusBack = $(this).attr("focus-back");
        let lastItem = $(this).find("a, button").last();
        lastItem.on("keydown", function (e) {
          if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            if (focusBack === "true") {
              backButton.focus();
            } else {
              navButton.focus();
            }
          }
        });
      });
});
