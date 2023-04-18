import { tradepackList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const name = "chicken";

for (let i = 0; i < ingredientList.length; i++) {
  const index = ingredientList[i].anotherSource.indexOf(name);
  if (index !== -1) {
    console.log(`O valor ${name} está presente no índice ${index} de anotherSource.`);
    break;
  }
  if (i === ingredientList.length - 1) {
    console.log(`Não existe ${name} em anotherSource.`);
  }
}
