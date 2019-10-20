const rule = require('../../../src/rules/ids-on-form-elements');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});

const ERROR_MSG_MISSING_ID = 'Form elements must have an id attribute.';

const ruleTester = new RuleTester();

ruleTester.run('ids-on-form-elements', rule, {
    valid: [
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
                        suggestionsText: 'firstNameTextInput',
                    },
                },
            ],
        },
    ],
});
