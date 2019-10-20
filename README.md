# eslint-plugin-enforce-ids-in-jsx

This is a small collection of ESLint rules to improve usage of id attributes in your markup.

## Table of Contents

1. [Why should I (or my team) use it?](#why-should-i-use-it)
2. [Installation](#installation)
3. [Usage](#usage)
3. [Supported rules](#supported-rules)


## <a name="why-should-i-use-it"></a> Why should I (or my team) use it?

These rules will help you in using `id` attributes consistently in your jsx markup. This is helpful for writing unit and end-to-end testing, as having unique identifiers on the dom makes it easier to target elements.

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

- **ids-on-form-elements**: This rule will trigger when a form element is missing an `id` attribute.

    > Why? This ensures that every form element in your layout can be identified easily.

    ```javascript
    // bad
    <input type="text" name="username" />
    <button type="submit">Submit me!</button>

    // good
    <input type="text" name="username" id="usernameTextInput" />
    <button type="submit" id="submitButton">Submit me!</button>
    ```

    [Not implemented yet] Using the auto-fix feature will add an `id` based on the type of element (ie. input, button, select...), and on the `type` and `name` attributes if possible.

- **unique-ids**: This rule will trigger when a form element is using an `id` already set on a previous element.

    > Why? This ensures that every element as an unique id and can't be confused with another element.

    ```javascript
    // bad
    <input type="text" name="favoriteCake" id="favorite" />
    <select name="favoriteGame" id="favorite"></select>

    // good
    <input type="text" name="favoriteCake" id="favoriteCakeTextInput" />
    <select name="favoriteGame" id="favoriteGameSelect"></select>
    ```

    :warning: Currently, this rule will only alert you on literal strings! Using a variable as an `id` will not raise any warning, at least for now.


