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
                    message: ERROR_MSG_MISSING_ID + ' Suggestion: use "button".',
                    type: 'JSXOpeningElement',
                },
            ],
        },
        {
            code: '<button name="submit"></button>',
            errors: [
                {
                    message: ERROR_MSG_MISSING_ID + ' Suggestion: use "submitButton".',
                    type: 'JSXOpeningElement',
                },
            ],
        },
        {
            code: '<input name="firstName" />',
            errors: [
                {
                    message: ERROR_MSG_MISSING_ID + ' Suggestion: use "firstNameInput".',
                    type: 'JSXOpeningElement',
                },
            ],
        },
        {
            code: '<input name="firstName" type="text" />',
            errors: [
                {
                    message: ERROR_MSG_MISSING_ID + ' Suggestion: use "firstNameTextInput".',
                    type: 'JSXOpeningElement',
                },
            ],
        },
    ],
});
