
var collection = [];
var init = false;

var units = "px";
function setOptimalFontSize(elem, minFontSize, maxFontSize)
{
    
    var elemRect = elem.getClientRects()[0];

    var helper = elem.cloneNode(true);

    elem.parentElement.appendChild(helper);

    helper.style.height = "";
    helper.style.visibility = "hidden";
    helper.style.backgroundColor = "green";

    var iterCount = 0;
    var fontSize = parseInt(getComputedStyle(elem).getPropertyValue("font-size"), 10);
   	if(isNaN(fontSize))
   		fontSize = minFontSize;

   	helper.style.fontSize = fontSize + units;

   	var helperRect = helper.getClientRects()[0];

    // Increase font size until the height is greater than the target's height.
    while ((fontSize < maxFontSize) && (helperRect.height <= elemRect.height))
    {
    	iterCount += 1;	
        fontSize += 5;
        helper.style.fontSize = fontSize + units;
        helperRect = helper.getClientRects()[0];
    }

    // Now we have an upper bound and we decrease the font-size until the height is less or equal to the target's height.
    while ((fontSize > minFontSize) && (helperRect.height > elemRect.height))
    {
    	iterCount += 1;		
        fontSize -= 1;
        helper.style.fontSize = fontSize + units;
        helperRect = helper.getClientRects()[0];
    }

    // Now we try to get closer to the height by using smaller increments
    while ((fontSize > minFontSize) && (helperRect.height < elemRect.height))
    {
    	iterCount += 1;		
        fontSize += 0.1;
        helper.style.fontSize = fontSize + units;
        helperRect = helper.getClientRects()[0];
    }

    fontSize -= 0.1;
    
    // Let's make sure the width is not greater than the target's height.
    while ((fontSize > minFontSize)  && (helperRect.width > elemRect.width))
    {
    	iterCount += 1;	
        fontSize -= 1;
        helper.style.fontSize = fontSize + units;
        helperRect = helper.getClientRects()[0];
    }

    elem.style.fontSize = fontSize + units;

    helper.remove();
    console.log("Iteration count: " + iterCount);
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

function findItem(elem) {

	for (var index in collection) {

		if (elem === collection[index].elem) {
			return collection[index];
		}
	}

	return null;
}

function observe(records) {

	var record = records[0];

	var item = findItem(record.target);

	if (item) {
		processItem(item);
	}
}

var _config = {attributes: true, childList: false, subtree: false};
var _observer = new MutationObserver(observe);

function fluid(elements, min, max) {

	if (!init) {
		window.addEventListener("resize", onResize);
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

		_observer.observe(elem, _config);
	}
}


module.exports = {
	fluid
};