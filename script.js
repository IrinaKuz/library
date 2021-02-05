let library = [];
class Book {
    constructor(name, author, genre, pages, status) {
        this.name = name;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        if(status == 'yes') {
            this.status = true;
        } else {
            this.status = false;
        }
    }
}
function addBookToLibrary(book) {
    library.push(book);
}

function displayBooks() {
    const libraryDiv = document.querySelector('.library');
    libraryDiv.innerHTML = '';
    for(let i =  0; i < library.length; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class', 'card');
        bookDiv.setAttribute('data-id', i);
        libraryDiv.appendChild(bookDiv);
        const title = document.createElement('h3');
        title.innerText = library[i].name;
        bookDiv.appendChild(title);
        const author = document.createElement('p');
        author.innerText = library[i].author;
        bookDiv.appendChild(author);
        const genre = document.createElement('p');
        genre.innerText = library[i].genre;
        bookDiv.appendChild(genre);
        const pages = document.createElement('p');
        pages.innerText = library[i].pages;
        bookDiv.appendChild(pages);
        
        // div for changing status spans
        const divStatus = document.createElement('div');
        divStatus.setAttribute('class', 'changeStatus');
        bookDiv.appendChild(divStatus);

        const statusRead = document.createElement('span');
        statusRead.innerText = 'Read';
        divStatus.appendChild(statusRead);
        const statusNotRead = document.createElement('span');
        statusNotRead.innerText = 'Not Read';
        divStatus.appendChild(statusNotRead);
        console.log(library[i].status);
        if(library[i].status) {
            statusRead.setAttribute('class', 'activeRead');
        } else {
            statusNotRead.setAttribute('class', 'activeRead');
        }

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML= '&times;';
        closeBtn.setAttribute('class', 'closeBtn');
        closeBtn.setAttribute('title', 'delete book');
        bookDiv.appendChild(closeBtn);
    }
        closeBtnsAddListeners();
        changeStatusAddListeners();
}
        if(localStorage.getItem('library')) {
            const localStorageLibrary = localStorage.getItem('library');
            library = JSON.parse(localStorageLibrary);
            console.log(library);
            displayBooks();
        } else {
            library.push(
                new Book('War and Peace', 'Leo Tolstoy', 'drama', 1000, false), 
                new Book("Harry Potter and the Sorcerer's Stone", 'J. K. Rowling', "children's literature", '', false)
                );
            displayBooks();
        }

    function closeBtnsAddListeners() {
        const closeBtns = document.querySelectorAll('.closeBtn');
        for (let i = 0; i < closeBtns.length; i++) {
            closeBtns[i].addEventListener('click', function() {
                const parentDivId = this.parentElement.getAttribute('data-id');
                console.log('data-id: ' + parentDivId);
                library.splice(parentDivId, 1);
                // update localStorage
                localStorage.setItem('library', JSON.stringify(library));
                displayBooks();
            })
        }
    }
    function changeStatusAddListeners() {
        const changeStatus = document.querySelectorAll('.changeStatus span');
        for(let i = 0; i < changeStatus.length; i++) {
            changeStatus[i].addEventListener('click', function() {
                const parentDiv = this.parentElement;
                const parentDivId = parentDiv.parentElement.getAttribute('data-id');
                console.log(library[parentDivId].status);
                if (library[parentDivId].status == true) {
                    library[parentDivId].status = false;
                }  else {
                    library[parentDivId].status = true;
                } 
                console.log('after:');
                console.log(library[parentDivId].status);
                console.log(library);
                // update localStorage
                localStorage.setItem('library', JSON.stringify(library));
                displayBooks();
            });
        }
    }
  
document.querySelector('form').addEventListener('submit', function(e) {
    const name = document.querySelector('#name').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;
    const pages = document.querySelector('#pages').value;
    let statusVal = '';
    const status = document.querySelectorAll('input[name="status"]');
    for (const s of status) {
        if (s.checked) {
            statusVal = s.value;
            break;
        }
    }
    const book = new Book(name, author, genre, pages, statusVal);
    console.log(book);
    addBookToLibrary(book);
    console.log(library);
    displayBooks();
    localStorage.setItem('library', JSON.stringify(library));
})

// Expanded menu
const menu = document.querySelector('.expanded-menu');
console.log(menu);
const toggleBtn = document.querySelector('#toggle-nav');
console.log(toggleBtn);
toggleBtn.addEventListener('click', function() {
    console.log('toggle menu');
    menu.classList.toggle('open');
    if(menu.classList.contains('open')) {
        this.innerHTML = '&times';
    } else {
        this.innerHTML = '&#9776';
    }
});

// close nav after click on a link
document.querySelector('nav a').addEventListener('click', function() {
    menu.classList.remove('open');
    toggleBtn.innerHTML = '&#9776';
})
