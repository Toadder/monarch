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

// Header on scroll 
function headerScroll() {
  let header = document.querySelector('.header');

  if (!isMobile.any()) {
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
headerScroll();
equalizeOfferImagesWidth();
servicesTabs();

jQuery(document).ready(function($) {
  
  // Clients Slider
  if(window.matchMedia('(min-width: 1200px)').matches) {
    $('.clients__slider').on('init afterChange', function(event, slick, currentSlide, nextSlide){
      let clientsSlideActiveIndex = $('.clients__slide.slick-center:not(.slick-cloned)').data('slick-index') - 2;
      $('.clients__slide').removeClass('_active');
      $(`[data-slick-index=${clientsSlideActiveIndex}]`).addClass('_active'); 
    });
  }
  $('.clients__slider').slick({
    slidesToShow: 2,
    centerMode: true,
    centerPadding: '30.5%',
    appendArrows: $('.clients__flex'),
    speed: 600,

    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 1,
          centerPadding: '25%',
          speed: 750,
        }
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 1,
          centerPadding: '20%',
          speed: 750,
        }
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
          centerPadding: '15%',
          speed: 750,
        }
      },
    ]
  });

  // Reviews slider
  $('.reviews__slider').slick({
    appendArrows: $('.reviews__flex'),
    speed: 600, 
  });

  // Business slider
  $('.business__slider').slick({
    appendArrows: $('.business__flex'),
    centerMode: true,
    speed: 600,
    slidesToShow: 3,
    centerPadding: '16%',

    responsive: [
      {
        breakpoint: 1300, 
        settings: {
          centerPadding: '10%',
        }
      },
      {
        breakpoint: 1100, 
        settings: {
          centerPadding: '6%',
        }
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 2,
          centerPadding: '7%',
        }
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
          centerPadding: '22%',
        }
      },
      {
        breakpoint: 500, 
        settings: {
          slidesToShow: 1,
          centerPadding: '0%',
        }
      },
    ]
  });

  // Intro slider
  $('.intro__slider').slick({
    arrows: false,
    dots: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true, 
    autoplaySpeed: 8000,
    appendDots: $('.intro'), 
    infinite: true,
    swipeToSlide:true,
    slidesToShow:1
   });
  
});