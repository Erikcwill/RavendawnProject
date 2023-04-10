import { tradepacksList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const select = document.getElementById("selecao");
select.addEventListener("change", handleSelect);

function handleSelect(event) {
  const selectedValue = event.target.value;
  const selectedPack = tradepacksList.find((pack) => pack.name === selectedValue);
  if (selectedPack) {
    showIngredients(selectedPack);
  } else {
    const resultsDiv = document.querySelector(".results");
    resultsDiv.textContent = "Prato não encontrado na lista de tradepacks.";
  }
}

function showIngredients(pack) {
    const resultsDiv = document.querySelector(".results");
    let ingredientsText = `Os ingredientes presentes em ${pack.name} são: `;
    let ingredientsCost = 0;
    pack.ingredients.forEach((ingredient) => {
      const ingredientInfo = ingredientList.find((info) => info.name === ingredient.name);
      if (ingredientInfo) {
        const cost = ingredientInfo.price * parseInt(ingredient.quantity);
        ingredientsCost += cost;
        ingredientsText += `${ingredient.name} (${ingredient.quantity}) - ${cost} `;
      } else {
        ingredientsText += `${ingredient.name} (${ingredient.quantity}), `;
      }
    });
    ingredientsText = ingredientsText.slice(0, -2); // remove a vírgula extra no final
    const totalCost = ingredientsCost.toFixed(2);
    
    ingredientsText += `\n\nCusto total dos ingredientes: ${totalCost}`;
    resultsDiv.textContent = ingredientsText;
  }
  

function addOptionsToSelect() {
  const select = document.getElementById("selecao");
  tradepacksList.forEach((pack) => {
    const option = document.createElement("option");
    option.text = pack.name;
    option.value = pack.name;
    select.add(option);
  });
}

addOptionsToSelect();
