
var collection = [];
var init = false;

var units = "px";
function setOptimalFontSize(elem, minFontSize, maxFontSize)
{
    var elemRect = elem.getClientRects()[0];

    var helper = elem.cloneNode(true);

    elem.parentElement.appendChild(helper);

    //helper.style.visibility = "hidden";
    helper.style.backgroundColor = "green";

    var iterCount = 0;

    var computedStyle = getComputedStyle(elem);
    var fontSize = parseInt(computedStyle.getPropertyValue("font-size"), 10);
    var checkWidth = false;
    var whiteSpace = computedStyle.getPropertyValue("white-space");
    if (whiteSpace !== '' && whiteSpace !== 'normal')
        checkWidth = true;


   	if(isNaN(fontSize))
   		fontSize = minFontSize;

   	helper.style.fontSize = fontSize + units;

   	var helperRect = helper.getClientRects()[0];

    if (checkWidth) {

        helper.style.width = "";

        // Increase font size until the width is greater than the target's width.
        while ((fontSize < maxFontSize) && (helperRect.width <= elemRect.width))
        {
            iterCount += 1; 
            fontSize += 5;
            helper.style.fontSize = fontSize + units;
            helperRect = helper.getClientRects()[0];
        }

    }
    else {

        helper.style.height = "";

        // Increase font size until the height is greater than the target's height.
        while ((fontSize < maxFontSize) && (helperRect.height <= elemRect.height))
        {
            iterCount += 1; 
            fontSize += 5;
            helper.style.fontSize = fontSize + units;
            helperRect = helper.getClientRects()[0];
        }
    }

    helper.style.width = elem.style.width;
    helper.style.height = "";
    helperRect = helper.getClientRects()[0];

    // Now we have an upper bound and we decrease the font-size until the height is less or equal to the target's height.
    while ((fontSize > minFontSize) && (helperRect.height > elemRect.height))
    {
    	iterCount += 1;		
        fontSize -= 1;
        helper.style.fontSize = fontSize + units;
        helperRect = helper.getClientRects()[0];
    }

    if (checkWidth) {

        helper.style.width = "";
        helper.style.height = elem.style.height;
        helperRect = helper.getClientRects()[0];

        while ((fontSize > minFontSize) && (helperRect.width > elemRect.width))
        {
            iterCount += 1;     
            fontSize -= 1;
            helper.style.fontSize = fontSize + units;
            helperRect = helper.getClientRects()[0];
        }
    }
    else {

        helperRect = helper.getClientRects()[0];

        // Now we try to get closer to the height by using smaller increments
        while ((fontSize > minFontSize) && (helperRect.height < elemRect.height))
        {
            iterCount += 1;     
            fontSize += 0.1;
            helper.style.fontSize = fontSize + units;
            helperRect = helper.getClientRects()[0];
        }

        fontSize -= 0.1;
    }

    elem.style.fontSize = fontSize + units;

    helper.remove();
    //console.log("Iteration count: " + iterCount);
}


function processItem(item) {
	setOptimalFontSize(item.elem, item.min, item.max);
}


function onResize() {

	for (var index in collection) {

		var item = collection[index];
  		
  		if ((item.width != item.elem.clientWidth) || (item.height != item.elem.clientHeight)) {

  			item.width = item.elem.clientWidth;
  			item.height = item.elem.clientHeight;

  			processItem(item);
  		}
	}
}


var _mousedown = false;
function fluid(elements, min, max) {

	if (!init) {
		window.addEventListener("resize", onResize);
        
        window.addEventListener("mousedown", function(){
            _mousedown = true;
        }, false);

        window.addEventListener("mousemove", function(){
            if (_mousedown) {
                onResize();
            }
        }, false);

        window.addEventListener("mouseup", function(){
            _mousedown = false;
        }, false);

		init = true;
	}

	var numOfElem = elements.length;
	for (var i = 0; i < numOfElem; i++) {

		var elem = elements[i];

		var item = {
			elem: elem,
			min: min,
			max: max,
			width: elem.clientWidth,
			height: elem.clientHeight
		};

		collection.push(item);

		processItem(item);
	}
}


module.exports = {
	fluid
};