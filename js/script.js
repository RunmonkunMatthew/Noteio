const body = document.querySelector('body');
const mainPage = document.querySelector('.main-page');
const editPage = document.querySelector('.edit');
const header = document.querySelector('header');
const notes = mainPage.querySelectorAll('.note');
const addBtn = mainPage.querySelector('#addbtn');
const searchIcon = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const backArrow = editPage.querySelector('.arrow-left');
const editNote = editPage.querySelector('.edit-note')


function showNotes(e) {
    const selectedNote =  e.target.closest('.note');
    
    if (!selectedNote) return;
   
  const noteTitle = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');

     const header = selectedNote.querySelector('h2');
   const body = selectedNote.querySelector('p');
   selectedNote.classList.add('selected');
     
    noteTitle.value =   header.innerText;
     textArea.value = body.innerText;
   
 showEditPage();
};


function showMainPage() {
  mainPage.style.display = 'flex';
    header.style.display = 'flex';
    
    body.style.backgroundColor = '#fff';
    editPage.classList.add('hide')
    editPage.classList.remove('show');
}


function showEditPage(e) {
    mainPage.style.display = 'none';
    header.style.display = 'none';
    
    body.style.backgroundColor = '#ededd1';
    editPage.classList.add('show')
    editPage.classList.remove('hide');
};

//Event Listeners
notes.forEach((note) => {
  note.addEventListener('click', showNotes);
})

addBtn.addEventListener('click', showEditPage)

backArrow.addEventListener('click', showMainPage);

searchIcon.addEventListener('click',() => {
  searchInput.classList.add('slidein');
  searchInput.classList.toggle('hide');
});