#jln.js
###a simple modular framework for JavaScript
*will continuously be extended*

____________
####How to embed:
- embed jln.js (core) **before all other modules**:
```html
<script src="./jln.js"></script>
```

- embed modules **after** the main *jln.js* file, e.g.:
```html
<script src="./modules/jln.$.js"></script>
```


####Check if a module is loaded:
```javascript
require(["jln.moduleA", "jln.moduleB", "..."]);
```
- If it is not embedded, it will be loaded via a **synchronous XMLHttpRequest** (or asynchronously if a callback function is specified)
- By passing the URL of the relevant file to `require()`, You can also load other modules such as *jQuery* this way.
