/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { getAttribute, getAttributeValue } = require('../helpers');

module.exports = {
    meta: {
        docs: {
            description: 'Form elements must have an unique id',
            category: 'Fill me in',
            recommended: false,
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
            uniqueId: 'The id value {{ idAttributeValue }} must be unique.',
        },
    },
    create(context) {
        const usedIds = [];

        return {
            JSXOpeningElement(node) {
                const getNodeAttribute = attrName => getAttribute(node, attrName);

                const idAttribute = getNodeAttribute('id');
                const idAttributeValue = getAttributeValue(idAttribute);

                if (!idAttributeValue) {
                    return;
                }

                if (!usedIds.includes(idAttributeValue)) {
                    usedIds.push(idAttributeValue);
                } else {
                    context.report({
                        node,
                        messageId: 'uniqueId',
                        data: {
                            idAttributeValue,
                        },
                    });
                }
            },
        };
    },
};
