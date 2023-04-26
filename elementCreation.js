function createAndConfigureElement(elementType, classes = [], attributes = {}) {
    const element = document.createElement(elementType);
    classes.forEach((className) => element.classList.add(className));
    Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
      element.setAttribute(attributeName, attributeValue);
    });
    return element;
  }

  export { createAndConfigureElement };