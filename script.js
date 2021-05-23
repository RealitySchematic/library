let myLibrary = [];

let libraryContainer = document.getElementById('libraryContainer');
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
    for(let i=0;i<myLibrary.length;i++){

        // create a new div within library container for the book
        let book = document.createElement('div');
        book.classList.add('books');
        book.setAttribute('id','number'+i);
        libraryContainer.appendChild(book);

        // add the title and author
        let titleAndAuthor = document.createElement('h3');
        titleAndAuthor.textContent = myLibrary[i].title+' by '+myLibrary[i].author;
        book.appendChild(titleAndAuthor);

        // add page info and if the book has been read
        let pagesAndHasRead = document.createElement('h3');
        if(myLibrary[i].hasRead==true || myLibrary[i].hasRead=='true'){
            pagesAndHasRead.textContent = myLibrary[i].pages+' pages. Have read.';
        } else {
            pagesAndHasRead.textContent = myLibrary[i].pages+' pages. Have not read.';
        }
        book.appendChild(pagesAndHasRead);

        // add remove book button for user
        let removeBookButton = document.createElement('button');
        removeBookButton.classList.add('removeButtons');
        removeBookButton.textContent='REMOVE'
        book.appendChild(removeBookButton);

        // add change read status for user
        let changeReadStatus = document.createElement('button');
        changeReadStatus.classList.add('changeReadStatusButtons');
        changeReadStatus.textContent='Change Read Status';
        book.appendChild(changeReadStatus);
    }
}

// sample library below
addBookToLibrary('The Hatchet','Gary Paulsen','195',true);
addBookToLibrary('The Alchemist','Paulo Coehlo','197',true);
addBookToLibrary('A History of Central Banking and The Enslavement of Mankind','Stephen Goodson','202',false);
addBookToLibrary('How to Win Friends and Influence People','Dale Carnegie','291',true);

reconfigureLibrary();
// sample library above

// create array removeBookButtons to attach event listeners for removing book instances
function addRemoveButtonEventListeners(){
    let removeBookButtons = [...document.getElementsByClassName('removeButtons')];

    // remove book instance, redisplay library and add new event listeners to remove buttons with new positions
    for(let i=0;i<removeBookButtons.length;i++){
        removeBookButtons[i].addEventListener('click', function(){
            myLibrary.splice(i,1);
            reconfigureLibrary();
        });
    }
}

// add change read status event listeners to each book in the library container
function addChangeReadStatusEventListeners(){
    let changeReadStatusButtons=[...document.getElementsByClassName('changeReadStatusButtons')];

    // change hasRead status to the opposite case
    for(let i=0;i<changeReadStatusButtons.length;i++){
        changeReadStatusButtons[i].addEventListener('click', function(){
            if(myLibrary[i].hasRead==true){
                myLibrary[i].hasRead=false;
                reconfigureLibrary();
            } else {
                myLibrary[i].hasRead=true;
                reconfigureLibrary();
            }
        });
    }
}

// reset libraryContainer div, reconfigure with new books and add button event listeners for functionality
function reconfigureLibrary(){
    displayLibrary();
    addRemoveButtonEventListeners();
    addChangeReadStatusEventListeners();
}

function hideLibraryShowForm(){
    libraryContainer.style.display='none';
    newBookButton.style.display='none';
    formContainer.style.display='block';
}

function hideFormShowLibrary(){
    libraryContainer.style.display='';
    newBookButton.style.display='';
    formContainer.style.display='none';
}

// display form for a new book and hide current library
newBookButton.addEventListener('click', function(){
    hideLibraryShowForm();
});

// display current library and hide form
closeFormButton.addEventListener('click', function(){
    hideFormShowLibrary();
});


// grab form data and insert into a new book object, display library and hide form
submitFormButton.addEventListener('click', function(){

    let titleInput = document.getElementById('titleInput');
    let authorInput = document.getElementById('authorInput');
    let pagesInput = document.getElementById('pagesInput');
    let hasReadInput = document.getElementById('hasReadInput');

    if(titleInput.value!='' && authorInput.value!='' && pagesInput.value!='' && hasReadInput.value!=''){

    console.log(hasReadInput.value);
    
    hasReadInput.value == 'on' ? hasReadInput.value=true : hasReadInput.value=false;

    addBookToLibrary(titleInput.value,authorInput.value,pagesInput.value,hasReadInput.value);
    reconfigureLibrary();

    hideFormShowLibrary();

    // reset form input values after submission
    document.getElementById('titleInput').value='';
    document.getElementById('authorInput').value='';
    document.getElementById('pagesInput').value='';
    document.getElementById('hasReadInput').checked=false;
    }

});
