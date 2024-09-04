function myFunction() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let slideIndex = 0;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  let timer;

  function showSlides() {
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (let i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }

      slideIndex++;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";

      timer = setTimeout(showSlides, 4000);
  }

  function plusSlides(n) {
      clearTimeout(timer);
      slideIndex += n;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      } else if (slideIndex < 1) {
          slideIndex = slides.length;
      }
      showSlides();
  }

  function currentSlide(n) {
      clearTimeout(timer);
      slideIndex = n;
      showSlides();
  }

  document.querySelector(".prev").addEventListener("click", function() {
      plusSlides(-1);
  });

  document.querySelector(".next").addEventListener("click", function() {
      plusSlides(1);
  });

  for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", function() {
          currentSlide(i + 1);
      });
  }

  showSlides();
});


document.addEventListener("DOMContentLoaded", function() {
    var paragraphs = document.querySelectorAll('.icon-block p');

    paragraphs.forEach(function(paragraph) {
        paragraph.addEventListener('mouseenter', function() {
          
            var icon = this.closest('.icon-block').querySelector('.my-icon');
            if (icon) {
                icon.style.opacity = '0.5';
            }
        });

        paragraph.addEventListener('mouseleave', function() {
            var icon = this.closest('.icon-block').querySelector('.my-icon');
            if (icon) {
                icon.style.opacity = '1';
            }
        });
    });
});

let currentSlideIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const slides = document.querySelector('.carousel-slides');
const slideWidth = document.querySelector('.carousel-slide').offsetWidth;
const slideCount = document.querySelectorAll('.carousel-slide').length;
const slidesToShow = 4; 


function updateSlidePosition() {
    slides.style.transform = `translateX(${-currentSlideIndex * slideWidth}px)`;
}


function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % (slideCount - slidesToShow + 1);
    updateSlidePosition();
}

let autoSlideInterval = setInterval(autoSlide, 5000); 


function startDrag(e) {
    isDragging = true;
    startPos = e.clientX;
    animationID = requestAnimationFrame(animation);
    slides.classList.add('grabbing'); 
}


function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slides.classList.remove('grabbing'); 

    const movedBy = currentTranslate - prevTranslate;
    const slideThreshold = slideWidth / 2;

    if (movedBy < -slideThreshold && currentSlideIndex < slideCount - slidesToShow) {
        currentSlideIndex++; 
    } else if (movedBy > slideThreshold && currentSlideIndex > 0) {
        currentSlideIndex--; 
    }

    updateSlidePosition();
    prevTranslate = currentSlideIndex * -slideWidth;
}


function drag(e) {
    if (isDragging) {
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }
}

// Анимация перетаскивания
function animation() {
    if (isDragging) requestAnimationFrame(animation);
}

// Открытие шторок
function openCurtains(slide) {
    const topCurtain = slide.querySelector('.curtain.top');
    const bottomCurtain = slide.querySelector('.curtain.bottom');
    topCurtain.classList.add('active');
    bottomCurtain.classList.add('active');
}


function closeCurtains(slide) {
    const topCurtain = slide.querySelector('.curtain.top');
    const bottomCurtain = slide.querySelector('.curtain.bottom');
    topCurtain.classList.remove('active');
    bottomCurtain.classList.remove('active');
}

function closeAllCurtains() {
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        closeCurtains(slide);
    });
}


document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
    slide.addEventListener('mouseenter', () => {
        closeAllCurtains();
        openCurtains(slide); 
    });

    slide.addEventListener('mouseleave', () => {
        closeCurtains(slide); 
    });
});


slides.addEventListener('mousedown', startDrag);
slides.addEventListener('mouseup', endDrag);
slides.addEventListener('mousemove', drag);