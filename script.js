import { PETS } from "./pets.js";

const petsArr = [];
for (const key in PETS) {
  petsArr.push(PETS[key]);
}

let sliderCounter = 1;
const STEPS = 3;
const sliderCounterElement = document.querySelector(".slider-counter");

if(sliderCounterElement) {
  sliderCounterElement.textContent = sliderCounter;
}

function generatePetCards(pets) {
  const petsList = document.querySelector(".pets-list");
  petsList.innerHTML = "";

  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.classList.add("pet-card-main");
    petCard.id = pet.name;

    petCard.innerHTML = `
                <img src="${pet.img}" alt="${pet.name}">
                <h4 class="pet-name">${pet.name}</h4>
                <button class="learn-more-btn">Learn more</button>
            `;

    petsList.appendChild(petCard);
  });

  registerListeners();
}

generatePetCards(
  petsArr.slice((sliderCounter - 1) * STEPS, sliderCounter * STEPS)
);

const sliderBackButton = document.querySelector(".btn-back");

function handleSlideBack() {
  if (sliderCounter === 1) {
    return;
  }

  sliderCounter -= 1;

  sliderCounterElement.textContent = sliderCounter;

  generatePetCards(
    petsArr.slice((sliderCounter - 1) * STEPS, sliderCounter * STEPS)
  );

  sliderCounter === 1
    ? sliderBackButton.classList.add("inactive-btn")
    : sliderBackButton.classList.remove("inactive-btn");

  sliderNextButton.classList.remove("inactive-btn");
}

sliderBackButton.addEventListener("click", handleSlideBack);

const sliderNextButton = document.querySelector(".btn-next");

function handleSlideNext() {
  if (sliderCounter * STEPS > petsArr.length) {
    return;
  }

  sliderCounter += 1;

  sliderCounterElement.textContent = sliderCounter;

  generatePetCards(
    petsArr.slice((sliderCounter - 1) * STEPS, sliderCounter * STEPS)
  );

  sliderCounter * STEPS > petsArr.length
    ? sliderNextButton.classList.add("inactive-btn")
    : sliderNextButton.classList.remove("inactive-btn");

  sliderBackButton.classList.remove("inactive-btn");
}

sliderNextButton.addEventListener("click", handleSlideNext);

let burger = document.querySelector(".burger");
let menu = document.querySelector(".burger-menu");
let overlay = document.querySelector(".overlay");

let links = menu.querySelectorAll("a");

burger.addEventListener("click", function () {
  burger.classList.toggle("rotate");
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
});

overlay.addEventListener("click", function () {
  burger.classList.remove("rotate");
  menu.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
});

links.forEach(function (link) {
  link.addEventListener("click", function () {
    burger.classList.remove("rotate");
    menu.classList.remove("show");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  });
});

let popup = document.querySelector("#popup");
popup.addEventListener("click", function () {
  popup.classList.remove("open");
  const popupBody = document.querySelector(".popup_body");
  popupBody.remove();
  document.body.style.overflow = "visible";
});

function registerListeners() {
  let cardsMain = document.querySelectorAll(".pet-card-main");
  let cardsPets = document.querySelectorAll(".pet-card-pets");

  console.log(cardsMain);
  console.log(cardsPets);

  const cards = [...cardsMain, ...cardsPets];
  console.log("cardsL ", cards);

  cards.forEach(function (card) {
    console.log("card", card);
    card.addEventListener("click", function () {
      console.log(PETS[card.id]);

      document.body.style.overflow = "hidden";
      let popupBody = document.createElement("div");
      popup.appendChild(popupBody);

      popup.classList.add("open");
      popupBody.classList.add("popup_body");
      let popupContent = document.createElement("div");
      let crossButton = document.createElement("button");
      let crossImg = document.createElement("img");
      let petImg = document.createElement("img");
      let petInfo = document.createElement("div");
      let petMainInfo = document.createElement("div");
      let petName = document.createElement("h3");
      let petBreed = document.createElement("h4");
      let petDescription = document.createElement("p");
      let petHealthList = document.createElement("ul");
      let petHealthEl1 = document.createElement("li");
      let petHealthEl2 = document.createElement("li");
      let petHealthEl3 = document.createElement("li");
      let petHealthEl4 = document.createElement("li");

      popupContent.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      popupContent.appendChild(petImg);
      popupContent.appendChild(petInfo);
      petInfo.appendChild(petMainInfo);
      petMainInfo.appendChild(petName);
      petMainInfo.appendChild(petBreed);
      petInfo.appendChild(petDescription);
      petInfo.appendChild(petHealthList);
      popupBody.appendChild(crossButton);
      popupBody.appendChild(popupContent);
      crossButton.appendChild(crossImg);
      petHealthList.appendChild(petHealthEl1);
      petHealthList.appendChild(petHealthEl2);
      petHealthList.appendChild(petHealthEl3);
      petHealthList.appendChild(petHealthEl4);

      petMainInfo.classList.add("name-breed");
      popupContent.classList.add("popup_content");
      petInfo.classList.add("popup-info");
      crossButton.classList.add("popup_close");
      crossImg.classList.add("cross-btn-img");
      crossImg.setAttribute("src", "assets/Vector.png");
      petImg.classList.add("pet-popup-img");
      petName.classList.add("popup-heading");
      petHealthList.classList.add("health");
      petBreed.classList.add("breed");
      petDescription.classList.add("pet-description");
      petHealthEl1.classList.add("health-info");
      petHealthEl2.classList.add("health-info");
      petHealthEl3.classList.add("health-info");
      petHealthEl4.classList.add("health-info");

      petImg.setAttribute("src", PETS[card.id].img);
      petName.textContent = PETS[card.id].name;
      petBreed.textContent = PETS[card.id].type + "-" + PETS[card.id].breed;
      petDescription.textContent = PETS[card.id].description;
      petHealthEl1.textContent = "Age: " + PETS[card.id].age;
      petHealthEl2.textContent = "Inoculations: " + PETS[card.id].inoculations;
      petHealthEl3.textContent = "Diseases: " + PETS[card.id].diseases;
      petHealthEl4.textContent = "Parasites:" + PETS[card.id].parasites;
    });
  });
}

registerListeners();