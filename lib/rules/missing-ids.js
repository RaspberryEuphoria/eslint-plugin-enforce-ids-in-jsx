/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict'; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('../constants'),
    DEFAULT_TARGET_OPTION = _require.DEFAULT_TARGET_OPTION,
    DEFAULT_TARGET_CUSTOM_OPTION = _require.DEFAULT_TARGET_CUSTOM_OPTION,
    DEFAULT_PRIORITY_OVER_SPREAD_OPTION = _require.DEFAULT_PRIORITY_OVER_SPREAD_OPTION;

var _require2 = require('../helpers'),
    capitalizeWord = _require2.capitalizeWord,
    getAttribute = _require2.getAttribute,
    getAttributeValue = _require2.getAttributeValue;

var formElements = ['button', 'input', 'select', 'textarea', 'option'];
var materialElements = [// Form Elements
'NativeSelect', 'Select', 'MenuItem', 'Button', 'IconButton', 'Checkbox', 'Radio', 'Slider', 'Switch', 'TextField', 'Input', 'OutlinedInput', // Layout elements
'Modal'];
module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: {
      items: {
        type: 'object',
        properties: {
          target: {
            type: 'array',
            items: {
              "enum": ['all', 'form', 'material', 'none']
            },
            minItems: 1,
            uniqueItems: true,
            additionalItems: false
          },
          targetCustom: {
            type: 'array',
            minItems: 1,
            uniqueItems: true
          },
          priorityOverSpread: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    },
    messages: {
      missingId: 'Missing "id" attribute for {{ nodeType }}. Quick fix suggestion: `{{ suggestionsText }}`'
    }
  },
  create: function create(context) {
    var options = context.options[0];
    var target = (options === null || options === void 0 ? void 0 : options.target) || DEFAULT_TARGET_OPTION;
    var targetCustom = (options === null || options === void 0 ? void 0 : options.targetCustom) || DEFAULT_TARGET_CUSTOM_OPTION;
    var priorityOverSpread = (options === null || options === void 0 ? void 0 : options.priorityOverSpread) !== undefined ? options === null || options === void 0 ? void 0 : options.priorityOverSpread : DEFAULT_PRIORITY_OVER_SPREAD_OPTION;
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var getNodeAttribute = function getNodeAttribute(attrName) {
          return getAttribute(node, attrName);
        };

        var nodeType = node.name.name;
        var spreadAttributes = node.attributes.find(function (_ref) {
          var type = _ref.type;
          return type === 'JSXSpreadAttribute';
        });

        if (!priorityOverSpread && spreadAttributes) {
          return;
        }

        if (!target.includes('all')) {
          var isNodeTargeted = false;
          var targetElements = {
            form: formElements,
            material: materialElements
          };
          var finalTarget = target.includes('none') ? targetCustom : [].concat(_toConsumableArray(target), _toConsumableArray(targetCustom));
          finalTarget.some(function (value) {
            if (targetElements[value] && targetElements[value].includes(nodeType) || value.includes(nodeType)) {
              isNodeTargeted = true;
            }
          });

          if (!isNodeTargeted) {
            return;
          }
        }

        var idAttribute = getNodeAttribute('id');

        if (!getAttributeValue(idAttribute)) {
          var nameAttribute = getNodeAttribute('name');
          var nameAttributeValue = getAttributeValue(nameAttribute);
          var typeAttribute = getNodeAttribute('type');
          var typeAttributeValue = getAttributeValue(typeAttribute);
          var labelAttribute = getNodeAttribute('label');
          var labelAttributeValue = getAttributeValue(labelAttribute);
          var suggestions = [];

          if (nameAttributeValue) {
            suggestions.push(nameAttributeValue);
          } else if (labelAttributeValue) {
            suggestions.push(labelAttributeValue);
          }

          if (typeAttributeValue) {
            suggestions.push(typeAttributeValue);
          }

          suggestions.push(nodeType);
          var suggestionsText = suggestions.map(function (suggestion, i) {
            return i === 0 ? suggestion : capitalizeWord(suggestion);
          }).join('');
          context.report({
            node: node,
            messageId: 'missingId',
            data: {
              suggestionsText: suggestionsText,
              nodeType: nodeType
            },
            fix: function fix(fixer) {
              var start = node.start + nodeType.length;
              var end = start + 1;

              if (spreadAttributes) {
                start = spreadAttributes.start;
                end = spreadAttributes.end + 1;
              }

              return fixer.insertTextAfterRange([start, end], ' id={`' + suggestionsText + '`}');
            }
          });
        }
      }
    };
  }
};