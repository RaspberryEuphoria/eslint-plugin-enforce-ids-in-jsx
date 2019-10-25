/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { DEFAULT_TARGET_CONFIG } = require('../constants');
const { capitalizeWord, getAttribute, getAttributeValue } = require('../helpers');

const formElements = ['button', 'input', 'select', 'textarea', 'option'];
const materialElements = [
    // Form Elements
    'NativeSelect',
    'Select',
    'MenuItem',
    'Button',
    'IconButton',
    'Checkbox',
    'Radio',
    'Slider',
    'Switch',
    'TextField',
    'Input',
    'OutlinedInput',
    // Layout elements
    'Modal',
];

module.exports = {
    meta: {
        type: 'suggestion',
        fixable: 'code',
        schema: [
            {
                enum: ['all', 'form', 'material', 'formAndMaterial'],
            },
        ],
        messages: {
            missingId:
                'Missing id attribute on {{ nodeType }}. Quick fix it with: `{{ suggestionsText }}`',
        },
    },
    create(context) {
        const targetConfig = context.options[0] || DEFAULT_TARGET_CONFIG;

        return {
            JSXOpeningElement(node) {
                const getNodeAttribute = attrName => getAttribute(node, attrName);
                const nodeType = node.name.name;

                if (targetConfig !== 'all') {
                    let isNodeTargeted = false;

                    switch (targetConfig) {
                        case 'form':
                            isNodeTargeted = formElements.includes(nodeType);
                            break;
                        case 'material':
                            isNodeTargeted = materialElements.includes(nodeType);
                            break;
                        default:
                            isNodeTargeted = [...formElements, ...materialElements].includes(
                                nodeType,
                            );
                    }

                    if (!isNodeTargeted) {
                        return;
                    }
                }

                const idAttribute = getNodeAttribute('id');

                if (!getAttributeValue(idAttribute)) {
                    const nameAttribute = getNodeAttribute('name');
                    const nameAttributeValue = getAttributeValue(nameAttribute);

                    const typeAttribute = getNodeAttribute('type');
                    const typeAttributeValue = getAttributeValue(typeAttribute);

                    const suggestions = [];

                    if (nameAttributeValue) {
                        suggestions.push(nameAttributeValue);
                    } else {
                        const keyAttribute = getNodeAttribute('key');
                        const keyAttributeValue = getAttributeValue(keyAttribute);

                        if (keyAttributeValue) {
                            suggestions.push(keyAttributeValue);
                        }
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
                            nodeType,
                        },
                        fix(fixer) {
                            const start = node.start + nodeType.length;
                            const end = start + 1;

                            return fixer.insertTextAfterRange(
                                [start, end],
                                ' id={`' + suggestionsText + '`}',
                            );
                        },
                    });
                }
            },
        };
    },
};
