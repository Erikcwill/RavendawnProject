import { tradepackList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";
import { createAndConfigureElement } from "./elementCreation.js";

const tradepackCardsContainer = document.getElementById(
  "tradepack-cards-container"
);

for (const tradepack of tradepackList) {
  //Creating Card
  const card = createAndConfigureElement("div", ["card"]);
  const title = createAndConfigureElement("h2", ["pack_name"]);
  title.textContent = tradepack.name;
  card.appendChild(title);
  
  //Creating Ingredients List
  const ingredientsList = createAndConfigureElement("ul", ["ingredients_list"]);
  //Creating Info Container
  const infoContainer = createAndConfigureElement("div", ["info_container"]);
  //Creating Total Price
  const totalPrice = createAndConfigureElement("div", ["price_total"]);
  totalPrice.textContent = "Preço total: ";
  //Creating Max Level
  const max_level = createAndConfigureElement("div", ["max_level"]);
  max_level.textContent = "Nível máximo: ";

  for (const ingredient of tradepack.ingredients) {
    const listItem = document.createElement("li");
    listItem.classList.add("list_item");

    const ingredientData = ingredientList.find(
      (data) => data.name === ingredient.name
    );
    if (ingredientData) {
      const ingredientCategory = ingredientData.category;
      const ingredientName = ingredientData.name;
      //Creating Name Container
      const nameContainer = createAndConfigureElement("div", [
        "name_container",
      ]);
      const nameValue = createAndConfigureElement("span", ["name_text"]);
      //Creating Quantity Container
      const quantityContainer = createAndConfigureElement("div", [
        "quantity_container",
      ]);
      const quantityValue = createAndConfigureElement("span", [
        "quantity_text",
      ]);
      //Creating Category & Level Container
      const categoryContainer = createAndConfigureElement("div", [
        "category_container",
      ]);
      const categoryValue = createAndConfigureElement("span", [
        "category_text",
      ]);
      const levelValue = createAndConfigureElement("span", ["level_text"]);
      //Creating Price Container
      const priceContainer = createAndConfigureElement("div", [
        "price_container",
      ]);
      const priceText = createAndConfigureElement("span", ["price_text"]);
      const priceValue = createAndConfigureElement("span", ["price_value"]);
      //Creating Input
      const input = document.createElement("select");
      input.name = ingredientName;
      input.id = `${tradepack.name}-${ingredientName}`;

      for (const source of ingredientData.source) {
        const option = document.createElement("option");
        option.value = source.name;
        option.textContent = source.name;
        input.appendChild(option);
      }

      const sourceSize = ingredientData.source.length;

      if (sourceSize > 0) {
        const firstSource = ingredientData.source[0];
        const ingredientQuantity = ingredient.quantity;
        const ingredientLevel = firstSource.necessaryLevel;
        const ingredientPrice = firstSource.price;

        nameValue.textContent = `${ingredientName}`;
        quantityValue.textContent = `${ingredientQuantity}`;
        categoryValue.textContent = `${ingredientCategory}: `;
        levelValue.textContent = `${ingredientLevel}`;
        priceText.textContent = "Preço: ";
        priceValue.textContent = `${ingredientPrice}`;

        listItem.appendChild(nameContainer);
        listItem.appendChild(quantityContainer);
        listItem.appendChild(categoryContainer);
        listItem.appendChild(priceContainer);
        listItem.appendChild(input);

        nameContainer.appendChild(nameValue);
        quantityContainer.appendChild(quantityValue);
        categoryContainer.appendChild(categoryValue);
        categoryContainer.appendChild(levelValue);
        priceContainer.appendChild(priceText);
        priceContainer.appendChild(priceValue);
      } else {
        listItem.textContent = "N/A";
      }

      input.addEventListener("change", (event) => {
        const selectedSource = ingredientData.source.find(
          (source) => source.name === event.target.value
        );

        let ingredientPrice = "";

        let ingredientLevel = "";

        if (selectedSource) {
          ingredientLevel = selectedSource.necessaryLevel;
          ingredientPrice = selectedSource.price;
        }

        const ingredientQuantity = ingredient.quantity;

        nameValue.textContent = `${ingredientName}`;
        quantityValue.textContent = `${ingredientQuantity}`;
        categoryValue.textContent = `${ingredientCategory}: `;
        levelValue.textContent = `${ingredientLevel}`;
        priceText.textContent = "Preço: ";
        priceValue.textContent = `${ingredientPrice}`;

        listItem.appendChild(nameContainer);
        listItem.appendChild(quantityContainer);
        listItem.appendChild(categoryContainer);
        listItem.appendChild(priceContainer);
        listItem.appendChild(input);

        nameContainer.appendChild(nameValue);
        quantityContainer.appendChild(quantityValue);
        categoryContainer.appendChild(categoryValue);
        categoryContainer.appendChild(levelValue);
        priceContainer.appendChild(priceText);
        priceContainer.appendChild(priceValue);

        listItem.appendChild(input);
      });
    } else {
      listItem.textContent = "N/A";
    }

    ingredientsList.appendChild(listItem);
  }
  card.appendChild(ingredientsList);
  card.appendChild(infoContainer);
  infoContainer.appendChild(totalPrice);
  infoContainer.appendChild(max_level);

  tradepackCardsContainer.appendChild(card);
}

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const inputs = card.querySelectorAll("select");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener("change", () => {
      // seleciona todos os .price_value dentro do card
      const prices = card.querySelectorAll(".price_value");
      let totalPrice = 0;
      // itera sobre cada .price_value e soma ao totalPrice
      prices.forEach((price) => {
        totalPrice += parseInt(price.textContent);
      });
      // seleciona a div .price_total dentro do card e preenche com o valor calculado
      const totalDiv = card.querySelector(".price_total");
      totalDiv.textContent = totalPrice;

      // encontrar o valor máximo de nível
      const liElements = card.querySelectorAll("li");
      let maxLevel = 0;
      let maxLevelCategory = "";
      // itera sobre cada li e atualiza o valor máximo de nível se o valor de level_text for maior
      liElements.forEach((li) => {
        const level = parseInt(li.querySelector(".level_text").textContent);
        if (level > maxLevel) {
          maxLevel = level;
          maxLevelCategory = li
            .closest(".list_item")
            .querySelector(".category_text")
            .textContent.trim();
        }
      });
      // seleciona a div com o valor máximo de nível e atualiza o texto
      const maxLevelDiv = card.querySelector(".max_level");
      maxLevelDiv.textContent = `Nivel requirido:  ${maxLevelCategory} ${maxLevel}`;
    });
  }

  // calcular o preço total e o valor máximo de nível assim que a página é carregada
  const prices = card.querySelectorAll(".price_value");
  let totalPrice = 0;
  prices.forEach((price) => {
    totalPrice += parseInt(price.textContent);
  });
  const totalDiv = card.querySelector(".price_total");
  totalDiv.textContent = totalPrice;

  const liElements = card.querySelectorAll("li");
  let maxLevel = 0;
  let maxLevelCategory = "";
  liElements.forEach((li) => {
    const level = parseInt(li.querySelector(".level_text").textContent);
    if (level > maxLevel) {
      maxLevel = level;
      maxLevelCategory = li
        .closest(".list_item")
        .querySelector(".category_text")
        .textContent.trim();
    }
  });
  const maxLevelDiv = card.querySelector(".max_level");
  maxLevelDiv.textContent = `Nivel requirido:  ${maxLevelCategory} ${maxLevel}`;
});
