"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttributeValue = exports.getAttribute = exports.capitalizeWord = void 0;

/**
 * Capitalize a word by makeing the first letter uppercase
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
  return node.attributes.find(function (_ref) {
    var name = _ref.name;
    return name.name === attrName;
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
  var _attr$value, _attr$value$expressio, _attr$value2, _attr$value2$expressi, _attr$value2$expressi2, _attr$value2$expressi3, _attr$value5, _attr$value6, _attr$value6$expressi, _attr$value7, _attr$value7$expressi, _attr$value7$expressi2;

  /* 
      This is either an identifier or an identifier inside a template:
      <input attr={foo} /> or
      <input attr={`${foo}`} />
  */
  if ((attr === null || attr === void 0 ? void 0 : (_attr$value = attr.value) === null || _attr$value === void 0 ? void 0 : (_attr$value$expressio = _attr$value.expression) === null || _attr$value$expressio === void 0 ? void 0 : _attr$value$expressio.name) || (attr === null || attr === void 0 ? void 0 : (_attr$value2 = attr.value) === null || _attr$value2 === void 0 ? void 0 : (_attr$value2$expressi = _attr$value2.expression) === null || _attr$value2$expressi === void 0 ? void 0 : (_attr$value2$expressi2 = _attr$value2$expressi.expressions) === null || _attr$value2$expressi2 === void 0 ? void 0 : (_attr$value2$expressi3 = _attr$value2$expressi2[0]) === null || _attr$value2$expressi3 === void 0 ? void 0 : _attr$value2$expressi3.name)) {
    var _attr$value3, _attr$value3$expressi, _attr$value4, _attr$value4$expressi, _attr$value4$expressi2, _attr$value4$expressi3;

    return '${' + (attr === null || attr === void 0 ? void 0 : (_attr$value3 = attr.value) === null || _attr$value3 === void 0 ? void 0 : (_attr$value3$expressi = _attr$value3.expression) === null || _attr$value3$expressi === void 0 ? void 0 : _attr$value3$expressi.name) || (attr === null || attr === void 0 ? void 0 : (_attr$value4 = attr.value) === null || _attr$value4 === void 0 ? void 0 : (_attr$value4$expressi = _attr$value4.expression) === null || _attr$value4$expressi === void 0 ? void 0 : (_attr$value4$expressi2 = _attr$value4$expressi.expressions) === null || _attr$value4$expressi2 === void 0 ? void 0 : (_attr$value4$expressi3 = _attr$value4$expressi2[0]) === null || _attr$value4$expressi3 === void 0 ? void 0 : _attr$value4$expressi3.name) + '}';
  }
  /*
      This is either a literal or a template element:
      <input attr="foo" /> or
      <input attr={"foo"} /> or
      <input attr={`foo`} />
  */


  return (attr === null || attr === void 0 ? void 0 : (_attr$value5 = attr.value) === null || _attr$value5 === void 0 ? void 0 : _attr$value5.value) || (attr === null || attr === void 0 ? void 0 : (_attr$value6 = attr.value) === null || _attr$value6 === void 0 ? void 0 : (_attr$value6$expressi = _attr$value6.expression) === null || _attr$value6$expressi === void 0 ? void 0 : _attr$value6$expressi.value) || (attr === null || attr === void 0 ? void 0 : (_attr$value7 = attr.value) === null || _attr$value7 === void 0 ? void 0 : (_attr$value7$expressi = _attr$value7.expression) === null || _attr$value7$expressi === void 0 ? void 0 : (_attr$value7$expressi2 = _attr$value7$expressi.quasis) === null || _attr$value7$expressi2 === void 0 ? void 0 : _attr$value7$expressi2.value);
};

exports.getAttributeValue = getAttributeValue;