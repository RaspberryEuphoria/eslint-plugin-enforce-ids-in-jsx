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
        "enforce-ids-in-jsx/missing-ids": 2,
        "enforce-ids-in-jsx/unique-ids": 2,
    }
}
```

The names `"missing-ids"` and `"unique-ids"` are the names of [rules](#supported-rules) in ESLint. The first value is the error level of the rule and can be one of these values:

* `"off"` or `0` - turn the rule off
* `"warn"` or `1` - turn the rule on as a warning (doesn't affect exit code)
* `"error"` or `2` - turn the rule on as an error (exit code will be 1)

If you're using a linter in your CI process, you may want to set the error level to `1` for some time to prevent your pipeline from breaking immediatly.

The second value is an optional object to set options on the rule.

## <a name="supported-rules"></a> Supported Rules

- **missing-ids**: This rule will trigger when an element is missing an `id` attribute. By default, it will only target form elements, but you can adjust the options to target any element you need (React components included).

    > Why? This ensures that every form element in your layout can be identified easily.

    ```javascript
    // bad
    <input type="text" name="username" />
    <button type="submit">Submit me!</button>

    // good
    <input type="text" name="username" id="usernameTextInput" />
    <button type="submit" id="submitButton">Submit me!</button>
    ```

    Using the auto-fix feature will add an `id` based on the type of element (ie. input, button, select...), and on the `type` and `name` attributes if possible.  

    Options for this rule are:

    * `"target"`, an array that take values from this list: `all`, `form`, `material`, `none`. Default to `['form']`
    * * `all`: will trigger the rule on EVERY element
    * * `form`: will trigger the rule on basic form elements
    * * `material`: will trigger the rule on these Material components: "NativeSelect", "Select", "MenuItem", "Button", "IconButton", "Checkbox", "Radio", "Slider", "Switch", "TextField", "Input", "OutlinedInput", "Modal"
    * * `none`: will prevent the rule to trigger on any element except those defined in the second option, `customTarget`. Be careful, if `none` is defined in the `target` array, it will override the rest of the values!
    * `targetCustom`, an array that take any value you want (basic html elements, custom components, etc). Default to `[]`
    * `suggestionsEnabled`, a boolean. If set to true, the rule will provide a suggestion for an `id` and enable the auto-fix feature. **This is still experimental!**. Default to `false`
    * `priorityOverSpread`, a boolean. If set to false, the rule won't trigger on any element where there is a spread operator. It may be useful in case you're already using `{...rest}` to pass ids and don't want eslint to warn you about false-positives. Default to `true`

    Examples of configuration:
    ```javascript
        "enforce-ids-in-jsx/missing-ids": ['error', {
            target: ['form', 'material'],
            targetCustom: ['AddressField', 'CustomCheckbox', 'MoviesListContainer'],
            priorityOverSpread: false,
        }],
    ```

    ```javascript
        "enforce-ids-in-jsx/missing-ids": ['warning', {
            target: ['none'],
            targetCustom: ['ul', 'ol', 'header', 'footer', 'section'],
            priorityOverSpread: false,
        }],
    ```
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


