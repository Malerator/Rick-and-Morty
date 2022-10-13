"use strict"

let arr =[];
for (let i = 1; i <= 826; i++) {
  arr.push(i);
}

const url = "https://rickandmortyapi.com/api/character/";
const data = await fetch(url + arr).then(res => res.json()).then(data => data) ;

const $grid = document.querySelector(".wrapper_cards")
const $input = document.querySelector("input")
const $select = document.querySelector(".select")
const $form = document.forms[0]

function createCard(data) {
  const $card = document.createElement("div")
  $card.className = "card"

  const $imgBox = document.createElement("div")
  $imgBox.className = "card_image"

  const $text = document.createElement("div")
  $text.className = "card_items"

  const $image = document.createElement("img")
  $image.setAttribute("src", data.image)
  $image.setAttribute("width", 334)
  $image.setAttribute("height", 192)

  const $name = document.createElement("h3")
  $name.textContent = data.name
  $name.className = "card_items--h3"

  const $gender = document.createElement("p")
  $gender.textContent = `Gender: ${data.gender}`
  $gender.className = "card_items--p"

  const $location = document.createElement("p")
  $location.textContent = `Location: ${data.name}`
  $location.className = "card_items--p"

  const $alive = document.createElement("p")
  $alive.textContent = `Alive: ${data.status}`
  $alive.className = "card_items--p"

  $card.append($imgBox)
  $card.append($text)
  $imgBox.append($image)
  $text.append($name, $gender, $location, $alive)

  return $card;
}
data.forEach(elem => $grid.append(createCard(elem)));

$form.addEventListener("submit", (event) => event.preventDefault())
$input.addEventListener("input", inputName)
$select.addEventListener("change", inputName)

function inputName () {
  let $name = $input.value.toLowerCase().trim()
  let $species = $select.value.toLowerCase()
  let searchSpecies = data.filter((elem) => elem.name.toLowerCase().includes($name)).filter((elem) => elem.species.toLowerCase() === $species || $species === "all")
  $grid.innerHTML = "";
  searchSpecies.forEach((elem) => $grid.append(createCard(elem)))
}

const $arrSp = data.map(elem => elem.species)
const $allSp = [...new Set($arrSp)]
const $index = $allSp.findIndex((elem) => elem === "")
const $unknown = $allSp.splice($index, "Unknown")

function createOptions(species) {
const $option = document.createElement("option")
  $option.textContent = species
  $option.setAttribute("value", species === "Unknown" ? $unknown : species)
  $select.append($option)
}
$allSp.forEach((elem) => $select.append(createOptions(elem)))