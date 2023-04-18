import { tradepackList } from "./tradepacksList.js";
import { ingredientList } from "./ingredientList.js";

const tradepackCardsContainer = document.getElementById(
  "tradepack-cards-container"
);

for (const tradepack of tradepackList) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = tradepack.name;
  card.appendChild(title);

  const ingredientsList = document.createElement("ul");

  for (const ingredient of tradepack.ingredients) {
    const listItem = document.createElement("li");
    const ingredientData = ingredientList.find(
      (data) => data.name === ingredient.name
    );
    if (ingredientData) {
      const ingredientCategory = ingredientData.category;
      const ingredientName = ingredientData.name;
      const ingredientQuantity = ingredient.quantity;
      const ingredientLevel = ingredientData.necessaryLevel[0];
      let ingredientPrice = ingredientData.price[0];

      const ingredientInfo = `${ingredientName} (${ingredientQuantity}), ${ingredientCategory}: ${ingredientLevel}, Preço: ${ingredientPrice} `;
      listItem.textContent = `${ingredientInfo}`;
    } else {
      listItem.textContent = "N/A";
    }

    ingredientsList.appendChild(listItem);
  }
  card.appendChild(ingredientsList);

  card.addEventListener("click", () => {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    for (const ingredient of tradepack.ingredients) {
      const ingredientData = ingredientList.find(
        (data) => data.name === ingredient.name
      );
      if (ingredientData) {
        for (let i = 0; i < ingredientData.anotherSource.length; i++) {
          const name = ingredientData.anotherSource[i];

          const div = document.createElement("div");
          div.classList.add("card");

          const title = document.createElement("h2");
          title.textContent = name;
          div.appendChild(title);

          const ingredientInfo = document.createElement("ul");

          let ingredientesInfo = "";

          for (const ingredientPack of tradepack.ingredients) {
            const ingredientPackData = ingredientList.find(
              (data) => data.name === ingredientPack.name
            );
            if (ingredientPackData) {
              const ingredientPackCategory = ingredientPackData.category;
              const ingredientPackName = ingredientPackData.name;
              const ingredientPackQuantity = ingredientPack.quantity;
              let ingredientPackLevel = ingredientPackData.necessaryLevel[0];
              let ingredientPackPrice = ingredientPackData.price[0];

              if (ingredientPackData.anotherSource.includes(name)) {
                // Verifica se o name atual é encontrado em anotherSource
                const index = ingredientPackData.anotherSource.indexOf(name);
                ingredientPackPrice = ingredientPackData.anotherPrice[index];
                ingredientPackLevel = ingredientPackData.necessaryLevel[index];
              }

              const ingredientPackInfo = `${ingredientPackName} (${ingredientPackQuantity}), ${ingredientPackCategory}: ${ingredientPackLevel}, Preço: ${ingredientPackPrice} `;
              ingredientesInfo += `${ingredientPackInfo} \n`;
            }
          }

          const listItem = document.createElement("li");
          listItem.textContent = ingredientesInfo;
          ingredientInfo.appendChild(listItem);

          div.appendChild(ingredientInfo);

          popup.appendChild(div);
        }
      }
    }

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
      popup.remove();
    });

    popup.appendChild(closeButton);

    document.body.appendChild(popup);
  });

  tradepackCardsContainer.appendChild(card);
}
