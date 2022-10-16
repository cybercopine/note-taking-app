import {postData, getData} from '../../global-functions.js';

let nextNote = 0;
let noteID;

const newNoteBtn = document.querySelector('#add-note');
const closeBtn = document.getElementById('close-btn');
const addNoteBtn = document.querySelector('.add-note-btn');
const editNoteBtn = document.querySelector('.edit-note-btn');
const popUp = document.querySelector('.popup-box');
const popUpTitle = document.getElementById('title-box');
const popUpContent = document.getElementById('note-content')
const overlay = document.querySelector('.overlay');
const notesContainer = document.getElementById('notes-container');
const form = document.getElementById('entry-form');


window.onload = function() {
  getData('http://localhost:3000/my-notes', (notes) => {
    for(let i=0; i<notes.length; i++) {
      createNote(notes[i].title, notes[i].description);
    }
  })
}

function openWindow(isEdit = false) {
  console.log(isEdit);
  popUp.classList.remove('hidden');
  overlay.classList.remove('hidden');
  form.reset();

  if(isEdit) {
    addNoteBtn.classList.add('hidden');
    editNoteBtn.classList.remove('hidden');
  }
  else {
    addNoteBtn.classList.remove('hidden');
    editNoteBtn.classList.add('hidden');
  }
}

function closeWindow() {
  popUp.classList.add('hidden');
  overlay.classList.add('hidden');
}; 

closeBtn.addEventListener('click', closeWindow)

document.addEventListener('keydown', function (escBtn) {
    if (escBtn.key === 'Escape' && !popUp.classList.contains('hidden')) {
      closeWindow();
    }
  });

function editNoteHandler(id){
  openWindow(true);

  noteID = id;

  let note = document.getElementById(id);
  popUpTitle.value = note.getElementsByTagName('h1')[0].innerText;
  popUpContent.value = note.getElementsByTagName('p')[0].innerText;
};

editNoteBtn.addEventListener('click', function() {
  if(!popUpTitle.value || !popUpContent.value) {
    alert("Please enter a value for title and description");
    return;
  }

  postData('http://localhost:3000/update-note', {
    title: popUpTitle.value, 
    description: popUpContent.value, 
    id: noteID}, function() {
      let note = document.getElementById(noteID);
      note.getElementsByTagName('h1')[0].innerText = popUpTitle.value;
      note.getElementsByTagName('p')[0].innerText = popUpContent.value;
    });
  closeWindow();
})


function deleteNoteHandler(id) {
    noteID = id;

    let confirmDelete = confirm("Are you sure you want to delete?");
    if(!confirmDelete) {
      return;
    }
    else {
      postData('http://localhost:3000/delete-note', {id: noteID}, function() {
        document.getElementById(id).remove();
      })
    }
};

// function that creates the new note.
function createNote(title, content) {
  let id = nextNote;
  let newNote = `<div class="note" id="${nextNote}">
                  <h1>${title}</h1> 
                  <div class="editing-buttons fa-stack fa-1x">
                    <a href="#">
                      <i id="edit-icon-${nextNote}" class="fa-solid fa-pen"></i>
                    </a>
                    <a href="#">
                      <i id="delete-icon-${nextNote}" class="fa-solid fa-trash-can"></i>
                    </a>
                  </div>
                  <hr>
                  <p>${content}</p>
                </div>
              </div>`
  
  newNoteBtn.insertAdjacentHTML("afterend", newNote);

  const deleteNote = document.getElementById(`delete-icon-${nextNote}`);
  deleteNote.addEventListener('click', () => deleteNoteHandler(id))
  const editNoteIcon = document.getElementById(`edit-icon-${nextNote}`);
  editNoteIcon.addEventListener('click', () => editNoteHandler(id));

  nextNote++;
}

newNoteBtn.addEventListener('click', () => openWindow())

addNoteBtn.addEventListener('click', function() {
  if(!popUpTitle.value || !popUpContent.value) {
    alert("Please enter a value for title and description");
    return;
  }

  postData('http://localhost:3000/new-note', {
    title : popUpTitle.value,
    description : popUpContent.value
  }, () => createNote(popUpTitle.value, popUpContent.value)),
  closeWindow();
})


