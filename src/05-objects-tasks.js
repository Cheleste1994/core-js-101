/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   getArea() {
//     return this.width * this.height;
//   }
// }

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */


const cssSelectorBuilder = {
  arr: [],
  selectors: [],
  order: {
    element: 1,
    id: 2,
    class: 3,
    attr: 4,
    pseudoClass: 5,
    pseudoElement: 6,
  },
  prevOrder: 0,

  element(value) {
    if (this.order.element < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.element;
    this.selectors.push(value);
    return this;
  },

  id(value) {
    if (this.order.id < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.id;
    this.selectors.push(`#${value}`);
    return this;
  },

  class(value) {
    if (this.order.class < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.class;
    this.selectors.push(`.${value}`);
    return this;
  },

  attr(value) {
    if (this.order.attr < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.attr;
    this.selectors.push(`[${value}]`);
    return this;
  },

  pseudoClass(value) {
    if (this.order.pseudoClass < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.pseudoClass;
    this.selectors.push(`:${value}`);
    return this;
  },

  pseudoElement(value) {
    if (this.order.pseudoElement < this.prevOrder) {
      this.arr.push(this.selectors);
      this.selectors = [];
      this.prevOrder = 0;
    }
    this.prevOrder = this.order.pseudoElement;
    this.selectors.push(`::${value}`);
    return this;
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },

  stringify() {
    const str = this.selectors.join('');
    this.selectors = [];
    return str;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
