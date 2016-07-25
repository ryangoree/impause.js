# impause.js
Pause, resume, and navigation manipulation for [impress.js.](https://github.com/impress/impress.js)

I had a few use cases for hijacking the navigation controls during certain steps for sub interactions and duration changes that needed more than the `.impress-on`, `.active`, and `.present` classes, so I created impause.js.

It adds a `pause()` and `resume()` function to the API on initialization as well as a `paused` property to check the state. You can also assign new functions to the next and previous keys.

### Disable Keyboard Navigation.
```javascript
impress().pause()
```
or
```javascript
var api = impress();
api.pause()`
```

### Assign New Functions to the Next and Previous Keys
```javascript
api.pause().next(function() {
    // run some new code when the next keys are hit
}
api.pause().prev(function() {
    // run some new code when the previous keys are hit
}
```

### Return Navigation Back to Normal
```javascript
api.resume();
```

### Example For Changing Durtation Between Specific Steps
```html
<script src="js/impress.js"></script>
<script src="js/impause.js"></script>
<script>
    var api = impress();
    api.init();
    
    document.addEventListener('impress:stepenter', function(event) {
        if (event.target.id === 'step-2') {
            api.pause().next(function() {
                api.goto('step-3', 500);
                api.resume();
              });
    }, false);
</script>
```
