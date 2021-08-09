'use strict';

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// Check whether it's mobile or not
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// Popup 
function popup() {
  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');
  let unlock = true;
  const timeout = 800;

  if(popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function(e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      })
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup._open');
      if(popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add('_open');
      currentPopup.addEventListener('click', function(e) {
        if(!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
      popupActive.classList.remove('_open');
      if(doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if(lockPadding.length > 0) {
      for(let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_lock');

    unlock = false;
    setTimeout(function() {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function(){
      if(lockPadding.length > 0) {
        for(let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function(e) {
    if(e.which === 27) {
      const popupActive = document.querySelector('.popup._open');
      popupClose(popupActive);
    }
  });
}

// Header on scroll 
function headerScroll() {
  let header = document.querySelector('.header');

  if (!isMobile.any()) {
    if (window.pageYOffset >= header.clientHeight * 0.9) header.classList.add('_on-scroll');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= header.clientHeight * 0.9) header.classList.add('_on-scroll');
      else header.classList.remove('_on-scroll');
    });
  }
}

// Offer img 
function equalizeOfferImagesWidth() {
  let offerImages = Array.from(document.querySelectorAll('.offer__img'));
  let offerImagesWidth = offerImages.map((image) => image.offsetWidth );
  let offerMaxWidth = Math.max(...offerImagesWidth);

  offerImages.forEach((image, index) => {
    if(image.offsetWidth != offerMaxWidth) {
      image.style.padding = `0px ${(offerMaxWidth - image.offsetWidth) / 2}px`;
    }
  });
}

// Services tabs 
function servicesTabs() {
  let 
    servicesTabs = document.querySelectorAll('.services__tab'),
    servicesTables = document.querySelectorAll('.services__table');

    servicesTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        let activeTabIndex = this.getAttribute('data-tab');

        for(let tab of servicesTabs) { tab.classList.remove('_active'); }
        this.classList.add('_active');

        for(let table of servicesTables) { table.classList.remove('_active'); }
        servicesTables.forEach(table => {
          if (table.getAttribute('data-tab-table') == activeTabIndex) {
            table.classList.add('_active');
          }
        })
      });
    });
}


// Calling the functions
popup();
headerScroll();
equalizeOfferImagesWidth();
servicesTabs();


// Intro slider 
let introSlider = new Swiper('.intro__slider', {
  // Other settings 
  speed: 900,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  simulateTouch: false,
  autoplay: {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
     delay: 5000,
   },

  // Bullets
  pagination: {
    el: '.intro__bullets',
    clickable: true,
  }
});

// Business slider 
let businessSlider = new Swiper('.business__slider', {
  // Arrows 
  navigation: {
    nextEl: '.business__next',
    prevEl: '.business__prev',
  },

  // Scrollbar
  scrollbar: {
    el: '.business__scrollbar',
    draggable: true,
  },

  // Keyboard 
  keyboard: {
    enabled: true, 
    onlyInViewport: true,
    pageUpDown: true,
  },

  // Other settings 
  slidesPerView: 3.5, 
  spaceBetween: 26,
  speed: 600,

  // breakpoints
  breakpoints: {

    320: {
      slidesPerView: 1.2,
    },

    576: {
      slidesPerView: 1.5
    },

    992: {
      slidesPerView: 2.5,
    },

    1200: {
      slidesPerView: 3.5, 
    },

  },
});

// Reviews slider 
let reviewsSlider = new Swiper('.reviews__slider', {
  // Arrows 
  navigation: {
    nextEl: '.reviews__next',
    prevEl: '.reviews__prev',
  },

  // Scrollbar
  scrollbar: {
    el: '.reviews__scrollbar',
    draggable: true,
  },

  // Keyboard 
  keyboard: {
    enabled: true, 
    onlyInViewport: true,
    pageUpDown: true,
  },

  // Other settings 
  slidesPerView: 1.2, 
  spaceBetween: 29,
  speed: 600,

  // breakpoints
  breakpoints: {

    320: {
      spaceBetween: 15,
      slidesPerView: 1.15, 
    },

    576: {
      spaceBetween: 29,
      slidesPerView: 1.2, 
    },

  },
});


// Clients slider 
let clientsSlider = new Swiper('.clients__slider', {
  // Arrows 
  navigation: {
    nextEl: '.clients__next',
    prevEl: '.clients__prev',
  },

  // Scrollbar
  scrollbar: {
    el: '.clients__scrollbar',
    draggable: true,
  },

  // Keyboard 
  keyboard: {
    enabled: true, 
    onlyInViewport: true,
    pageUpDown: true,
  },

  // Other settings 
  slidesPerView: 4.5, 
  spaceBetween: 24,
  speed: 600,

  // breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1.2,
    },

    576: {
      slidesPerView: 2.5
    },

    992: {
      slidesPerView: 3.5,
    },

    1200: {
      slidesPerView: 4.5, 
    },

  },
});
