/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict'; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Form elements must have an id',
            category: 'Fill me in',
            recommended: false,
        },
        fixable: null,
        // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
    },
    create: function create(context) {
        var ERROR_MSG_MISSING_ID = 'Form elements must have an id attribute.';
        var formElements = ['button', 'input', 'select', 'textarea', 'option'];

        var capitalizeWord = function capitalizeWord(word) {
            return word[0].toUpperCase() + word.substring(1);
        };

        return {
            JSXOpeningElement: function JSXOpeningElement(node) {
                var _idAttribute$value,
                    _idAttribute$value2,
                    _idAttribute$value2$e,
                    _idAttribute$value3,
                    _idAttribute$value3$e;

                var nodeType = node.name.name;

                if (!formElements.includes(nodeType)) {
                    return;
                }

                var idAttribute = node.attributes.find(function(_ref) {
                    var name = _ref.name;
                    return name.name === 'id';
                });
                var idAttributeValue =
                    (idAttribute === null || idAttribute === void 0
                        ? void 0
                        : (_idAttribute$value = idAttribute.value) === null ||
                          _idAttribute$value === void 0
                        ? void 0
                        : _idAttribute$value.value) ||
                    (idAttribute === null || idAttribute === void 0
                        ? void 0
                        : (_idAttribute$value2 = idAttribute.value) === null ||
                          _idAttribute$value2 === void 0
                        ? void 0
                        : (_idAttribute$value2$e = _idAttribute$value2.expression) === null ||
                          _idAttribute$value2$e === void 0
                        ? void 0
                        : _idAttribute$value2$e.name) ||
                    (idAttribute === null || idAttribute === void 0
                        ? void 0
                        : (_idAttribute$value3 = idAttribute.value) === null ||
                          _idAttribute$value3 === void 0
                        ? void 0
                        : (_idAttribute$value3$e = _idAttribute$value3.expression) === null ||
                          _idAttribute$value3$e === void 0
                        ? void 0
                        : _idAttribute$value3$e.value);

                if (!idAttributeValue) {
                    var _node$attributes$find,
                        _node$attributes$find2,
                        _node$attributes$find3,
                        _node$attributes$find4;

                    var nameAttributeValue =
                        (_node$attributes$find = node.attributes.find(function(attribute) {
                            return attribute.name.name === 'name';
                        })) === null || _node$attributes$find === void 0
                            ? void 0
                            : (_node$attributes$find2 = _node$attributes$find.value) === null ||
                              _node$attributes$find2 === void 0
                            ? void 0
                            : _node$attributes$find2.value;
                    var typeAttributeValue =
                        (_node$attributes$find3 = node.attributes.find(function(attribute) {
                            return attribute.name.name === 'type';
                        })) === null || _node$attributes$find3 === void 0
                            ? void 0
                            : (_node$attributes$find4 = _node$attributes$find3.value) === null ||
                              _node$attributes$find4 === void 0
                            ? void 0
                            : _node$attributes$find4.value;
                    var suggestions = [];

                    if (nameAttributeValue) {
                        suggestions.push(nameAttributeValue);
                    }

                    if (typeAttributeValue) {
                        suggestions.push(typeAttributeValue);
                    }

                    suggestions.push(nodeType);
                    var suggestionsText = suggestions
                        .map(function(suggestion, i) {
                            return i === 0 ? suggestion : capitalizeWord(suggestion);
                        })
                        .join('');
                    var message = suggestions.length
                        ? ''
                              .concat(ERROR_MSG_MISSING_ID, ' Suggestion: use "')
                              .concat(suggestionsText, '".')
                        : ERROR_MSG_MISSING_ID;
                    context.report({
                        node: node,
                        message: message,
                    });
                }
            },
        };
    },
};
