const newNoteBtn = document.querySelector('#add-note');
const closeBtn = document.getElementById('close-btn');
const deleteNote = document.getElementById('trash-icon');
const addNoteBtn = document.getElementById('add-note-button');
const popUp = document.querySelector('.popup-box');
const overlay = document.querySelector('.overlay');

function openWindow() {
    popUp.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

newNoteBtn.addEventListener('click', openWindow)

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

// function that creates the new note.
function createNote() {

  

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
        createNote(allData);
    }
    catch (error) {
        console.log("error", error);
    }

}

deleteNote.addEventListener('click', function() {
  let confirmDelete = confirm("Are you sure you want to delete?");
  if(!confirmDelete) return;
  console.log("Hello World!")
})