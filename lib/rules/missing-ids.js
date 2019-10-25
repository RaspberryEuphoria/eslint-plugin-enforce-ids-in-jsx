/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict'; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var _require = require('../constants'),
    DEFAULT_TARGET_CONFIG = _require.DEFAULT_TARGET_CONFIG;

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
    schema: [{
      "enum": ['all', 'form', 'material', 'formAndMaterial']
    }],
    messages: {
      missingId: 'Missing id attribute on {{ nodeType }}. Quick fix it with: `{{ suggestionsText }}`'
    }
  },
  create: function create(context) {
    var targetConfig = context.options[0] || DEFAULT_TARGET_CONFIG;
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var getNodeAttribute = function getNodeAttribute(attrName) {
          return getAttribute(node, attrName);
        };

        var nodeType = node.name.name;

        if (targetConfig !== 'all') {
          var isNodeTargeted = false;

          switch (targetConfig) {
            case 'form':
              isNodeTargeted = formElements.includes(nodeType);
              break;

            case 'material':
              isNodeTargeted = materialElements.includes(nodeType);
              break;

            default:
              isNodeTargeted = [].concat(formElements, materialElements).includes(nodeType);
          }

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
          var suggestions = [];

          if (nameAttributeValue) {
            suggestions.push(nameAttributeValue);
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
              return fixer.insertTextAfterRange([start, end], ' id={`' + suggestionsText + '`}');
            }
          });
        }
      }
    };
  }
};