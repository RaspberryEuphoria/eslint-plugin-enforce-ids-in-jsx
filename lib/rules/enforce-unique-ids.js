/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
    },
    create(context) {
        const ERROR_MSG_DUPLICATE_ID = "You can't use the same id more than once.";
        const usedIds = [];

        return {
            JSXOpeningElement(node) {
                const idAttribute = node.attributes.find(({ name }) => name.name === 'id');
                const idAttributeValue =
                    idAttribute?.value?.value || idAttribute?.value?.expression?.value;

                if (!idAttributeValue) {
                    return;
                }

                if (!usedIds.includes(idAttributeValue)) {
                    usedIds.push(idAttributeValue);
                } else {
                    context.report({
                        node,
                        message: ERROR_MSG_DUPLICATE_ID,
                    });
                }
            },
        };
    },
};
