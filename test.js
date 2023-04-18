const array = [
  {
    name: "Pea",
    origin: "Pea Plant",
  },
  {
    name: "Egg",
    origin: ["Chicken", "Medium Chicken", "Big Chicken"],
  },
  {
    name: "Shank",
    origin: ["Pig", "Small Goat", "Small Pen", "Medium Pig","Medium Goat", "Medium Sheep"],
  },
];

// percorre o array
array.forEach(item => {
  // cria um elemento HTML para cada item
  const card = document.createElement("div");

  // verifica se origin é um array
  if (Array.isArray(item.origin)) {
    // acessa o valor desejado do array
    card.innerHTML = item.origin[1];
  } else {
    // imprime o valor normalmente
    card.innerHTML = item.origin;
  }

  // adiciona o card ao HTML
  document.body.appendChild(card);
});