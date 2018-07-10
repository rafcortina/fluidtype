fluidtype
========================

A library to scale the font size so that text fits optimally inside a container. It handles the window resizing and 
container resizing.

Dependecies
------------

None

Build
------------

```bash
npm run build
```

Demo
------------

```bash
$ npm run start
```

Usage
------------

Include the library in your page:

<script type="text/javascript" src="fluidtype.js"></script>

or 

require('./fluidtype');


Automatically adjust elements on drags and window resize:

fluidtype.start(elements, min, max);

To adjust an element once:

fluidtype.fluid(element, min, max);

