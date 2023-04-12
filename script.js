import { tradepacksList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const tradePacksContainer = document.getElementById("tradePacksContainer");

for (const tradepack of tradepacksList) {
  const card = document.createElement("div");
  card.className = "card_packs";

  const containerTitleCard = document.createElement("div");
  containerTitleCard.className = "container_title_card";
  card.appendChild(containerTitleCard);

  const titleCard = document.createElement("h3");
  titleCard.className = "title_card";
  titleCard.textContent = `${tradepack.name}`;
  containerTitleCard.appendChild(titleCard);

  const ingredients = document.createElement("div");
  ingredients.className = "card_ingredients";

  for (const ingredient of tradepack.ingredients) {
    const ingredientItem = document.createElement("p");
    ingredientItem.className = "ingredient_item";
    const ingredientInfo = ingredientList.find(
      (info) => info.name === ingredient.name
    );

    ingredientItem.textContent = `${ingredient.name} - ${ingredient.quantity}`;
    if (ingredientInfo) {
      const price = parseInt(ingredientInfo.price);
      const quantityRange = ingredientInfo.quantity.split("-");
      const minQuantity = parseInt(quantityRange[0]);
      const maxQuantity = parseInt(quantityRange[1]);
      const unitsPerPack = ingredient.quantity;

      const averageQuantity = (minQuantity + maxQuantity) / 2;
      const costPerPack = Math.round((price / averageQuantity) * unitsPerPack);

      const cost = costPerPack;

      ingredientItem.innerHTML += ` Cost: ${cost} - ${ingredientInfo.category}: ${ingredientInfo.necessaryLevel}`;
    } else {
      ingredientItem.innerHTML += ` Cost: N/A - N/A`;
    }
    ingredients.appendChild(ingredientItem);
  }
  card.appendChild(ingredients);

  tradePacksContainer.appendChild(card);
}
