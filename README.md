# eslint-plugin-enforce-ids-in-jsx

This is a small collection of ESLint rules to improve usage of id attributes in your markup.

## Table of Contents

1. [Why should I (or my team) use it?](#why-should-i-use-it)
2. [Installation](#installation)
3. [Usage](#usage)
3. [Supported rules](#supported-rules)


## <a name="why-should-i-use-it"></a> Why should I (or my team) use it?

These rules will help you in using `id` attributes consistently in your html or jsx markup. This is helpful for writing unit and end-to-end testing, as having unique identifiers on the dom makes it easier to target elements.

## <a name="installation"></a> Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-enforce-ids-in-jsx`:

```
$ npm install eslint-plugin-enforce-ids-in-jsx --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-enforce-ids-in-jsx` globally.

## <a name="usage"></a> Usage

Add `enforce-ids-in-jsx` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "enforce-ids-in-jsx"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "enforce-ids-in-jsx/rule-name": 2
    }
}
```

## <a name="supported-rules"></a> Supported Rules

### ids-on-form-elements

### ids-on-form-elements





