let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});
const newToyForm = document.getElementsByClassName('add-toy-form')[0];
newToyForm.addEventListener('submit', handleSubmit);

function addToysToTheDOM(toy){
  for (toyObj of toy) {
    const div = document.createElement('div');
    div.classList.add("card");
    const h2 = document.createElement('h2');
    h2.innerText = toyObj.name;
    const img = document.createElement('img');
    img.src = toyObj.image;
    img.classList.add('toy-avatar');
    const p = document.createElement('p');
    p.innerText = `${toyObj.likes} Likes`;
    p.classList.add('likes');
    const button = document.createElement('button');
    button.classList.add('like-btn');
    button.id = toyObj.id;
    button.innerText = "Like ❤️";

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    document.getElementById('toy-collection').appendChild(div);

    button.addEventListener('click', (e) => {
      let element = e.target.previousSibling.innerHTML;
      let splitElement = element.split(' ');
      let integer = parseInt(splitElement[0]);
      console.log(e.target.id);
      integer+=1
      p.textContent = `${integer} Likes`
      updateLikes(e, integer);
    });
  }
}

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toy => {
    addToysToTheDOM(toy);
  })
}

function handleSubmit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  makeNewToy(toyObj);
  e.target.name.value = '';
  e.target.image.value = '';
}

function makeNewToy(toyObj) {
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => {
    addToysToTheDOM(toy);
  })
}

function updateLikes(e, integer) {
  console.log(integer);
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type':'application/json',
      Accept: "application/json"
    },
    body:JSON.stringify({id:e.target.id, likes:integer})
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

