let nextNote = 1;


const newNoteBtn = document.querySelector('#add-note');
const closeBtn = document.getElementById('close-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const popUp = document.querySelector('.popup-box');
const popUpTitle = document.getElementById('title-box');
const popUpContent = document.getElementById('note-content')
const overlay = document.querySelector('.overlay');
const notesContainer = document.getElementById('notes-container');

function openWindow() {
    popUp.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

newNoteBtn.addEventListener('click', openWindow)

function closeWindow() {
    popUp.classList.add('hidden');
    overlay.classList.add('hidden');
    popUpTitle.value = "";
    popUpContent.value = "";
}; 
closeBtn.addEventListener('click', closeWindow)

document.addEventListener('keydown', function (escBtn) {
    if (escBtn.key === 'Escape' && !popUp.classList.contains('hidden')) {
      closeWindow();
    }
  });

function editNoteHandler(id){
  openWindow();
  addNoteBtn.textContent = 'Edit';
};

function deleteNoteHandler(id) {
    let confirmDelete = confirm("Are you sure you want to delete?");
    if(!confirmDelete) return;
    let note = document.getElementById(id);
    note.remove();
    
};


// function that creates the new note.
function createNote() {
  let id = nextNote;
  let newNote = `<div class="note" id="${nextNote}">
                  <h1>${popUpTitle.value}</h1> 
                  <div class="editing-buttons fa-stack fa-1x">
                    <a href="#">
                      <i id="edit-icon-${nextNote}" class="fa-solid fa-pen"></i>
                    </a>
                    <a href="#">
                      <i id="delete-icon-${nextNote}" class="fa-solid fa-trash-can"></i>
                    </a>
                  </div>
                  <hr>
                  <p>${popUpContent.value}</p>
                </div>
              </div>`
  
  newNoteBtn.insertAdjacentHTML("afterend", newNote);

  const deleteNote = document.getElementById(`delete-icon-${nextNote}`);
  deleteNote.addEventListener('click', () => deleteNoteHandler(id))
  const editNote = document.getElementById(`edit-icon-${nextNote}`);
  editNote.addEventListener('click', () => editNoteHandler(id));

  nextNote++;
}

let postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });

  try {
      const allData = await response.json()
      createNote();
      
  }
  catch (error) {
      console.log("error", error);
  }
}

addNoteBtn.addEventListener('click', function() {
  if(!popUpTitle.value || !popUpContent.value) {
    alert("Please enter a value for title and description");
    return;
  }
  createNote();
  closeWindow();
})