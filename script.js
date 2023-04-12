import { handleSelect } from "./handleSelect.js";
import { tradepacksList } from "./tradepacksList.js";


const select = document.getElementById("selecao");
select.addEventListener("change", handleSelect);

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
