# HTX

HTML transformation via a CSS-like declarative Objects


## About
HTX is designed to facilitate transforming existing HTML into new/larger/fancier HTML using JS Objects to define transformations. The initial spark of an idea credit is due to [pure.js](https://beebole.com/pure/), but htx is much smaller and simpler. Despite its small size, HTX can add new content, modify existing content, and remove existing content with primitive declarative instructions. 


### Possible Applications
The small size and flexible input options open a wide range of suitable uses including:

 * Turning [pretty HTML into Bootstrap](http://pagedemos.com/mpyyt8fv4yuj/) View Components
 * Transitioning content to a new theme
 * Previewing markup changes without affecting production sites
 * Virtual DOM update notation: find DOM differences, make an HTX list of patches, apply
 * Content template engine - ship an empty shell in HTML, fill dynamically from JS
 * [Data-binding framework core](http://pagedemos.com/ku3mehsfpqsk/) - easily apply values from remote data to many DOM destinations


### Install / Setup
HTX is on NPM and Bower:
 `npm install htx` - or - `bower install htx`

You can also load the script manually from any html page:
 `<script src=htx.js></script>` 
 
There are no dependancies and the only requirement is ES5.

### Usage
`htx(directives, rootElement);`


## Directives (akin to sheets)
Array of objects or just one object, keys are CSS selectors
```js
{
    h3: e=>a.length + " animals total",

       li: e=>a.map((e,i)=>({
            innerHTML:    e.name.big(), 
            className: "text-danger",
            title:     "#"+(i+1)
        })),

      'li big': e=>({ 
            className: Math.random
        }) 
}

```

### Directive Keys (akin to selectors)
CSS selectors for the rules

```js
"li:nth-child(2)"

```


### Directive Values (akin to rules)
A collection of key:value pairs, or a string of content, an array of new clone's content/props, or a function that returns one of those values.


### Rule Functions
```js
h3: e=> data.animals.length + " animals total", // returns a string to set content
```
Functions simply return one of the value types below in a late-run fashion.


### Rule String
```js
"h3.status": "Ready", // a string sets content
```
Strings simply define the content of any element(s) the key matches.


### Rule Arrays
```js
option: ["M", "T", "W", "R", "F"], // populate select with days
```

Arrays clone the matched element(s) and append one for each element of the array. If the array is an Array of Strings, the clone's content will be set by the string. If it's an Array of Objects, the rule objects procedure is applied to each clone.


## Rule Objects
Rule objects define one or more transformations on the same matched selector elements. Like rule key selectors, rule object property keys point to specific properties or attributes, with a couple enhancements as well. Like rule values, the type of the rule object property value determines its effect on the match element(s).


### Rule Object Keys (akin to property)
Name a property of the element, with two special additions: a `+` suffix will cause the value to be appended (as a string or added as a number on content/attribs), while a `@` prefix will set an attribute with the property. Using both (`@attribute+`) appends an attribute with the value.


### Rule Object Values (akin to value)
Must be a Function, Number, String, or Boolean. Objects will be assessed using `.toString()`.


### Function Rule Object Values
Defines events for keys like `onclick` and provides lambda for non-events. Use functions for events as properties, not as attributes. If you want to bind event attributes, use a string because functions are treated as lambda when attributes (@) are detected.


```js
{//    key        value    
    "@title":    (x, index)=> "Element #"+index,
    onclick: function(e){ alert("Clicks work!"); },
}
```

### Array Rule Object Values
Define arguments to pass to an element method, and are only valid in that context.


```js
"scrollIntoView":    [true, true]
```

### String/Number Rule Object Values
Set or append properties and attributes.


```js
{//    key        value    
    "@title":    "Sets title attribute to this text",
    className:    "class tokens go here",
    "value+":    " appends to value property",
    "selectedIndex+": 1 // move to next option in a select
}
```

### Boolean Rule Object Values
Controls boolean properties and attribs. In attribute mode, it will remove an attrib if `false` and set the attrib to `""` if true. For properties, it will simple set the property to the value.

```js
{//    key        value    
    "@disabled":    true, // sets disabled=""
    "@readonly":    false, // removes the readonly attrib
    hidden:    true // hides the element using the hidden DOM4 property
}
```
