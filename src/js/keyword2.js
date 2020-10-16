const DEBUG_MODE = "FALSE";

var divs = [];
var counter = 0;
var maxDivs = 300;
var bodyH, bodyW, words, lingo;

var words = ['function()', 'Debug.Print()', "for(i=0;i<length;i++)", 'var i', 'ASCII', 'Math.random()', 'abs()', 'block', 'bool', 'hasDedidcatedThread()', 'setup.exe', 'var me = new Person()', 'terminate()', 'abort()', 'acos()', 'asin()', 'ceil()', 'floor()', 'isalpha()', 'remove()', 'toupper()', 'modf()', '<html></html>', '$.ajax({})', 'int64', '$query', 'AI', 'crypt()', '===', '!==', 'empty()', 'operators', 'threading()', 'session_start', '$_GET["paramater"]', '$POST["password"]', 'hypertext', "color: black;", "font-family: Consolas", 'array_push()', 'array.push', 'array_map()', 'array_diff()', 'base64_decode', 'bcmod', 'bcpow', 'CachingIterator::count', 'new Date()', 'session_encode', 'shuffle()', 'sin', 'sizeOf', 'socket_bind', 'socket_accept', 'socket_sendto', 'DateTime::setDate', 'function()', 'Debug.Print()', "for(i=0;i<length;i++)", 'var i', 'ASCII', 'Math.random()', 'abs()', 'block', 'bool', 'hasDedidcatedThread()', 'setup.exe', 'var me = new Person()', 'terminate()', 'abort()', 'acos()', 'asin()', 'ceil()', 'floor()', 'isalpha()', 'remove()', 'toupper()', 'modf()', '<html></html>', '$.ajax({})', 'int64', '$query', 'AI', 'crypt()', '===', '!==', 'empty()', 'operators', 'threading()', 'session_start', '$_GET["paramater"]', '$POST["password"]', 'hypertext', "color: black;", "font-family: Consolas", 'array_push()', 'array.push', 'array_map()', 'array_diff()', 'base64_decode'];


//initially load n amount of particles
for(i = 0; i < maxDivs/3; i++) {
	newLingo();
}

//add additional particles on a set interval with initial delay
setTimeout(function(){
  setInterval(newLingo, 25);
  // requestAnimationFrame(newLingo);
}, 750);

function newLingo() {
	var buffer = 0; //as in margins
	bodyW = document.body.clientWidth;
	bodyH = document.body.clientHeight;

	counter++;
	lingo = getRandomValue(words);

	//convert less than symbol to HTML compliant
	var lthan = "<";
	var regi = new RegExp(lthan, 'g');
	lingo = lingo.replace(regi, '&lt;');

	//dynamically add div
	var div = document.createElement('div');
	div.id = 'div' + counter;
	div.classList.add('lingo');
	div.style.left = getRandomInt(buffer, (bodyW - div.style.width) -buffer) + 'px';
	div.style.top = getRandomInt(buffer, (bodyH - div.style.height)-buffer) + 'px';
	div.innerHTML = lingo;

	//set CSS animation properties
	div.style.setProperty('--init-x', div.style.left + 'px');
	div.style.setProperty('--init-y', div.style.top + 'px');
	var _destZ = getRandomInt(100,600);

	var quad = getQuandrantForElem(div);
	if (quad === 1) {
		div.style.setProperty('--dest-x', -50 + '%');
		div.style.setProperty('--dest-y', -50 + '%');
		div.style.setProperty('--dest-z', _destZ + 'px');
	}
	if (quad === 2) {
		div.style.setProperty('--dest-x', 50 + '%');
		div.style.setProperty('--dest-y', -50 + '%');
		div.style.setProperty('--dest-z', _destZ + 'px');
	}
	if (quad === 3) {
		div.style.setProperty('--dest-x', -50 + '%');
		div.style.setProperty('--dest-y', 50 + '%');
		div.style.setProperty('--dest-z', _destZ + 'px');
	}
	if (quad === 4) {
		div.style.setProperty('--dest-x', 50 + '%');
		div.style.setProperty('--dest-y', 50 + '%');
		div.style.setProperty('--dest-z', _destZ + 'px');
	}

	//add the div to the document and divs array
	document.body.appendChild(div);
	divs.push(div.id);
	log('divs count: ' + divs.length);
	log('width of word ' + lingo.length + ' width of div ' + div.clientWidth + ' height of div ' + div.clientHeight);
	if (divs.length > maxDivs) {
		//if the amount of divs is more than the max allowed specified above, delete the most recent first div applied to the document and divs array
		log('removing element: ' + divs[0]);
		var elem = document.getElementById(divs[0]);
		elem.parentNode.removeChild(elem);
		divs.shift();
		log('shifted count: ' + divs.length + ' first Index: ' + divs[0]);
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(array) {
 return array[Math.floor(Math.random()*array.length)];
}

// This should be refined and improved for accuracy.
function getQuandrantForElem(elem) {
	var result = 0;
	//the average width to word ratio is 8.75 (based on font-size). All elements (divs) have a height of 19
	var divDim = {'X' : elem.style.left.slice(0,-2), 'Y' : elem.style.top.slice(0,-2)};
	var buffer = 50;

	if (divDim.X >= (bodyW/2) - buffer) {
		if (divDim.Y >= (bodyH/2)) {
			result = 4;
		}
		if (divDim.Y <= (bodyH/2)) {
			result = 2;
		}
	}

	if (divDim.X <= (bodyW/2) - buffer) {
		if (divDim.Y >= (bodyH/2)) {
			result = 3;
		}
		if (divDim.Y <= (bodyH/2)) {
			result = 1;
		}
	}

	return result;
}

function log(text) {
	if (DEBUG_MODE === "TRUE") console.log(text);
}
