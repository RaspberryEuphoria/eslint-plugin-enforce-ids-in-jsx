const rule = require('../../../src/rules/missing-ids');
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

ruleTester.run('missing-ids', rule, {
    valid: [
        {
            code: '<div>This is not a form element, id is optional</div>',
        },
        {
            code: '<button id="awesomeButton"></button>',
        },
        {
            code: '<button name="submit" id="submitButton"></button>',
        },
        {
            code: '<input name="firstName" id="firstNameInput" />',
        },
        {
            code: '<input name="firstName" type="text" id="firstNameInput" />',
        },
    ],
    invalid: [
        {
            code: '<button></button>',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'button',
                        suggestionsText: 'button',
                    },
                },
            ],
        },
        {
            code: '<button name="submit"></button>',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'button',
                        suggestionsText: 'submitButton',
                    },
                },
            ],
        },
        {
            code: '<input name="firstName" />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: 'firstNameInput',
                    },
                },
            ],
        },
        {
            code: '<input name="firstName" type="text" />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: 'firstNameTextInput',
                    },
                },
            ],
        },
    ],
});
