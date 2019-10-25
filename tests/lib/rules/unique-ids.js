const rule = require('../../../src/rules/unique-ids');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});

const ruleTester = new RuleTester();

ruleTester.run('unique-ids', rule, {
    valid: [
        {
            code:
                '<div><button id="awesomeButton"></button> <button id="anotherAwesomeButton"></button></div>',
        },
    ],
    invalid: [
        {
            code:
                '<div><button id="awesomeButton"></button><button id="awesomeButton"></button></div>',
            errors: [
                {
                    messageId: 'uniqueId',
                    type: 'JSXOpeningElement',
                    data: {
                        idAttributeValue: 'awesomeButton',
                    },
                },
            ],
        },
    ],
});
