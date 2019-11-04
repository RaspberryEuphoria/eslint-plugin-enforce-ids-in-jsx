/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict'; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var _require = require('../helpers'),
    getAttribute = _require.getAttribute,
    getAttributeValue = _require.getAttributeValue;

module.exports = {
  meta: {
    docs: {
      description: 'Form elements must have an unique id',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null,
    // or "code" or "whitespace"
    schema: [// fill in your schema
    ],
    messages: {
      uniqueId: 'The id value {{ idAttributeValue }} must be unique.'
    }
  },
  create: function create(context) {
    var usedIds = [];
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var getNodeAttribute = function getNodeAttribute(attrName) {
          return getAttribute(node, attrName);
        };

        var idAttribute = getNodeAttribute('id');
        var idAttributeValue = getAttributeValue(idAttribute);

        if (!idAttributeValue) {
          return;
        }

        if (!usedIds.includes(idAttributeValue)) {
          usedIds.push(idAttributeValue);
        } else {
          context.report({
            node: node,
            messageId: 'uniqueId',
            data: {
              idAttributeValue: idAttributeValue
            }
          });
        }
      }
    };
  }
};