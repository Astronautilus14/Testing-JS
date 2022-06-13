# Testing-JS
A testing library, designed for front-end javascript.

## Setup
Add the following tagg to the header of your HTML
```html
<script type="text/javascript" src="http://nautdevroome.nl/testing.js"></script>
```

When you have implemented you JS function like this
```js
function plus(a, b) {
   return a + b;
}
```

You can write a test case for it like this,as long as it ends on ```Test```
```js
function plusTest() {
   assertEquals(plus(1, 3), 4);
}
```

Now you will see the result of your test in the console
```
plusTest✅ Runtime≈0.400000ms
```

## Functions

### Before each
This will called before each testcase
```js
function beforeEach() {
  array = [];
  console.log('Ready!');
}
```

### After each
This will called before each testcase
```js
function beforeEach() {
  consol.log('I'm done!');
}
```

### Assert equals
Takes 2 arguments and compares them
```js
function plusTest() {
   assertEquals(4, 4);
}
```
When comparing 2 string and they are not, the fail message will indicate the first character that differs.

When comparing 2 arguments which are aqual, but have a different type, the fail message will show the types of the 2 arguments.

### Assert not equals
Takes 2 arguments and compares them
```js
function plusTest() {
   assertNotEquals(3, 4);
}
```

### Assert true
Takes 1 arguments checks if it is ``true`` or ``1``
```js
function plusTest() {
   assertTrue(1 == 1);
}
```

### Assert false
Takes 1 arguments checks if it is ``false`` or ``0``
```js
function plusTest() {
   assertFalse(1 == 2);
}
```
