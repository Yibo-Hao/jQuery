window.$ = window.jQuery = function(selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    if (selectorOrArray[0] === "<") {
      createElement(selectorOrArray);
    } else {
      elements = document.querySelectorAll(selectorOrArray);
    }
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  const api = Object.create(jQuery.prototype);
  api.oldApi = selectorOrArray.oldApi;
  api.elements = elements;
  return api;
};

jQuery.prototype = {
  constructor: jQuery,
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      array = array.concat(
        Array.from(this.elements[i].querySelectorAll(selector))
      );
    }
    array.oldApi = this;
    return jQuery(array);
  },
  end() {
    return this.oldApi;
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    array.oldApi = this;
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each(node => {
      array.push(...node.children);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  printf() {
    console.log(this.elements);
  }
};
