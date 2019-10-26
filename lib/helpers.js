"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttributeValue = exports.getAttribute = exports.capitalizeWord = void 0;

/**
 * Capitalize a word by making the first letter uppercase
 *
 * @param {String} word The worde to capitalize
 * @returns {String} The capitalized word
 */
var capitalizeWord = function capitalizeWord(word) {
  return word[0].toUpperCase() + word.substring(1);
};
/**
 * Get a node attribute by its name
 *
 * @param {Object} node The target node
 * @param {String} attrName The name of the attribute
 * @returns {Object} The attribute
 */


exports.capitalizeWord = capitalizeWord;

var getAttribute = function getAttribute(node, attrName) {
  return node.attributes.find(function (attr) {
    var _attr$name;

    return (attr === null || attr === void 0 ? void 0 : (_attr$name = attr.name) === null || _attr$name === void 0 ? void 0 : _attr$name.name) === attrName;
  });
};
/**
 * Get an attribute value
 * If it's a literal, it will be returned as is
 * Otherwise if it's an identifier, it will be returned formatted
 *
 * @param {Object} attr The attribute
 * @returns {String} The attribute value
 */


exports.getAttribute = getAttribute;

var getAttributeValue = function getAttributeValue(attr) {
  var _attr$value, _attr$value$expressio, _attr$value2, _attr$value2$expressi, _attr$value2$expressi2, _attr$value3, _attr$value4, _attr$value4$expressi, _attr$value5, _attr$value5$expressi, _attr$value5$expressi2, _attr$value5$expressi3, _attr$value5$expressi4;

  // This is an identifier: <input attr={foo} />
  if (attr === null || attr === void 0 ? void 0 : (_attr$value = attr.value) === null || _attr$value === void 0 ? void 0 : (_attr$value$expressio = _attr$value.expression) === null || _attr$value$expressio === void 0 ? void 0 : _attr$value$expressio.name) {
    return '${' + attr.value.expression.name + '}';
  } // This is an identifier inside a template: <input attr={`${foo}`} />


  if (attr === null || attr === void 0 ? void 0 : (_attr$value2 = attr.value) === null || _attr$value2 === void 0 ? void 0 : (_attr$value2$expressi = _attr$value2.expression) === null || _attr$value2$expressi === void 0 ? void 0 : (_attr$value2$expressi2 = _attr$value2$expressi.expressions) === null || _attr$value2$expressi2 === void 0 ? void 0 : _attr$value2$expressi2.length) {
    var expressions = attr.value.expression.expressions.map(function (expression) {
      if (expression.type === 'Identifier') {
        return '${' + expression.name + '}';
      } else if (expression.type === 'LogicalExpression') {
        return '${' + (expression.left.name || expression.left.value) + ' ' + expression.operator + ' ' + (expression.right.name || expression.right.value) + '}';
      }
    }).join('');
    return expressions;
  }
  /*
      This is either a literal or a template element:
      <input attr="foo" /> or
      <input attr={"foo"} /> or
      <input attr={`foo`} />
  */


  return (attr === null || attr === void 0 ? void 0 : (_attr$value3 = attr.value) === null || _attr$value3 === void 0 ? void 0 : _attr$value3.value) || (attr === null || attr === void 0 ? void 0 : (_attr$value4 = attr.value) === null || _attr$value4 === void 0 ? void 0 : (_attr$value4$expressi = _attr$value4.expression) === null || _attr$value4$expressi === void 0 ? void 0 : _attr$value4$expressi.value) || (attr === null || attr === void 0 ? void 0 : (_attr$value5 = attr.value) === null || _attr$value5 === void 0 ? void 0 : (_attr$value5$expressi = _attr$value5.expression) === null || _attr$value5$expressi === void 0 ? void 0 : (_attr$value5$expressi2 = _attr$value5$expressi.quasis) === null || _attr$value5$expressi2 === void 0 ? void 0 : (_attr$value5$expressi3 = _attr$value5$expressi2[0]) === null || _attr$value5$expressi3 === void 0 ? void 0 : (_attr$value5$expressi4 = _attr$value5$expressi3.value) === null || _attr$value5$expressi4 === void 0 ? void 0 : _attr$value5$expressi4.raw);
};

exports.getAttributeValue = getAttributeValue;