let myLibrary = [];

let libraryContainer = document.getElementById('container');
let formContainer = document.getElementById('formContainer');

let newBookButton=document.getElementById('newBookButton');
let submitFormButton=document.getElementById('submitForm')
let closeFormButton=document.getElementById('closeForm');

// book object for each book instance
function Book(title,author,pages,hasRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
}

// put user's input in an object and into the myLibrary array
function addBookToLibrary(title,author,pages,hasRead){
    let newBook = new Book(title,author,pages,hasRead)
    myLibrary.push(newBook)
}

// loop through each object in the array, creating elements to display each book's info
function displayLibrary(){

    //empty library container
    while(libraryContainer.firstChild){
        libraryContainer.removeChild(libraryContainer.firstChild);
    }

    // reconfigure library container with new input
    for(i=0;i<myLibrary.length;i++){

        // create a new div within library container for the book
        let book = document.createElement('div');
        book.classList.add('books');
        libraryContainer.appendChild(book);

        // add the title and author
        let titleAndAuthor = document.createElement('h3');
        titleAndAuthor.textContent = myLibrary[i].title+' by '+myLibrary[i].author;
        book.appendChild(titleAndAuthor);

        // add page info and if the book has been read
        let pagesAndHasRead = document.createElement('h3');
        if(myLibrary[i].hasRead){
            pagesAndHasRead.textContent = myLibrary[i].pages+' pages. Have read.';
        } else {
            pagesAndHasRead.textContent = myLibrary[i].pages+' pages. Have not read.';
        }
        book.appendChild(pagesAndHasRead);

        // add remove book button for user
        let removeBookButton = document.createElement('button');
        removeBookButton.classList.add('button');
        removeBookButton.textContent='REMOVE'
        book.appendChild(removeBookButton);
    }
}

newBookButton.addEventListener('click', function(){
    libraryContainer.style.display='none';
    newBookButton.style.display='none';
    formContainer.style.display='block';
});

closeFormButton.addEventListener('click', function(){
    libraryContainer.style.display='';
    newBookButton.style.display='';
    formContainer.style.display='none';
});

submitFormButton.addEventListener('click', function(){


    let titleInput = document.getElementById('titleInput');
    let authorInput = document.getElementById('authorInput');
    let pagesInput = document.getElementById('pagesInput');
    let hasReadInput = document.getElementById('hasReadInput');

    hasReadInput.value == 'on' ? hasReadInput.value=true : hasReadInput.value=false;

    addBookToLibrary(titleInput.value,authorInput.value,pagesInput.value,hasReadInput.value);
    displayLibrary();

    libraryContainer.style.display='';
    newBookButton.style.display='';
    formContainer.style.display='none';

});



addBookToLibrary('title1','author1','1',true);
addBookToLibrary('title2','author2','2',true);
addBookToLibrary('title3','author3','3',false);
addBookToLibrary('title4','author4','4',true);

displayLibrary();