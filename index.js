let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {

    // Write your code to manipulate the DOM here
    document.body.classList.toggle("dark-mode");

}

themeButton.addEventListener("click", toggleDarkMode);

// Query for the sign now button
const signNowButton = document.querySelector('#sign-now-button');

function addSignature(person) {
  // Get the properties from the person object
  const name = person.name;
  const hometown = person.hometown;

  // Create a new paragraph element for the signature
  const signature = document.createElement('p');
  
  // Format the new signature with the name and hometown
  signature.textContent = `🖊${name} from ${hometown} supports this`;
  
  // Find the signatures section on the page and add the new signature
  const signatures = document.querySelector('.signatures');
  signatures.appendChild(signature);
  
  // Reset the form inputs
  const nameInput = document.querySelector('#name');
  const hometownInput = document.querySelector('#hometown');
  nameInput.value = '';
  hometownInput.value = '';
  
  // Update the signature count
  const counter = document.querySelector('#counter');
  counter.remove();
  count = count + 1;
  const newCounter = document.createElement('p');
  newCounter.textContent = `🖊 ${count} people have signed this petition and support this cause.`;
  newCounter.id = 'counter';
  signatures.appendChild(newCounter);
};

let count = 3;


function validateForm() {
  let containsErrors = false;
  const petitionInputs = document.getElementById('sign-petition').elements;

  const person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  };

  // Loop through all inputs
  for (let input in person) {
    if (person.hometown.length < 2) {
      containsErrors = true;
      document.querySelector(`#${input}`).classList.add('error');
    } else {
      document.querySelector(`#${input}`).classList.remove('error');
    }
  }

  // Validate the value of email input
  
  if (!person.email.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }

  // If no errors, add signature and clear fields
  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = '';
    }
    containsErrors = false;
  }
}
// TODO: Call addSignature() and clear fields if no errors
signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

// function reveal() {
//   let windowHeight = window.innerHeight;
//   for (let i = 0; i < revealableContainers.length; i++) {
//     let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
//     if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
//       revealableContainers[i].classList.add('active');
//     } else {
//       revealableContainers[i].classList.remove('active');
//     }
//   }
// }

const reveal = (event) => {
  event.preventDefault();
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight; //save window height
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
      /* remove the active class to the revealableContainer's classlist */
    }
  }
}

window.addEventListener('scroll', reveal);


// Step 4: Animate the image within the modal

const toggleModal = (person) => {
  let intervalId = setInterval(() => scaleImage(), 500);
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");

  modal.style.display = "flex";
  modalContent.textContent = "Thank you so much " + person.name + "! " + person.hometown + " represent!";


  //setTimeout(() => { modal.style.display = "none" }, 4000);
  setTimeout( () => { modal.style.display = "none"; 
                      clearInterval(intervalId);
                    }, 4000);
}


let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
  //is sf 1? then set 0.8 else 1 
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}