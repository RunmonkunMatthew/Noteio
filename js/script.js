const mainPage = document.querySelector('.main-page');
const edit = document.querySelector('.edit');
const note = document.querySelector('.note');
const searchIcon = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');


function toggleSearch() {
  console.log('clicked');
  
  searchInput.classList.toggle('hide');
};

//Event Listeners
searchIcon.addEventListener('click', toggleSearch);
