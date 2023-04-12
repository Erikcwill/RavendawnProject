import { tradepacksList } from "./tradepacksList.js";
import { showIngredients } from "./showIngredients.js";

export function handleSelect(event) {
    const selectedValue = event.target.value;
    const selectedPack = tradepacksList.find((pack) => pack.name === selectedValue);
    if (selectedPack) {
      showIngredients(selectedPack);
    } else {
      const resultsDiv = document.querySelector(".results");
      resultsDiv.textContent = "Prato não encontrado na lista de tradepacks.";
    }
  }
  