import { tradepackList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const tradepackCardsContainer = document.getElementById(
  "tradepack-cards-container"
);

// Função para criar uma cópia do card clicado
const createCardCopy = (tradepack) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = tradepack.name;
  card.appendChild(title);

  const ingredientsList = document.createElement("ul");

  for (const ingredient of tradepack.ingredients) {
    const listItem = document.createElement("li");
    const ingredientData = ingredientList.find(
      (data) => data.name === ingredient.name
    );
    if (ingredientData) {
      const sourceSize = ingredientData.anotherSource.length;
      const ingredientCategory = ingredientData.category;
      const ingredientName = ingredientData.name;
      const ingredientQuantity = ingredient.quantity;
      const ingredientLevel = ingredientData.necessaryLevel[0];
      let ingredientPrice = ingredientData.price[0];

      const ingredientInfo = `${ingredientName} (${ingredientQuantity}), ${ingredientCategory}: ${ingredientLevel}, Preço: ${ingredientPrice} ${sourceSize} `;
      listItem.textContent = `${ingredientInfo}`;
    } else {
      listItem.textContent = "N/A";
    }

    ingredientsList.appendChild(listItem);
  }
  card.appendChild(ingredientsList);

  return card;
};

// Função para mostrar o popup com as cópias dos cards
const showPopup = (tradepack) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const closeButton = document.createElement("span");
  closeButton.textContent = "Fechar";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    popup.remove();
  });
  popup.appendChild(closeButton);

  // Adicionar cópias dos cards no popup
  const sourceSize = tradepack.ingredients.reduce((acc, ingredient) => {
    const ingredientData = ingredientList.find(
      (data) => data.name === ingredient.name
    );
    if (ingredientData) {
      acc += ingredientData.anotherSource.length;
    }
    return acc;
  }, 0);

  for (let i = 0; i < sourceSize; i++) {
    const cardCopy = createCardCopy(tradepack);
    popup.appendChild(cardCopy);
  }

  document.body.appendChild(popup);
};

// Adicionar evento de clique nos cards
for (const tradepack of tradepackList) {
  const card = createCardCopy(tradepack);
  card.addEventListener("click", () => {
    showPopup(tradepack);
  });
  tradepackCardsContainer.appendChild(card);
}
