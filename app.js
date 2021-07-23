const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const search = document.getElementById('search');
const duration = document.getElementById('duration')
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '22455870-f0c25e0db6452869120b332a4';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}
//("https://pixabay.com/api/?key=22455870-f0c25e0db6452869120b332a4"
//showImages(data.hits)

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=22455870-f0c25e0db6452869120b332a4&q=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits) )
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  console.log(sliders)
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sldr1 = sliders.filter(slide => slide != img );
    sliders = sldr1; 
    element.classList.remove('added');
  }
}

var timer = 0;
const createSlider = () => {
  // check slider image length 
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)

  if(duration >0){
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
  else{
    alert("System Errors")
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(item => {
    item.style.display = "none"
  })
  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'block';
  clearInterval(timer);
  sliders.length = 0;
  getImages(search.value) 
})

search.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
      document.querySelector('.main').style.display = 'block';
      clearInterval(timer);
      sliders.length = 0;
      getImages(search.value); 
  }
});

sliderBtn.addEventListener('click', function () {
  createSlider()
})

// I did this extra.

duration.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createSlider();
  }
});