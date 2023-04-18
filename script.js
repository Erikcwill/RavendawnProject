// script.js
import { tradepacksList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const tradePacksContainer = document.getElementById("tradePacksContainer");

for (const tradepack of tradepacksList) {
  const card = document.createElement("div");
  card.className = "card_packs";
  
  const containerTitleCard = document.createElement("div");
  containerTitleCard.className = "container_title_card";
  
  const titleCard = document.createElement("h3");
  titleCard.className = "title_card";
  titleCard.textContent = tradepack.name;
  
  containerTitleCard.appendChild(titleCard);
  card.appendChild(containerTitleCard);
  
  const ingredients = document.createElement("div");
  ingredients.className = "card_ingredients";
  
  const secondaryNamesDiv = document.createElement("div");
  secondaryNamesDiv.className = "secondary_names_div hidden";
  
  card.appendChild(secondaryNamesDiv);
  
  card.addEventListener("click", () => {
    secondaryNamesDiv.classList.toggle("hidden");
  });
  
  for (const ingredient of tradepack.ingredients) {
    const ingredientItem = document.createElement("p");
    ingredientItem.className = "ingredient_item";
    const ingredientInfo = ingredientList.find(
      (info) => info.name === ingredient.name
    );
    ingredientItem.textContent = `${ingredient.name} - ${ingredient.quantity}`;
    if (ingredientInfo) {
      const price = Array.isArray(ingredientInfo.price) ?
        ingredientInfo.price[0] :
        ingredientInfo.price;
      const minQuantity = Array.isArray(ingredientInfo.minQuantity) ?
        ingredientInfo.minQuantity[0] :
        ingredientInfo.minQuantity;
      const maxQuantity = Array.isArray(ingredientInfo.maxQuantity) ?
        ingredientInfo.maxQuantity[0] :
        ingredientInfo.maxQuantity;
      const unitsPerPack = ingredient.quantity;
      const averageQuantity = (minQuantity + maxQuantity) / 2;
      const costPerPack = Math.round((price / averageQuantity) * unitsPerPack);
      const cost = costPerPack;
      
      const necessaryLevel =
        ingredientInfo.necessaryLevel.length > 1 ?
        ingredientInfo.necessaryLevel[0] :
        ingredientInfo.necessaryLevel;
      ingredientItem.innerHTML += ` Cost: ${cost} - ${ingredientInfo.category}: ${necessaryLevel}`;
  
      if (ingredientInfo.necessaryLevel.length > 1) {
        const additionalLevels = ingredientInfo.necessaryLevel.slice(1);
        if (additionalLevels.length > 0) {
          const additionalInfo = document.createElement("p");
          additionalInfo.className = "additional_info";
          additionalInfo.textContent = `Os itens adicionais para ${ingredient.name} são:`;
  
          if (card.querySelector(".secondary_names_div").childElementCount === 0) {
            card.querySelector(".secondary_names_div").appendChild(additionalInfo);
          } else {
            card.querySelector(".secondary_names_div").firstChild.textContent = additionalInfo.textContent;
          }
          for (const level of additionalLevels) {
            const newPrice = (ingredientInfo.price[1])
            const newMinQuantity = (ingredientInfo.minQuantity[1])
            const newMaxQuantity = (ingredientInfo.maxQuantity[1])
            const newAverageQuantity = (newMinQuantity + newMaxQuantity) / 2;
            const newCostPerPack = Math.round((newPrice / newAverageQuantity) * unitsPerPack);
            const newCost = newCostPerPack;
            const levelInfo1 = document.createElement("span");
            levelInfo1.textContent = ` ${ingredient.name} - ${ingredient.quantity} ${ingredientInfo.category}: ${level} ${newCost}`;
            additionalInfo.appendChild(levelInfo1);
          }
        }
      } else {
        const noAdditionalInfo = document.createElement("p");
        noAdditionalInfo.className = "no_additional_info";
        noAdditionalInfo.textContent = "Esse item não possui níveis adicionais";
  
        if (card.querySelector(".secondary_names_div").childElementCount === 0) {
          card.querySelector(".secondary_names_div").appendChild(noAdditionalInfo);
        } else {
          card.querySelector(".secondary_names_div").firstChild.textContent = noAdditionalInfo.textContent;
        }
      }
    } else {
      ingredientItem.innerHTML += ` Cost: N/A - N/A`;
    }
    ingredients.appendChild(ingredientItem);
  }
  card.appendChild(ingredients);
  tradePacksContainer.appendChild(card);
}

  
