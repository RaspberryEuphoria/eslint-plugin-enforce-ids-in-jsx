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
            code:
                '<div id="awesomeWrapper">This is not a form element, but id is still required because of targetCustom option</div>',
            options: [{ targetCustom: ['div'] }],
        },
        {
            code: '<button id="awesomeButton">Click me!</button>',
        },
        {
            code: "<button>Click me, I don't need an id!</button>",
            options: [{ target: ['none'] }],
        },
        {
            code: '<input id="firstNameInput" />',
        },
        {
            code: '<input id={"firstNameInput"} />',
        },
        {
            code: '<input name={name} type="checkbox" id={`${name}`} />',
        },
        {
            code: '<input name={name} type={type} id={`${name}${type}`} />',
        },
        {
            code:
                "<input name={`${main || 'Main'}${name || 'firstName'}`} type={type} id={`${main || 'Main'}${name || 'firstName'}${type}`} />",
        },
        {
            code: '<input type="text" {...rest} />',
            options: [{ priorityOverSpread: false }],
        },
        {
            code: '<select name="bestStarWarsMovie" id="bestStarWarsMovieSelect"></select>',
            options: [{ target: ['material'] }],
        },
        {
            code: '<select name="bestStarWarsMovie" id="bestStarWarsMovieSelect"></select>',
            options: [{ target: ['none'], targetCustom: ['select'] }],
        },
        {
            code: '<PaymentField id="moneyMaker" />',
            options: [{ targetCustom: ['PaymentField'] }],
        },
    ],
    invalid: [
        {
            code:
                '<div>This is not a form element, but id is still required because of targetCustom option</div>',
            options: [{ targetCustom: ['div'] }],
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'div',
                        suggestionsText: 'div',
                    },
                },
            ],
        },
        {
            code:
                '<div>This is not a form element, but id is still required because of targetCustom option</div>',
            options: [{ target: ['all'] }],
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'div',
                        suggestionsText: 'div',
                    },
                },
            ],
        },
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
        {
            code: '<input name="gender" type="radio" />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: 'genderRadioInput',
                    },
                },
            ],
        },
        {
            code: '<input name={name} type={type} />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: '${name}${type}Input',
                    },
                },
            ],
        },
        {
            code: '<input label={label} type={type} />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: '${label}${type}Input',
                    },
                },
            ],
        },
        {
            code: "<input name={`${main || 'Main'}${name || 'firstName'}`} type={type} />",
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: '${main || Main}${name || firstName}${type}Input',
                    },
                },
            ],
        },
        {
            code: '<input type="text" {...rest} />',
            errors: [
                {
                    messageId: 'missingId',
                    type: 'JSXOpeningElement',
                    data: {
                        nodeType: 'input',
                        suggestionsText: 'textInput',
                    },
                },
            ],
        },
    ],
});
