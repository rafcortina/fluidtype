# fluidtype

A library to scale the font size so that text fits optimally inside a container. It handles the window resizing and 
container resizing.

### Dependecies

None

### Build

npm run build

### Demo

npm run start

### How to use

Include the library in your page:

<script type="text/javascript" src="fluidtype.js"></script></body>

or 

require('./fluidtype');


To automatically adjust on  drags and window resize on elements:

fluidtype.start(elements, min, max);

To adjust an element once:

fluidtype.fluid(element, min, max);

