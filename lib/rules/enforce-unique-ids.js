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
            description: 'Form elements must have an unique id',
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
        var ERROR_MSG_DUPLICATE_ID = "You can't use the same id more than once.";
        var usedIds = [];
        return {
            JSXOpeningElement: function JSXOpeningElement(node) {
                var _idAttribute$value, _idAttribute$value2, _idAttribute$value2$e;

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
                        : _idAttribute$value2$e.value);

                if (!idAttributeValue) {
                    return;
                }

                if (!usedIds.includes(idAttributeValue)) {
                    usedIds.push(idAttributeValue);
                } else {
                    context.report({
                        node: node,
                        message: ERROR_MSG_DUPLICATE_ID,
                    });
                }
            },
        };
    },
};
