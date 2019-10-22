/**
 * @fileoverview Form elements must have an id
 * @author thmion
 */
'use strict'; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = {
  meta: {
    docs: {
      description: 'Form elements must have an id',
      category: 'Fill me in',
      recommended: false
    },
    fixable: 'code',
    // or "code" or "whitespace"
    schema: [// fill in your schema
    ],
    messages: {
      missingId: 'Form elements must have an id attribute. Suggestion: use [ {{ suggestionsText }} ].'
    }
  },
  create: function create(context) {
    var formElements = ['button', 'input', 'select', 'textarea', 'option'];

    var capitalizeWord = function capitalizeWord(word) {
      return word[0].toUpperCase() + word.substring(1);
    };

    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var _idAttribute$value, _idAttribute$value2, _idAttribute$value2$e, _idAttribute$value3, _idAttribute$value3$e;

        var sourceCode = context.getSourceCode();
        var nodeType = node.name.name;

        if (!formElements.includes(nodeType)) {
          return;
        }

        var idAttribute = node.attributes.find(function (_ref) {
          var name = _ref.name;
          return name.name === 'id';
        });
        var idAttributeValue = (idAttribute === null || idAttribute === void 0 ? void 0 : (_idAttribute$value = idAttribute.value) === null || _idAttribute$value === void 0 ? void 0 : _idAttribute$value.value) || (idAttribute === null || idAttribute === void 0 ? void 0 : (_idAttribute$value2 = idAttribute.value) === null || _idAttribute$value2 === void 0 ? void 0 : (_idAttribute$value2$e = _idAttribute$value2.expression) === null || _idAttribute$value2$e === void 0 ? void 0 : _idAttribute$value2$e.name) || (idAttribute === null || idAttribute === void 0 ? void 0 : (_idAttribute$value3 = idAttribute.value) === null || _idAttribute$value3 === void 0 ? void 0 : (_idAttribute$value3$e = _idAttribute$value3.expression) === null || _idAttribute$value3$e === void 0 ? void 0 : _idAttribute$value3$e.value);

        if (!idAttributeValue) {
          var _node$attributes$find, _node$attributes$find2, _node$attributes$find3, _node$attributes$find4;

          var nameAttributeValue = (_node$attributes$find = node.attributes.find(function (_ref2) {
            var name = _ref2.name;
            return name.name === 'name';
          })) === null || _node$attributes$find === void 0 ? void 0 : (_node$attributes$find2 = _node$attributes$find.value) === null || _node$attributes$find2 === void 0 ? void 0 : _node$attributes$find2.value;
          var typeAttributeValue = (_node$attributes$find3 = node.attributes.find(function (_ref3) {
            var name = _ref3.name;
            return name.name === 'type';
          })) === null || _node$attributes$find3 === void 0 ? void 0 : (_node$attributes$find4 = _node$attributes$find3.value) === null || _node$attributes$find4 === void 0 ? void 0 : _node$attributes$find4.value; // Push order matters for the output!
          // The output for `<foo type="bar" name="baz" />` should be nameTypeNode, ie. `bazBarFoo`

          var suggestions = [];

          if (nameAttributeValue) {
            suggestions.push(nameAttributeValue);
          }

          if (typeAttributeValue) {
            suggestions.push(typeAttributeValue);
          }

          suggestions.push(nodeType);
          var suggestionsText = suggestions.map(function (suggestion, i) {
            return i === 0 ? suggestion : capitalizeWord(suggestion);
          }).join('');
          context.report({
            node: node,
            messageId: 'missingId',
            data: {
              suggestionsText: suggestionsText
            },
            fix: function fix(fixer) {
              var _sourceCode$getLastTo = _slicedToArray(sourceCode.getLastToken(node).range, 2),
                  start = _sourceCode$getLastTo[0],
                  end = _sourceCode$getLastTo[1];

              return fixer.insertTextAfterRange([start - 1, end - 1], " id=\"".concat(suggestionsText, "\""));
            }
          });
        }
      }
    };
  }
};