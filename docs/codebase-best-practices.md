# Codebase Best Practices

## General JavaScript

In most cases, our [linter](how-to-setup-freecodecamp-locally.md#follow-these-steps-to-get-your-development-environment-ready) will warn of any formatting which goes against this codebase's preferred practice.

It is encouraged to use functional components over class-based components.

## JavaScript Style Guide

Please follow freeCodeCamp's JavaScript Style Guide. You can check out the [original guide](https://forum.freecodecamp.org/t/free-code-camp-javascript-style-guide/19121) posted to our [Discourse Forum](https://forum.freecodecamp.org/c/contributors/3).

### Indent

- Always use two spaces
- No hard tabs, ever. No really, just don’t do it.

### Curly Braces

Always use curly braces when using the keywords if/else/else if. This prevents a lot of ambiguity and will prevent syntax errors in some edge cases.

**Bad:**

```javascript
if (foo) bar();
```

**Good:**

```javascript
if (foo) {
  bar();
}
```

### Curly Braces Everywhere!

Use a space after `function` keyword, except in anonymous functions

**Good:**

```javascript
function foo() {}

var foo = function () {
  // ...
};
```

**Bad:**

```javascript
function foo() {
  // ...
}

var foo = function () {
  // ...
};
```

### Comments

- No inline comments
- Single space after `//`
- Do not use multiline comment `/* */`, we are reserving these for use with jsDocs.

### Keywords

- Space immediately after if, else, while, etc
- Opening curly brace should always be on the same line.

**Good:**

```javascript
if (true) {
  // do the thing
}
```

**Bad:**

```javascript
if (true) {
  // do the thing
}
```

### Else

Avoid else and “end early”. In JavaScript there is often a lot of indenting (usually when dealing with async code and named “callback hell”). Anything you can do to reduce the number of indents should be done. One thing is to avoid the [else](https://blog.timoxley.com/post/47041269194/avoid-else-return-early) keyword.

This also has the side effect of making code cleaner and easier to read.

**Bad:**

```javascript
someAsynFunc(function (err, data) {
  if (err) {
    callback(err);
  } else {
    // do stuff with data
  }
});
```

**Good:**

```javascript
someAsynFunc(function (err, data) {
  if (err) {
    return callback(err);
  }
  // do stuff with data
  // saves one indent
});
```

### Long Strings

Long multiline strings should be in one of two forms:

```javascript
var longString =
  'long strings should ' +
  'be in this form, with the ' +
  'operator ending the line.';
var foo = 'bar';
```

```javascript
var longString = [
  'long strings with variables such as ',
  foo,
  ' should ',
  'be in this form, an array of strings ',
  'that are joined with the join array instance method'
].join('');
```

…more to come

## Specific TypeScript

### Migrating a JavaScript File to TypeScript

#### Retaining Git File History

Sometimes changing the file from `<filename>.js` to `<filename>.ts` (or `.tsx`) causes the original file to be deleted, and a new one created, and other times the filename just changes - in terms of Git. Ideally, we want the file history to be preserved.

The best bet at achieving this is to:

1. Rename the file.
   - If the file uses the camel case naming convention (ex: `<fileName>.js`), please rename the file using the kebab case convention (ex: `<file-name>.ts`).
2. Commit with the flag `--no-verify` to prevent Husky from complaining about the lint errors
3. Refactor to TypeScript for migration, in a separate commit

> [!NOTE]
> Editors like VSCode are still likely to show you the file has been deleted and a new one created. If you use the CLI to `git add .`, then VSCode will show the file as renamed in stage

### Naming Conventions

#### Interfaces and Types

For the most part, it is encouraged to use interface declarations over type declarations.

React Component Props - suffix with `Props`

```typescript
interface MyComponentProps {}
// type MyComponentProps = {};
const MyComponent = (props: MyComponentProps) => {};
```

React Stateful Components - suffix with `State`

```typescript
interface MyComponentState {}
// type MyComponentState = {};
class MyComponent extends Component<MyComponentProps, MyComponentState> {}
```

Default - object name in PascalCase

```typescript
interface MyObject {}
// type MyObject = {};
const myObject: MyObject = {};
```

<!-- #### Redux Actions -->

<!-- TODO: Once refactored to TS, showcase naming convention for Reducers/Actions and how to type dispatch funcs -->

## Redux

### Action Definitions

```typescript
enum AppActionTypes = {
  actionFunction = 'actionFunction'
}

export const actionFunction = (
  arg: Arg
): ReducerPayload<AppActionTypes.actionFunction> => ({
  type: AppActionTypes.actionFunction,
  payload: arg
});
```

### How to Reduce

```typescript
// Base reducer action without payload
type ReducerBase<T> = { type: T };
// Logic for handling optional payloads
type ReducerPayload<T extends AppActionTypes> =
  T extends AppActionTypes.actionFunction
    ? ReducerBase<T> & {
        payload: AppState['property'];
      }
    : ReducerBase<T>;

// Switch reducer exported to Redux combineReducers
export const reducer = (
  state: AppState = initialState,
  action: ReducerPayload<AppActionTypes>
): AppState => {
  switch (action.type) {
    case AppActionTypes.actionFunction:
      return { ...state, property: action.payload };
    default:
      return state;
  }
};
```

### How to Dispatch

Within a component, import the actions and selectors needed.

```tsx
// Add type definition
interface MyComponentProps {
  actionFunction: typeof actionFunction;
}
// Connect to Redux store
const mapDispatchToProps = {
  actionFunction
};
// Example React Component connected to store
const MyComponent = ({ actionFunction }: MyComponentProps): JSX.Element => {
  const handleClick = () => {
    // Dispatch function
    actionFunction();
  };
  return <button onClick={handleClick}>freeCodeCamp is awesome!</button>;
};

export default connect(null, mapDispatchToProps)(MyComponent);
```

<!-- ### Redux Types File -->
<!-- The types associated with the Redux store state are located in `client/src/redux/types.ts`... -->

## Further Literature

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript with React CheatSheet](https://github.com/typescript-cheatsheets/react#readme)
