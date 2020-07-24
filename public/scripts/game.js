let pics = [
  "huevos",
  "leche",
  "mantequilla",
  "pan",
  "queso",
  "mermelada",
  "salchichas",
  "jugo",
  "banano",
  "cereal",
];
let parent = document.getElementsByClassName("lock-img-size");
let img = document.createElement("IMG");
let divParent = document.getElementsByClassName("choice");
let form = document.getElementById("formId");
let imageCounterDiv = document.querySelector(".image-counter-div");
let incorrectSpan = document.querySelector(".incorrect-span");
let numerator = 1;
let totalPics = pics.length;
let wrong = 0;
parent[0].appendChild(img);
imageCounterDiv.innerHTML = `Imágen ${numerator}/${totalPics}`;
incorrectSpan.innerHTML = wrong;

// populating text for answers as well as inserting text for the correct answer:
function populateAnswers(arr, picText) {
  let randomForOptions = Math.floor(Math.random() * 5);
  arr.splice(randomForOptions, 0, picText);
  arr = arr.flat();
  for (let h = 0; h < 5; h++) {
    divParent[h].getElementsByTagName("label")[0].innerHTML = arr[h];
    divParent[h].getElementsByTagName("label")[0].setAttribute("for", arr[h]);
    divParent[h].getElementsByTagName("input")[0].setAttribute("id", arr[h]);
    divParent[h].getElementsByTagName("input")[0].setAttribute("value", arr[h]);
  }
}

function chooseAnswers(option) {
  let answers = [
    "manzana",
    "lechuga",
    "arroz",
    "pasta",
    "cebolla",
    "lentejas",
    "sopa",
    "galleta",
    "aguacate",
    "tomate",
    "papa",
    "pescado",
  ];
  let newArr = [];
  let randomForAnswers;
  let removeFromAnswers;
  for (let i = 0; i < 4; i++) {
    randomForAnswers = Math.floor(Math.random() * answers.length);
    removeFromAnswers = answers.splice(randomForAnswers, 1);
    newArr.push(removeFromAnswers);
  }
  newArr = newArr.flat();
  // calling it here so that the answers load the first time.
  populateAnswers(newArr, option);
}

let button = document.getElementById("btn");

// choosing correct answer. (option will become passVar at the last line):
function selectAndRemove() {
  let ran = Math.floor(Math.random() * pics.length);
  let option = pics.splice(ran, 1);
  img.removeAttribute("src");
  img.setAttribute("src", `./images/${option}.jpg`);
  // passing option as an argument to chooseAnswers(), which is then just
  // going to pass that argument to populateAnswers.
  chooseAnswers(option);
  return option;
}

button.addEventListener("click", function (e) {
  e.preventDefault();
  checkCorrect();
});

function checkCorrect() {
  let chosenOption;
  for (let k = 0; k < 5; k++) {
    if (divParent[k].getElementsByTagName("input")[0].checked == true) {
      chosenOption = divParent[k].getElementsByTagName("input")[0].value;
    }
  }
  if (chosenOption != passVar) {
    wrong++;
    incorrectSpan.innerHTML = wrong;
    incorrectSpan.style.color = "red";
    img.style.display = "none";
    let message = document.createElement("h3");
    message.innerHTML = "Incorrect, keep trying...";
    parent[0].appendChild(message);
    setTimeout(function () {
      message.remove();
      img.style.display = "block";
    }, 2000);
    return;
  } else {
    numerator++;
    if (pics.length == 0) {
      numerator--;
      img.style.display = "none";
      form.style.display = "none";
      let messageTwo = document.createElement("h4");
      messageTwo.innerHTML = "Muy Bien, has terminado!";
      parent[0].appendChild(messageTwo);
    }
    imageCounterDiv.innerHTML = `Imágen ${numerator}/${totalPics}`;
  }

  // clearing radioBtns...
  for (let l = 0; l < 5; l++) {
    divParent[l].getElementsByTagName("input")[0].checked = false;
  }
  passVar = selectAndRemove();
}

let passVar = selectAndRemove();

// let answers = [
//   "plato",
//   "cuchara",
//   "tenedor",
//   "vaso",
//   "servilleta",
//   "pocillo",
//   "cuchillo",
//   "bandeja",
//   "licuadora",
//   "estufa",
//   "tostadora",
//   "olla",
//   "nevera",
//   "colador",
// ];
