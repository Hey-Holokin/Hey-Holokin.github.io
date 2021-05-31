//JavaScript interpreter for Karma, the Turing Tarpit programming language by revcompgeek.
//The instruction set and further specification for this programming language is available at: https://esolangs.org/wiki/Karma
//Program by Holokin, licensed under Creative Commons Attribution Share-Alike (CC BY-SA) v4.0.
//To operate, create two elements: A <textarea> with the ID "karma-in" containing the program, and a text element with the ID <karma-out>. Then, simply call the interpretKarma() function from wherever you wish.
//TODO: Switch to keydown event type for processing of ? instruction, program functional key handler.

let input;
let output;
let stack;
let deque;
let gridLine;
let gridPosList;
let exitMessage;
let awaitInput;
let error;
let terminate;
let interpretKarma = function() {
	//Set default values for Karma core
	input = document.getElementById("karma-in").value.split("\n");
	output = document.getElementById("karma-out");
	output.innerHTML = "";
	stack = [];
	deque = [];
	gridLine = 0;
	gridPosList = [];
	exitMessage = "";
	awaitInput = false;
	error = false;
	terminate = false;
	for (let i=0; i<input.length; i++) {
		gridPosList.push(0);
	}
	
	//Enter loop
	while (gridPosList[gridLine] < input[gridLine].length && !awaitInput) {
		let inputChar = input[gridLine][gridPosList[gridLine]]
		
		readKarmaCommand(inputChar);
		
		if (terminate || awaitInput) break;
	}
};
let readKarmaCommand = function(inputChar) {
	let pNum = 0;
	switch (inputChar) {
		//Operands [COMPLETE]
		case '+': {	//Pop A, pop B, push A+B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] + stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '-': {	//Pop A, pop B, push A-B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] - stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '*': {	//Pop A, pop B, push A*B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] * stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '/': {	//Pop A, pop B, push A/B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = Math.floor(stack[stack.length-1] / stack[stack.length-2]);
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '%': {	//Pop A, pop B, push A%B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] % stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '&': {	//Pop A, pop B, push A&B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] & stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '|': {	//Pop A, pop B, push A|B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] | stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '^': {	//Pop A, pop B, push A^B
			if (stack.length < 2) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1] ^ stack[stack.length-2];
			stack.pop();
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '~': {	//Pop A, push ~A
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1];
			stack.pop();
			stack.push(pNum);
			break;
		}
		case '!': {	//Pop A, push !A
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1];
			stack.pop();
			stack.push(pNum);
			break;
		}
		//Logic [COMPLETE]
		case '=': {	//Pop A, push 1 if A is equal to front of deque, else push 0
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1];
			stack.pop();
			if (pNum == deque[0]) stack.push(1);
			else stack.push(0);
			break;
		}
		case '>': {	//Pop A, push 1 if A is greater than front of deque, else push 0
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1];
			stack.pop();
			if (pNum == deque[0]) stack.push(1);
			else stack.push(0);
			break;
		}
		case '@': {	//Pop A, skip next command if A is not 1
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			pNum = stack[stack.length-1];
			stack.pop();
			if (pNum != 1) gridPosList[gridLine]++;
			break;
		}
		//Stack/Deque [COMPLETE]
		case '0':	//Push digit 0
		case '1':	//Push digit 1
		case '2':	//Push digit 2
		case '3':	//Push digit 3
		case '4':	//Push digit 4
		case '5':	//Push digit 5
		case '6':	//Push digit 6
		case '7':	//Push digit 7
		case '8':	//Push digit 8
		case '9': {	//Push digit 9
			stack.push(parseInt(inputChar));
			break;
		}
		case '}': {	//Pop A, insert A at front of deque
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			deque.unshift(stack[stack.length-1]);
			stack.pop();
			break;
		}
		case '{': {	//Remove A from front of deque, push A
			if (deque.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Deque underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			stack.push(deque[0])
			deque.shift();
			break;
		}
		case '[': {	//Pop A, insert A at back of deque
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			deque.push(stack[stack.length-1]);
			stack.pop();
			break;
		}
		case ']': {	//Remove A from back of deque, push A
			if (deque.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Deque underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			stack.push(deque[deque.length-1]);
			deque.pop();
			break;
		}
		case '#': {	//Pop A
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			stack.pop();
			break;
		}
		case '\\':{	//Clone top of stack
			stack.push(stack[stack.length-1]);
			break;
		}
		//I/O [COMPLETE]
		case '?': {	//Await character input I, push I as number
			awaitInput = true;
			break;
		}
		case ':': {	//Pop A, print A as character
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			output.innerHTML += String.fromCharCode(stack[stack.length-1]);
			stack.pop();
			break;
		}
		case ';': {	//Pop A, print A as number
			if (stack.length == 0) {
				terminate = true;
				exitMessage = "ERROR: Stack underflow. Program terminated at line " + gridLine + ".";
				break;
			}
			output.innerHTML += stack[stack.length-1];
			stack.pop();
			break;
		}
		//Jumps [COMPLETE]
		case '<': {	//Move to beginning of line
			gridPosList[gridLine] = -1;
			break;
		}
		case ',': {	//Go down one line, start at beginning
			gridPosList[gridLine] ++;
			gridLine++;
			console.log(gridLine+" "+input.length);
			if (gridLine >= input.length) {
				terminate = true;
				exitMessage = "ERROR: Line index out of bounds. Line " + gridLine + " does not exist.";
				break;
			}
			gridPosList[gridLine] = -1;
			break;
		}
		case '.': {	//Go down one line, continue line progression
			gridPosList[gridLine] ++;
			gridLine++;
			if (gridLine >= input.length) {
				terminate = true;
				exitMessage = "ERROR: Line index out of bounds. Line " + gridLine + " does not exist.";
				break;
			}
			gridPosList[gridLine] -= 1;
			break;
		}
		case '\'':{	//Go up one line, continue line progression
			gridPosList[gridLine] ++;
			gridLine--;
			if (gridLine < 0) {
				terminate = true;
				exitMessage = "ERROR: Line index out of bounds. Line " + gridLine + " does not exist.";
				break;
			}
			gridPosList[gridLine] -= 1;
			break;
		}
		//Unrecognized [COMPLETE]
		default:  {	//Throw error
			terminate = true;
			exitMessage = "ERROR: Unrecognized command. Program failed to execute, line " + gridLine + ", character " + gridPosList[gridLine]  + ".";
			break;
		}
	}
	
	if (terminate) {
		output.innerHTML += '\n\n<p style="color: red;">' + exitMessage + "</p>";
	} else {
		gridPosList[gridLine]++;
		
		if (gridPosList[gridLine] < input[gridLine].length) {
			if (awaitInput) {
				let getch = function(e) {
					stack.push(e.keyCode);
					readKarmaCommand(input[gridLine][gridPosList[gridLine]]);
					document.removeEventListener("keypress", getch);
					awaitInput = false;
				}
				document.addEventListener("keypress", getch);
			} else {
				readKarmaCommand(input[gridLine][gridPosList[gridLine]]);
			}
		} else {
			output.innerHTML += '\n\n<p style="color: blue;">Program exit. Program successfully executed, line ' + gridLine + ".";
		}
	}
}
