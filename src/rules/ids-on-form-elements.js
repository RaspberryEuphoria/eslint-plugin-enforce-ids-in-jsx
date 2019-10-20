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
        messages: {
            missingId:
                'Form elements must have an id attribute. Suggestion: use [ {{ suggestionsText }} ].',
        },
    },
    create(context) {
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
                        ({ name }) => name.name === 'name',
                    )?.value?.value;

                    const typeAttributeValue = node.attributes.find(
                        ({ name }) => name.name === 'type',
                    )?.value?.value;

                    // Push order matters for the output!
                    // The output for `<foo type="bar" name="baz" />` should be nameTypeNode, ie. `bazBarFoo`
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

                    context.report({
                        node,
                        messageId: 'missingId',
                        data: {
                            suggestionsText,
                        },
                    });
                }
            },
        };
    },
};
