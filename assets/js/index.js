"use strict";

function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  //   /*
  //   attributes object example
  //   {
  //     src: "https://example.com",
  //     value: "text",
  //     name: "textInput",
  //   }
  //   */
  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}

const cardContainer = document.getElementById("root");

const cardElements = responseData.map((place) => createPlaceCard(place));

cardContainer.append(...cardElements);

// function createPlaceCard(place) {
//   const card = document.createElement("li");
//   card.classList.add("cardWrapper");

//   const container = document.createElement("article");
//   container.classList.add("cardContainer");

//   const imageWrapper = document.createElement("div");
//   imageWrapper.classList.add("cardImageWrapper");

//   const initials = document.createElement("div");
//   initials.classList.add("initials");
//   initials.append(
//     document.createTextNode(`${place.firstName[0]} ${place.lastName[0]}` || "")
//   );

//   const img = document.createElement("img");
//   img.classList.add("cardImage");

//   img.src = place.profilePicture;
//   img.hidden = true;
//   img.addEventListener("error", handleImageError);
//   img.addEventListener("load", handleImageLoad);

//   const contentWrapper = document.createElement("div");
//   contentWrapper.classList.add("contentWrapper");

//   const firstName = document.createElement("span");
//   firstName.classList.add("firstName");
//   firstName.append(place.firstName);

//   const lastName = document.createElement("span");
//   lastName.classList.add("lastName");
//   lastName.append(place.lastName);

//   const myForm = document.createElement("form");
//   myForm.classList.add("myForm");

//   const inputInfo = document.createElement("button");
//   inputInfo.classList.add("btnDelete");
//   inputInfo.innerText = "Delete";

//   imageWrapper.append(img, initials);
//   myForm.append(inputInfo);
//   contentWrapper.append(firstName, lastName, myForm);
//   container.append(imageWrapper, contentWrapper);
//   card.append(container);

//   return card;
// }
// function handleImageError({ target }) {
//   target.remove();
// }

// function handleImageLoad({ target }) {
//   target.hidden = false;
// }
function createPlaceCard(place) {
  const imageWrapper = createImageWrapper(place);
  const contentWrapper = createContentWrapper(place);

  // article.cardContainer
  const container = createElement(
    "article",
    { classNames: ["cardContainer"] },
    imageWrapper,
    contentWrapper
  );

  // li.cardWrapper
  const card = createElement("li", { classNames: ["cardWrapper"] }, container);

  return card;
}

function createImageWrapper({ firstName, lastName, profilePicture }) {
  // div.initials
  const initials = createElement(
    "div",
    { classNames: ["initials"] },

    document.createTextNode(firstName[0] + lastName[0] || "")
  );

  const img = createElement("img", {
    classNames: ["cardImage"],
    handlers: {
      error: handleImageError,
      load: handleImageLoad,
    },
  });
  img.src = profilePicture;
  img.hidden = true;

  // div.cardImageWrapper
  const imageWrapper = createElement(
    "div",
    {
      classNames: ["cardImageWrapper"],
    },
    initials,
    img
  );
  return imageWrapper;
}

function createContentWrapper({ firstName, lastName, contacts, initials }) {
  //h3.cardName
  const firstNames = createElement(
    "span",
    { classNames: ["firstName"] },
    document.createTextNode(firstName || "")
  );

  //p.cardDescription
  const lastNames = createElement(
    "span",
    { classNames: ["lastName"] },
    document.createTextNode(lastName || "")
  );

  const myForm = createElement("form", { classNames: ["myForm"] });
  const imgButton = createElement("button", { classNames: ["imgButton"] });
  myForm.append(imgButton);

  const contentWrapper = createElement(
    "div",
    {
      classNames: ["contentWrapper"],
    },
    firstNames,
    lastNames,
    myForm
  );
  return contentWrapper;
}

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({ target }) {
  target.hidden = false;
}
