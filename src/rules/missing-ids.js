/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {
    DEFAULT_TARGET_OPTION,
    DEFAULT_TARGET_CUSTOM_OPTION,
    DEFAULT_PRIORITY_OVER_SPREAD_OPTION,
    DEFAULT_SUGGESTIONS_ENABLED,
} = require('../constants');
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
        schema: {
            items: {
                type: 'object',
                properties: {
                    target: {
                        type: 'array',
                        items: { enum: ['all', 'form', 'material', 'none'] },
                        minItems: 1,
                        uniqueItems: true,
                        additionalItems: false,
                    },
                    targetCustom: {
                        type: 'array',
                        minItems: 1,
                        uniqueItems: true,
                    },
                    suggestionsEnabled: { type: 'boolean' },
                    priorityOverSpread: { type: 'boolean' },
                },
                additionalProperties: false,
            },
        },
        messages: {
            missingId: 'Missing "id" attribute for {{ nodeType }}{{ suggestionsText }}',
        },
    },
    create(context) {
        const options = context.options[0];
        const target = options?.target || DEFAULT_TARGET_OPTION;
        const targetCustom = options?.targetCustom || DEFAULT_TARGET_CUSTOM_OPTION;
        const priorityOverSpread =
            options?.priorityOverSpread !== undefined
                ? options?.priorityOverSpread
                : DEFAULT_PRIORITY_OVER_SPREAD_OPTION;
        const suggestionsEnabled = options?.suggestionsEnabled || DEFAULT_SUGGESTIONS_ENABLED;

        return {
            JSXOpeningElement(node) {
                const getNodeAttribute = attrName => getAttribute(node, attrName);
                const nodeType = node.name.name;
                const spreadAttributes = node.attributes.find(
                    ({ type }) => type === 'JSXSpreadAttribute',
                );

                if (!priorityOverSpread && spreadAttributes) {
                    return;
                }

                if (!target.includes('all')) {
                    let isNodeTargeted = false;

                    const targetElements = {
                        form: formElements,
                        material: materialElements,
                    };

                    const finalTarget = target.includes('none')
                        ? targetCustom
                        : [...target, ...targetCustom];

                    finalTarget.some(value => {
                        if (
                            (targetElements[value] && targetElements[value].includes(nodeType)) ||
                            value.includes(nodeType)
                        ) {
                            isNodeTargeted = true;
                        }
                    });

                    if (!isNodeTargeted) {
                        return;
                    }
                }

                const idAttribute = getNodeAttribute('id');

                if (!getAttributeValue(idAttribute)) {
                    const suggestions = [];

                    if (suggestionsEnabled) {
                        const nameAttribute = getNodeAttribute('name');
                        const nameAttributeValue = getAttributeValue(nameAttribute);

                        const typeAttribute = getNodeAttribute('type');
                        const typeAttributeValue = getAttributeValue(typeAttribute);

                        const labelAttribute = getNodeAttribute('label');
                        const labelAttributeValue = getAttributeValue(labelAttribute);

                        if (nameAttributeValue) {
                            suggestions.push(nameAttributeValue);
                        } else if (labelAttributeValue) {
                            suggestions.push(labelAttributeValue);
                        }

                        if (typeAttributeValue) {
                            suggestions.push(typeAttributeValue);
                        }

                        suggestions.push(nodeType);
                    }

                    const suggestionsText = suggestionsEnabled
                        ? ' Quick fix suggestion: `' +
                          suggestions
                              .map((suggestion, i) =>
                                  i === 0 ? suggestion : capitalizeWord(suggestion),
                              )
                              .join('') +
                          '`'
                        : '';

                    context.report({
                        node,
                        messageId: 'missingId',
                        data: {
                            suggestionsText,
                            nodeType,
                        },
                        fix(fixer) {
                            if (!suggestionsEnabled) {
                                return;
                            }

                            let start = node.start + nodeType.length;
                            let end = start + 1;

                            if (spreadAttributes) {
                                start = spreadAttributes.start;
                                end = spreadAttributes.end + 1;
                            }

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
