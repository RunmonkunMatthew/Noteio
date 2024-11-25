const body = document.querySelector('body');
const mainPage = document.querySelector('.main-page');
const editPage = document.querySelector('.edit');
const header = document.querySelector('header');
const allnotes = mainPage.querySelector('.allnotes');
const notes = allnotes.querySelectorAll('.note');
const addBtn = document.querySelectorAll('#addbtn');
const searchIcon = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const backArrow = editPage.querySelector('.arrow-left');
const editNote = editPage.querySelector('.edit-note');
const noteInput = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');
const saveBtn = document.getElementById('save');
const importBtn = document.querySelector('#importbtn');
const clearBtn = document.querySelector('#clearbtn');
const deleteBtn = editPage.querySelector('#delete');
const ExportBtn = editPage.querySelector('#export');


function addNoteToDom(){
  const div = document.createElement('div');
  div.classList = 'note';
  
  const header = document.createElement('h2');
  const body = document.createElement('p');
  
  const allnotes = mainPage.querySelector('.allnotes');
 
 const noteTitle = editNote.querySelector('input');
 const textArea = editNote.querySelector('textarea');

  header.textContent = noteTitle.value;
  body.textContent = textArea.value;

  div.appendChild(header)
  div.appendChild(body);
  

  allnotes.appendChild(div);
}

//open editpage 
function openEdit() {
  const noteTitle = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');

    noteTitle.value = '';
    textArea.value = '';
    
    mainPage.style.display = 'none';
    header.style.display = 'none';
    searchInput.classList.add('hide');

    
    body.style.backgroundColor = '#ededd1';
    editPage.classList.add('show')
    editPage.classList.remove('hide');
    
    closeOffcanvas();
}

//put selected notes into edit page
function putNoteToEdit(e) {
    const selectedNote =  e.target.closest('.note');
    
    if (!selectedNote) return;
   
  const noteTitle = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');
const selectedNoteTitle = editPage.querySelector('h5');

     const header = selectedNote.querySelector('h2');
   const body = selectedNote.querySelector('p');
   selectedNote.classList.add('selected');
     
    noteTitle.value =   header.innerText;
     textArea.value = body.innerText;
     
     selectedNoteTitle.innerText = header.innerText;
   
 showEditPage();

};

function saveNotes() {
  saveBtn.classList.add('hide');
}

//show main page
function showMainPage() {
  saveBtn.classList.add('hide');
  notes.forEach((note) => {
    note.classList.remove('selected');
  })
  
  mainPage.style.display = 'flex';
    header.style.display = 'flex';
    
    body.style.backgroundColor = '#fff';
    editPage.classList.add('hide')
    editPage.classList.remove('show');
};

//show edit page
function showEditPage() {
    mainPage.style.display = 'none';
    header.style.display = 'none';
    searchInput.classList.add('hide');
    
    body.style.backgroundColor = '#ededd1';
    editPage.classList.add('show')
    editPage.classList.remove('hide');
};

//delete note
function deleteNote(e) {
  const selectedNote = mainPage.querySelector('.note.selected');
  
  if (selectedNote) {
    selectedNote.remove();
    showMainPage();
  } else {
    return;
  }
  closeOffcanvas();
}

//Clear all notes
function clearAllNotes() {
  const allNotes = mainPage.querySelector('.allnotes');
  
  allNotes.innerHTML = '';
  
  checkUi();
};

function closeOffcanvas() {
  const offcanvasElement = document.getElementById('offcanvasRight');
  const offcanvasElement2 = document.getElementById('offcanvasScrolling');
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
  const offcanvasInstance2 = bootstrap.Offcanvas.getInstance(offcanvasElement2);

  if (offcanvasInstance) {
    offcanvasInstance.hide(); 
  } else if (offcanvasInstance2) {
    offcanvasInstance2.hide(); 
  }
}

function checkUi() {
 const notes = mainPage.querySelectorAll('.note');
 const allnotes = mainPage.querySelector('.allnotes')
 
 if (notes.length === 0) {
   const div = document.createElement('div');
   div.innerHTML = `<strong>No Notes here yet</strong>`
   div.classList.add('check');
   
   allnotes.appendChild(div);
 }
}


//Initialize 
function init() {
   //Event Listeners
notes.forEach((note) => {
  note.addEventListener('click', putNoteToEdit);
})

searchIcon.addEventListener('click',() => {
  searchInput.classList.add('slidein');
  searchInput.classList.toggle('hide');
});

addBtn.forEach((btn) => {
  btn.addEventListener('click', openEdit);
})

backArrow.addEventListener('click', showMainPage);
noteInput.addEventListener('input', () => {
  saveBtn.classList.remove('hide');
})
textArea.addEventListener('input', () => {
  saveBtn.classList.remove('hide');
})
clearBtn.addEventListener('click', clearAllNotes);  
deleteBtn.addEventListener('click', deleteNote)
saveBtn.addEventListener('click', addNoteToDom)


};

init();
