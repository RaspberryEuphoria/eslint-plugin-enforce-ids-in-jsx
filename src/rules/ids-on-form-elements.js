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
            description: 'Form elements must have an id',
            category: 'Fill me in',
            recommended: false,
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
    },
    create(context) {
        const ERROR_MSG_MISSING_ID = 'Form elements must have an id attribute.';
        const formElements = ['button', 'input', 'select', 'textarea', 'option'];
        const capitalizeWord = word => word[0].toUpperCase() + word.substring(1);

        return {
            JSXOpeningElement(node) {
                const nodeType = node.name.name;

                if (!formElements.includes(nodeType)) {
                    return;
                }

                const idAttribute = node.attributes.find(({ name }) => name.name === 'id');
                const idAttributeValue =
                    idAttribute?.value?.value ||
                    idAttribute?.value?.expression?.name ||
                    idAttribute?.value?.expression?.value;

                if (!idAttributeValue) {
                    const nameAttributeValue = node.attributes.find(
                        attribute => attribute.name.name === 'name',
                    )?.value?.value;

                    const typeAttributeValue = node.attributes.find(
                        attribute => attribute.name.name === 'type',
                    )?.value?.value;

                    const suggestions = [];

                    if (nameAttributeValue) {
                        suggestions.push(nameAttributeValue);
                    }

                    if (typeAttributeValue) {
                        suggestions.push(typeAttributeValue);
                    }

                    suggestions.push(nodeType);

                    const suggestionsText = suggestions
                        .map((suggestion, i) => (i === 0 ? suggestion : capitalizeWord(suggestion)))
                        .join('');

                    const message = suggestions.length
                        ? `${ERROR_MSG_MISSING_ID} Suggestion: use "${suggestionsText}".`
                        : ERROR_MSG_MISSING_ID;

                    context.report({
                        node,
                        message,
                    });
                }
            },
        };
    },
};
