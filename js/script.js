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

// Pwa plug-in
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

//display notes in the dom
function displayNotesInStorage() {
  let notesFromStorage = getNotesFromStorage();
  
  notesFromStorage.forEach((note) => {
    
    addNoteToDom(note.id, note.header, note.body);
  })
} 

// add notes to the Dom
function addNoteToDom(noteId, headerText, bodyText){
  const div = document.createElement('div');
  div.classList = 'note';
  div.dataset.id = noteId;
  
  const header = document.createElement('h2');
  const body = document.createElement('p');
  
  header.textContent = headerText;
  body.textContent = bodyText;
  
  div.appendChild(header)
  div.appendChild(body);
  
const allnotes = mainPage.querySelector('.allnotes');

  allnotes.appendChild(div);
  
  checkUi();
}

//Add notes to local storage 
function addNoteToStorage(noteId, headerValue, bodyValue) {
  let notesFromStorage = getNotesFromStorage();
  
  let newNote = {
    id: noteId,
    header: headerValue.trim(),
    body: bodyValue.trim()
  }
  
  notesFromStorage.push(newNote);
  
   localStorage.setItem('notes', JSON.stringify(notesFromStorage));
};

//get notes from storage
function getNotesFromStorage() {
   let notes = JSON.parse(localStorage.getItem('notes')) || [];
   
   return notes;
 };

//open editpage 
function openEdit() {
  const noteTitle = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');
const check = document.querySelector('.check');

    noteTitle.value = '';
    textArea.value = '';
    check.classList.add('hide')
    
    mainPage.style.display = 'none';
    header.style.display = 'none';
    searchInput.classList.add('hide');

    
    body.style.backgroundColor = '#ededd1';
    editPage.classList.add('show')
    editPage.classList.remove('hide');
    
    saveBtn.removeAttribute('data-id');
    
    saveBtn.innerHTML = `
      <i class="fa-regular fa-floppy-disk"></i>
    `;
    
    closeOffcanvas();
}

//put selected notes into edit page
function putNoteToEdit(e) {
    let selectedNote =  e.target;
    
    if (!selectedNote.classList.contains('note')) {
      selectedNote = selectedNote.closest('.note');
    }
    
    if (selectedNote && selectedNote.classList.contains('note')) {
      
      const noteId = selectedNote.dataset.id;
      
      notes.forEach((note) => {
        note.classList.remove('selected')
      });
      
      const noteTitle = editNote.querySelector('input');
const textArea = editNote.querySelector('textarea');
const selectedNoteTitle = editPage.querySelector('h5');

     const header = selectedNote.querySelector('h2') || document.createElement('h2');
   const body = selectedNote.querySelector('p') || document.createElement('p');
   
   selectedNote.classList.add('selected');
     
    noteTitle.value =   header.innerText || 'Untitled Note';
     textArea.value = body.innerText || 'No Content Available';
     selectedNoteTitle.innerText = header.innerText;
    }
    
   editNote.dataset.id = selectedNote.dataset.id;
   
   saveBtn.dataset.id = 'update';
   
   saveBtn.innerHTML = `
      <i class="fa fa-edit"></i>
   `
  showEditPage();
};

//search function 
function searchNotes(e) {
  const searchInput = document.querySelector('#searchinput');

  const input = searchInput.value.toLowerCase();
     
   const notes = document.querySelectorAll('.note');
   
  notes.forEach((note) => {
    let noteHeader = note.querySelector('h2');
    
    if(noteHeader.textContent.toLowerCase().includes(input)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  })
}

function saveNotes() {
  const headerText = noteInput.value.trim(); 
  const bodyText = textArea.value.trim();  

  if (headerText === '' && bodyText === '') {
    showAlert('Note cannot be empty!');
    return;
  }
  
  const noteId = generateUniqueId();

// Add Notes to Dom
  addNoteToDom(noteId, headerText, bodyText);
  
  // Add Notes to local storage 
  addNoteToStorage(noteId, headerText, bodyText);
  
}

// Save edited notes 
function saveEditedNote() {
  const noteToBeEdited = document.querySelector('.edit-note');
  
  const noteId = noteToBeEdited.dataset.id;
  
  const updatedHeader = noteToBeEdited.querySelector('input').value.trim();
  
  const updatedBody = noteToBeEdited.querySelector('textarea').value.trim();
  
  if (!updatedHeader && !updatedBody) {
    showAlert('Note cannot be empty!');
      return;
  }
  
  //update note in storage 
  updateNoteInStorage(noteId, updatedHeader, updatedBody);
  
  // update note in the dom
  const selectedNote = document.querySelector(`.note[data-id="${noteId}"]`);
  
  if (selectedNote) {
    const headerEl = selectedNote.querySelector('h2');
    const bodyEl = selectedNote.querySelector('p');
    
    headerEl.textContent = updatedHeader || 'Untitled Note';
    bodyEl.textContent = updatedBody || 'No Content Available';
  }
  
}

// update note in storage 
function updateNoteInStorage(noteId, updatedHeader, updatedBody) {
  let notesFromStorage = getNotesFromStorage();
  
    notesFromStorage =  notesFromStorage.map((note) => {
    if (note.id === noteId) {
    
      return {
        ...note,
        header: updatedHeader, 
        body: updatedBody }
    }
    return note;
  }
  );
  
  // save updated note 
  localStorage.setItem('notes', JSON.stringify(notesFromStorage));
  
 showAlert('Note Updated Successfully');
}

//show main page
function showMainPage() {
  saveBtn.classList.add('hide');
  
    const searchInput = document.querySelector('#searchinput');
  searchInput.value = '';
  
  notes.forEach((note) => {
    note.style.display = 'block'
    
    note.classList.remove('selected');
  })
  
  mainPage.style.display = 'flex';
    header.style.display = 'flex';
    
    body.style.backgroundColor = '#fff';
    editPage.classList.add('hide')
    editPage.classList.remove('show');
    
    if (noteInput.value === '') {
   noteInput.value = 'Note Title'
  return;
}
   saveBtn.innerHTML = ``;
    
    checkUi();
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
    
    const noteId = selectedNote.dataset.id;
    
   removeNoteFromStorage(noteId);
   
   showAlert('Note Deleted Successfully')
    
    showMainPage();
  } else {
    return;
  }
  closeOffcanvas();
}

function removeNoteFromStorage(noteId) {
  notesFromStorage = getNotesFromStorage();
  
  notesFromStorage = notesFromStorage.filter((note) => note.id !== noteId);
  
  localStorage.setItem('notes', JSON.stringify(notesFromStorage));
}

//Clear all notes
function clearAllNotes() {
  const allNotes = mainPage.querySelector('.allnotes');
  
  allNotes.innerHTML = '';
  
  localStorage.removeItem('notes');
  
  checkUi();
  
 showAlert('Notes Cleared Successfully')
  
  closeOffcanvas();
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
 const check = document.querySelector('.check');
 
 if (notes.length === 0) {
   check.classList.remove('hide');
 } else{
   check.classList.add('hide');
 }
 
}

function showAlert(message) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert');
  alertEl.style.backgroundColor = 'mediumseagreen'
  alertEl.appendChild(document.createTextNode(message));
  
  document.querySelector('.alertdiv').appendChild(alertEl);
  
  setTimeout(() => alertEl.remove() , 3000);
}

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}




//Initialize 
function init() {
   //Event Listeners
allnotes.addEventListener('click', putNoteToEdit);

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
});

clearBtn.addEventListener('click', clearAllNotes);  

deleteBtn.addEventListener('click', deleteNote);

saveBtn.addEventListener('click', () => {
  if (saveBtn.dataset.id === 'update') {
   saveEditedNote();
} else{
  saveNotes();
 showAlert('Note created successfully');
}
  
});

searchInput.addEventListener('input', searchNotes);

window.addEventListener('DOMContentLoaded', displayNotesInStorage)

checkUi();
};

init();