# ember-range-utils

A utility for working around Ember-specific challenges when using ranges in an
Ember app.

## Installation

- `git clone` this repository
- `npm install`
- `bower install`

## Usage

In an Ember app, the HTMLBars rendering library will insert metamorph tags into
the DOM to track bindings. When doing low-level Range API manipulation, the
presence of these tags can make it difficult to connect the positional
information provided by the Range API to what the user actually sees on the
screen.

This utility provides a way of getting useful Range information that is usually
obscured by the presence of metamorph tags by (perhaps foolishly) assuming nodes
that satisfy `Node.nodeType === Node.TEXT_NODE && !node.textContent` are
metamorphs.

### rangeUtils

A set of range-specific functions.

#### `isFirstPosition(context: string = 'body'): Boolean`

Tells the programmer if the start of the user's selection is visually in the
first position of a given context.

Passing a context selector tells the function to stop checking whether the
selection is at the earliest possible position when it finds a matching element
as it traverses upwards in the DOM tree. This is useful if you want to see if
the selection is at the beginning of a `.Line`, for example.

```javascript
import rangeUtils from 'ember-range/lib/range-utils';
rangeUtils.isFirstPosition('.Line');
```

#### `isLastPosition(context: string = 'body'): Boolean`

Tells the programmer if the start of the user's selection is visually in the
last position of a given context.

Passing a context selector tells the function to stop checking whether the
selection is at the last possible position when it finds a matching element as
it traverses upwards in the DOM tree. This is useful if you want to see if the
selection is at the end of a `.Line`, for example.

```javascript
import rangeUtils from 'ember-range/lib/range-utils';
rangeUtils.isLastPosition('.Line');
```

### domUtils

A set of DOM-specific functions.

#### `getNonMetamorphChildren(node: Node): Array<Node>`

Returns an array of the non-metamorph children of a given node.

```javascript
import domUtils from 'ember-range/lib/dom-utils';
domUtils.getNonMetamorphChildren(node);
```

#### `isFirstChild(node: Node): Boolean`

Tells the programmer if the given node is the first child in a given context.
This function traverses upwards, and will return false if it reaches an ancestor
of the node that is not the first non-metamorph child of its parent.

```javascript
import domUtils from 'ember-range/lib/dom-utils';
domUtils.isFirstChild(node);
```

#### `isLastChild(node: Node): Boolean`

Tells the programmer if the given node is the last child in a given context.
This function traverses upwards, and will return false if it reaches an ancestor
of the node that is not the last non-metamorph child of its parent.

```javascript
import domUtils from 'ember-range/lib/dom-utils';
domUtils.isLastChild(node);
```

## Running Tests

- `ember test`
- `ember test --server`
