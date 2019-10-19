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

const ERROR_MSG_DUPLICATE_ID = "You can't use the same id more than once.";

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
                    message: ERROR_MSG_DUPLICATE_ID,
                    type: 'JSXOpeningElement',
                },
            ],
        },
    ],
});
