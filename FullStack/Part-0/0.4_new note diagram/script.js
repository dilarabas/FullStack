document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');

    function loadNotes() {
        const storedNotes = localStorage.getItem('notes');
        
        if (storedNotes) {
            const notes = JSON.parse(storedNotes);
            
            notes.forEach(note => {
                const li = document.createElement('li');
                li.textContent = note;
                noteList.appendChild(li);
            });
        }
    }


    loadNotes();

    saveButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        
        if (noteText) {
            const li = document.createElement('li');
            li.textContent = noteText;
            alert('Your text has been saved.');

            noteList.appendChild(li);

            let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
            
            notes.push(noteText);

            localStorage.setItem('notes', JSON.stringify(notes));

            
            noteInput.value = '';
        } 
        
        else {
            alert('Please enter a text!');
        }
    });
});