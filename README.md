# Ember-power-select-typeahead

Naive implementation of a typeahead component on top of ember-power-select.


Compatibility
------------------------------------------------------------------------------

* Versions below 0.7.4 work in 2.12+
* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

## Installation

```
ember install ember-power-select-typeahead
```

## Usage

With simple strings:

```hsb
<PowerSelectTypeahead @search={{action 'searchAsync'}} @selected={{selected}} @onChange={{action (mut selected)}} as |number|>
  {{number}}
<PowerSelectTypeahead>
```

With complex objects:

```hsb
<PowerSelectTypeahead @search={{action 'searchAsync'}} @selected={{selected}} @extra={{hash labelPath="name"}} @onChange={{action (mut selected)}} as |user|>
  {{user.name}}
</PowerSelectTypeahead>
```
***Note: See API reference for ember-power-select for additional options you can pass to ember-power-select-typeahead***
- http://ember-power-select.com/docs/api-reference

## Styles

In your app's stylesheet, you must import the built-in styles in this order:

```css
/*
your custom variables goes here
*/

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

@import 'ember-power-select';
@import 'ember-power-select-typeahead';
```
