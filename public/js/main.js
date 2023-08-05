const thumbsUp = document.querySelectorAll('.ph-thumbs-up');
const deleteText = document.querySelectorAll('.ph-trash-simple');

Array.from(thumbsUp).forEach((element) => {
  element.addEventListener('click', addLike);
});

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteQuote);
});

async function addLike() {
  // this -> tell us what smurf we're clicking
  const quote = this.parentNode.childNodes[1].innerText;
  const author = this.parentNode.childNodes[3].innerText;
  // Be carefful. Remember that innerText return a string add Number()
  const tLikes = Number(this.parentNode.childNodes[5].innerText);

  try {
    // Doing a fetch to the server, expecting a response
    // fetch return a promise which is fullfiled once the response is available
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quoteS: quote,
        authorS: author,
        likesS: tLikes
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function deleteQuote() {
  const quote = this.parentNode.childNodes[1].innerText;
  const author = this.parentNode.childNodes[3].innerText;

  try {
    const response = await fetch('deleteQuote', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quoteS: quote,
        authorS: author
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
