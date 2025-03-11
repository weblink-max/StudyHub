function request () {
  let res = {
    home:`
   <div class="widget">
        <div class="welcome">
          <h1>Welcome</h1>
        <p>Suman Sutradhar</p>
        </div>
        
      </div>
      <div class="widget">
        <div class="card hover2">
          <span class="material-symbols-outlined">book</span>
            <p onclick="note()">Notes</p>
        </div>
        <div class="card hover2">
          <span class="material-symbols-outlined">docs</span>
            <p>PYQ</p>
        </div>
        <div class="card hover2">
          <span class="material-symbols-outlined">docs</span>
<p>Sample paper</p>
        </div>
      </div>
  `,
  marks:"<h1>marks</h1>",
  doubt:"<h1>doubt</h1>",
  mockTest:"<h1>mock test</h1>",
  music:"<h1>music</h1>",
  profile:` <div class="widget">
        <div class="welcome">
          <h1>Welcome</h1>
        <p>Suman Sutradhar</p>
        </div>
        <div id="profile">
          <span class="material-symbols-outlined">person</span>
        </div>
      </div>
      <div class="widget">
        <div class="card hover2">
          <span class="material-symbols-outlined">book</span>
            <p>Your Notes</p>
        </div>
        <div class="card hover2">
          <span class="material-symbols-outlined">docs</span>
            <p>Upcoming exams</p>
        </div>
        <div class="card hover2">
          <span class="material-symbols-outlined">docs</span>
<p>Marks</p>
        </div>
      </div>`
  }
  return res
}
function reqNotes(){
  let res = [{
    question:"What is momentum?",
    answer:"The product of mass and velocity is called Momentum.",
    apperance: ["2020","2023"],
    qno: "1"
  },{
    question:"What is momentum?",
    answer:"The product of mass and velcocity is called Momentum.",
    apperance: ["2020","2023"],
    qno: "1"
  },{
    question:"What is momentum?",
    answer:"The product of mass and velcocity is called Momentum.",
    apperance: ["2020","2023"],
    qno: "1"
  }]
  
  return res;
}
function notePad(res) {
  let html="";
  let chips="";
  
  res.map((note)=>{
    note.apperance.map((chip)=>{
      chips+=`<span>${chip}</span>
      `
    });
    html+=`<div class="question">
          <p>${note.qno}. ${note.question}</p>
            <div class="chips">
              ${chips}
            </div>
       
        </div>
          <p><b>Answer</b>: ${note.answer}</p>
    `
    chips=""
  })
  return `
  <div class="widget note">${html}</div>
  `
}
function note(){
  
}
function setActive(selectedItem,name) {
    const items = document.querySelectorAll('.nav li');
    const indicator = document.querySelector('.indicator');
    const content = document.querySelector("#content");
    
    items.forEach(item => item.classList.remove('active'));
    selectedItem.classList.add('active');

    // Move indicator to the selected item
    const itemRect = selectedItem.getBoundingClientRect();
    const navRect = document.querySelector('.nav').getBoundingClientRect();
    const offset = itemRect.left - navRect.left + itemRect.width / 2;

    indicator.style.left = `${offset}px`;
    
    let res=request()
    content.innerHTML= res[name];
}

// Set default active item
window.onload = function () {
    setActive(document.getElementById('home'),"home");
    
  const contextMenu = document.getElementById('contextMenu');

const showContextMenu = (event) => {
  event.preventDefault();
  
  // Get the mouse coordinates
  const { clientX: mouseX, clientY: mouseY } = event;
  
  // Initially display the menu so we can measure its size
  contextMenu.style.display = 'flex';
  
  // Get dimensions of the menu and the window
  const menuRect = contextMenu.getBoundingClientRect();
  const menuWidth = menuRect.width;
  const menuHeight = menuRect.height;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Calculate the ideal position
  let top = mouseY;
  let left = mouseX;
  
  // If the menu would extend beyond the right edge, adjust its left position
  if (mouseX + menuWidth > windowWidth) {
    left = windowWidth - menuWidth;
  }
  
  // If the menu would extend beyond the bottom edge, adjust its top position
  if (mouseY + menuHeight > windowHeight) {
    top = windowHeight - menuHeight;
  }
  
  // Ensure the values are not negative
  top = Math.max(top, 0);
  left = Math.max(left, 0);
  
  // Apply the calculated positions
  contextMenu.style.top = `${top - 1.5 * menuHeight}px`;
  contextMenu.style.left = `${left - 16}px`;
};

// Example event listener for desktop right-click
document.addEventListener('contextmenu', showContextMenu);

// Hide the menu on click elsewhere
document.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});
  

    const getSelectedText = () => {
      const selectedText = window.getSelection();
      return selectedText.toString().trim();
  };
    

    const getSelectionCoordinates = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return rect;
  };

   // selectedTextSpan.textContent = selectedText;

  const hideContextMenu = () => {
    contextMenu.style.display = 'none';
  };

  // Desktop: Right-click
  document.addEventListener('contextmenu', (event) => {
    showContextMenu(event);
    event.preventDefault();
  });
document.addEventListener('dblclick', (event) => {
    showContextMenu(event);
    event.preventDefault();
  });

  // Mobile: Long-press
  document.addEventListener('touchstart', (event) => {
    touchTimer = setTimeout(() => {
      showContextMenu(event);
    }, 500); // 500ms for long-press
  });

  document.addEventListener('touchend', () => {
    clearTimeout(touchTimer);
  });

  // Hide context menu on click elsewhere
  document.addEventListener('click', () => {
    hideContextMenu();
  });

  // Handle menu item clicks
  contextMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
   
    const action = event.target.dataset.action;
    console.log(action)
    const selectedText = getSelectedText();

    if (action == 'copy') {
      navigator.clipboard.writeText(selectedText)
    }  else if (action == "define") {
      lookupWord(selectedText).then((rees)=>{
        console.log(rees)
      })
    }else if (action == 'read') {
      readWord(selectedText === null ? "Nothing selected! Please select to listen" : selectedText)
    }  else if (action == 'search') {
      console.log(123)
    }else{
      console.log(11111)
    }

    hideContextMenu();
  });
};

async function lookupWord(word) {
  // Fetch word data from the Dictionary API
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (!response.ok) {
    throw new Error('Word not found.');
  }
  const data = await response.json();
  const entry = data[0];

  // Extract phonetics (pronunciation text and audio)
  const phonetics = entry.phonetics?.map(p => ({
    text: p.text || '',
    audio: p.audio || ''
  })) || [];

  // Extract meanings, definitions, examples, and synonyms
  const meanings = entry.meanings?.map(m => ({
    partOfSpeech: m.partOfSpeech,
    definitions: m.definitions.map(d => ({
      definition: d.definition,
      example: d.example || '',
      synonyms: d.synonyms || []
    }))
  })) || [];

  return {
    word: entry.word,
    phonetics,
    meanings
  };
}
function readWord(message) {
  try {
    // Use SpeechSynthesis API to read the word aloud.
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis is not supported in your browser.");
    }
  } catch (error) {
    console.error("Error reading word:", error);
  }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}