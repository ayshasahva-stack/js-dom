const addMoviemodal = document.getElementById("add-modal")


const startAddMovie = document.querySelector("header button")


const backdrop = document.getElementById("backdrop");

const cancelModal = addMoviemodal.querySelector(".btn--passive")

const addModalButton = cancelModal.nextElementSibling

const userInput = document.querySelectorAll('input')
// console.log(userInput);

const movies = []

const entyTextSection = document.getElementById("entry-text")

const deleteMovieModal = document.getElementById("delete-modal");


// ------------------------------------------------------------------------------------------




const toggleBackdrop = () => {
    backdrop.classList.toggle("visible")
}

const closeMovieModal = () => {
    addMoviemodal.classList.remove("visible")

}


const showMovieModal = () => {
    addMoviemodal.classList.toggle("visible")
    toggleBackdrop()
}

const backBackdrop = () => {
    closeMovieModal()
    closeMovieDeletionModal()
    clearMovieInputs()

}

const cancelModalButton = () => {
    closeMovieModal()
    clearMovieInputs()
    toggleBackdrop()
}


const clearMovieInputs = () => {
    for (const usrInput of userInput) {
        usrInput.value = ''
    };
}


const addMovieHandler = () => {
    const titleValue = userInput[0].value;
    const imageUrlValue = userInput[1].value;
    const ratingValue = userInput[2].value;

    if (titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5) {
        alert("please enter valid");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        imageUrl: imageUrlValue,
        rating: ratingValue
    }

    movies.push(newMovie);
    console.log(movies);
    clearMovieInputs();
    renderMovieElement(newMovie.id, newMovie.title, newMovie.imageUrl, newMovie.rating)
    uiUpdate();
    closeMovieModal();
    toggleBackdrop()

}

const uiUpdate = () => {
    if (movies.length === 0) {
        entyTextSection.style.display = "block"
    } else {
        entyTextSection.style.display = "none"
    }

}

const renderMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li")
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div  class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div  class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;

    newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById("movie-list")
    listRoot.append(newMovieElement)
}

const closeMovieDeletionModal = () => {
    toggleBackdrop()
    deleteMovieModal.classList.remove("visible")
}
const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list")
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal()
    uiUpdate()

}

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop()
    const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive")
    let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger")

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal)

    cancelDeletionButton.addEventListener("click", closeMovieDeletionModal)
    confirmDeletionButton.addEventListener("click", deleteMovieHandler.bind(null, movieId))


}




startAddMovie.addEventListener("click", showMovieModal)
backdrop.addEventListener("click", backBackdrop)
cancelModal.addEventListener("click", cancelModalButton)
addModalButton.addEventListener("click", addMovieHandler)

