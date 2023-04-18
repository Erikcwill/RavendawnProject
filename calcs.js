const ingredientList = [
  {
    name: ["Egg"],
    origin: "Chicken",
    price: [2000, 3000, 6000],
    minQuantity: [4, 10, 20],
    maxQuantity: [6, 15, 30],
    isGathering: true,
    experience: [200, 3000],
    time: [120, 150, 300],
    necessaryLevel: [5, 15, 15],
    category: "Husbandry",
  },
];

const indexArray1 = 0; 
const indexArray2 = 1;

const unitsPerPack = 20;
const price = ingredientList[0].price[indexArray1];
const minQuantity = ingredientList[0].minQuantity[indexArray1];
const maxQuantity = ingredientList[0].maxQuantity[indexArray1];
let averageQuantityPerHarvest;
if (ingredientList[0].isGathering) {
  averageQuantityPerHarvest = ((minQuantity + maxQuantity) * 3) / 2;
} else {
  averageQuantityPerHarvest = (minQuantity + maxQuantity) / 2;
}
const averagePricePerUnity = Math.round(price / averageQuantityPerHarvest);

const colheitasNecessarias = Math.ceil(
  unitsPerPack / averageQuantityPerHarvest
);
const sobras = Math.round(averageQuantityPerHarvest * colheitasNecessarias - unitsPerPack)

const estimatedPrice = averagePricePerUnity * unitsPerPack;

const realNeededPrice = colheitasNecessarias * price;

console.log(
  `Você precisa de ${colheitasNecessarias} colheitas para atingir os ${unitsPerPack} ${ingredientList[0].name}s desse pack. E te sobram ${sobras} ${ingredientList[1].name}s
  O valor que isso custa é de ${estimatedPrice} e o valor real é de ${realNeededPrice} `
);





























/*const unitsPerPack = 20;
  const newPrice = ingredientList[0].price[0];
  const newMinQuantity = ingredientList[0].minQuantity[0];
  const newMaxQuantity = ingredientList[0].maxQuantity[0];
  let newAverageQuantity;
  
  if (ingredientList[0].isGathering) {
    newAverageQuantity = (newMinQuantity + newMaxQuantity) * 3 / 2;
  } else {
    newAverageQuantity = (newMinQuantity + newMaxQuantity) / 2;
  }
  
  let newCostPerPack = Math.round(
    (newPrice / newAverageQuantity) * unitsPerPack
  );
  
  if (newCostPerPack < newPrice) {
    oldCost = newCostPerPack;
    newCostPerPack = newPrice;
    const difference = newAverageQuantity - unitsPerPack;
    console.log(`O preço para isso é de ${newPrice} e te sobram ${difference} Eggs, sendo o valor médio desse pack ${oldCost}`);
  } else if (newAverageQuantity > unitsPerPack) {
    const difference = newAverageQuantity - unitsPerPack;
    console.log(`O valor de newAverageQuantity é maior que unitsPerPack por ${difference}`);
  }
  
  const costOfPack = newCostPerPack;
  
  console.log(costOfPack);*/
