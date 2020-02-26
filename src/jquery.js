window.jQuery = function(selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }
  return {
    oldApi: selectorOrArray.oldApi,
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    },
    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        array = array.concat(
          Array.from(elements[i].querySelectorAll(selector))
        );
      }
      array.oldApi = this;
      return jQuery(array);
    },
    end() {
      return this.oldApi;
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
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
      array.oldApi = this
      return jQuery(array);
    },
    children(){
      const array = []
      this.each((node)=>{
        array.push(...node.children)
      })
      array.oldApi = this
      return jQuery(array)
    }
  };
};

window.$ = window.jQuery