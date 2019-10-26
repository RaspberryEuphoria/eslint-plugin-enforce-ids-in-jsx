/**
 * Capitalize a word by making the first letter uppercase
 *
 * @param {String} word The worde to capitalize
 * @returns {String} The capitalized word
 */
export const capitalizeWord = word => word[0].toUpperCase() + word.substring(1);

/**
 * Get a node attribute by its name
 *
 * @param {Object} node The target node
 * @param {String} attrName The name of the attribute
 * @returns {Object} The attribute
 */
export const getAttribute = (node, attrName) =>
    node.attributes.find(attr => attr?.name?.name === attrName);

/**
 * Get an attribute value
 * If it's a literal, it will be returned as is
 * Otherwise if it's an identifier, it will be returned formatted
 *
 * @param {Object} attr The attribute
 * @returns {String} The attribute value
 */
export const getAttributeValue = attr => {
    // This is an identifier: <input attr={foo} />
    if (attr?.value?.expression?.name) {
        return '${' + attr.value.expression.name + '}';
    }

    // This is an identifier inside a template: <input attr={`${foo}`} />
    if (attr?.value?.expression?.expressions?.length) {
        const expressions = attr.value.expression.expressions
            .map(expression => {
                if (expression.type === 'Identifier') {
                    return '${' + expression.name + '}';
                } else if (expression.type === 'LogicalExpression') {
                    return (
                        '${' +
                        (expression.left.name || expression.left.value) +
                        ' ' +
                        expression.operator +
                        ' ' +
                        (expression.right.name || expression.right.value) +
                        '}'
                    );
                }
            })
            .join('');

        return expressions;
    }

    /*
        This is either a literal or a template element:
        <input attr="foo" /> or
        <input attr={"foo"} /> or
        <input attr={`foo`} />
    */
    return (
        attr?.value?.value ||
        attr?.value?.expression?.value ||
        attr?.value?.expression?.quasis?.[0]?.value?.raw
    );
};
