import { tradepackList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const tradepackCardsContainer = document.getElementById(
  "tradepack-cards-container"
);

function createAndConfigureElement(elementType, classes = [], attributes = {}) {
  const element = document.createElement(elementType);
  classes.forEach((className) => element.classList.add(className));
  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    element.setAttribute(attributeName, attributeValue);
  });
  return element;
}

for (const tradepack of tradepackList) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = tradepack.name;
  card.appendChild(title);

  const ingredientsList = document.createElement("ul");

  const totalPrice = document.createElement("div");
  totalPrice.textContent = "Preço total: ";

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
      const categoryValue = createAndConfigureElement("span", ["category_text",]);
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
  card.appendChild(totalPrice);

  tradepackCardsContainer.appendChild(card);
}
