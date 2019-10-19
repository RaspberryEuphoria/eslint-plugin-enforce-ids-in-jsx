# eslint-plugin-enforce-ids-in-jsx

Help our QA :)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-enforce-ids-in-jsx`:

```
$ npm install eslint-plugin-enforce-ids-in-jsx --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-enforce-ids-in-jsx` globally.

## Usage

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

## Supported Rules

* Fill in provided rules here





