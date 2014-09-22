rowt is a Javascript route parsing utility for use in browsers and node environments.


# Install

For node:

`npm install rowt --save`
or
`npm install rowt --save-dev`

For browsers:

`bower install rowt --save`


# Use

### Node

```js
var Route = require("rowt").Route;

var route = new Route("/path/to/something/:param/:optionalParam");

route.match("/path/to/something/123");
// === { param: 123, optionalParam: undefined }

route.match("/something/that/won't/match");
// === false

route.fill({ param: 123, optionalParam: 456 });
// === "/path/to/something/123/456"

route.fill({ param: 123 });
// === "/path/to/something/123"

route.fill({ optionalParam: 456 });
// === false
```

### Browser

```html
<script src="rowt.js"></script>
<script>

    // Route constructor becomes global
    var route = new Route("/path/to/something/:param/:optionalParam");

    // do all the same stuff
    route.match("/path/to/something/123");
    // === { param: 123, optionalParam: undefined }

    // etc...

</script>
```


# Future

rowt is not a router. Maybe someday I'll write rowter.