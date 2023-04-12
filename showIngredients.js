import { ingredientList } from "./ingredientList.js";

export function showIngredients(pack) {
    const resultsDiv = document.querySelector(".results");
    resultsDiv.innerHTML = ""; // Limpa o conteúdo anterior
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.className = "ingredients";
  
    const divTitle = document.createElement("div");
    divTitle.className = "title-pack";
    ingredientsContainer.appendChild(divTitle);
  
    
    const title = document.createElement("h2");
    title.textContent = `Os ingredientes em ${pack.name} são:`;
    divTitle.appendChild(title);
    
    let ingredientsCost = 0;
    pack.ingredients.forEach((ingredient) => {
      const ingredientInfo = ingredientList.find((info) => info.name === ingredient.name);
      if (ingredientInfo) {
        const cost = ingredientInfo.price * parseInt(ingredient.quantity);
        ingredientsCost += cost;
        const ingredientElement = document.createElement("p");
        ingredientElement.textContent = `${ingredient.name} (${ingredient.quantity}) - ${cost}`;
        ingredientsContainer.appendChild(ingredientElement);
      } else {
        const ingredientElement = document.createElement("p");
        ingredientElement.textContent = `${ingredient.name} (${ingredient.quantity})`;
        ingredientsContainer.appendChild(ingredientElement);
      }
    });
    
    const totalCost = ingredientsCost.toFixed(2);
    const totalCostElement = document.createElement("p");
    totalCostElement.textContent = `Custo total dos ingredientes: ${totalCost}`;
    ingredientsContainer.appendChild(totalCostElement);
    
    resultsDiv.appendChild(ingredientsContainer);
  }
  