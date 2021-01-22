let library = [];

function Book(name, author, genre, pages, status) {
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

function addBookToLibrary(book) {
    library.push(book);
}

function displayBooks() {
    const libraryDiv = document.querySelector('.library');
    libraryDiv.innerHTML = '';
    console.log('displayBooks function');
    for(let i =  0; i < library.length; i++) {
        console.log(library[i]);
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
        const status = document.createElement('p');
        status.innerText = library[i].status == true ? 'Read' : 'Not Read';
        bookDiv.appendChild(status);
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML= '&times;';
        closeBtn.setAttribute('class', 'closeBtn');
        closeBtn.setAttribute('title', 'delete book');
        bookDiv.appendChild(closeBtn);
    }
    closeBtnsAddListeners();
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
            console.log('hooray!');
            const parentDivId = this.parentElement.getAttribute('data-id');
            console.log('data-id: ' + parentDivId);
            library.splice(parentDivId, 1);
            // update localStorage
            localStorage.setItem('library', JSON.stringify(library));
            displayBooks();
        })
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

