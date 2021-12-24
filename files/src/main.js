const canvas = document.createElement("canvas");
const c = canvas.getContext("2d");

document.getElementById("canvas_wrap").appendChild(canvas);

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight

c.fillRect(0,0,w,h);
c.fillStyle = "#09c"
c.fillRect(20, 20, 20, 20);
	
class Game {

	constructor(label){
		this.name = label || "Un juegardo";

		this._createListeners();
	}

	_createListeners(){
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
		document.addEventListener("mousedown", this._onMouseDown);
    	canvas.addEventListener("touchstart", this._onMouseDown);
	}

	_onMouseDown(event) {
		event.preventDefault();
		let mouseY, mouseX;
		if (event.changedTouches) {
			//this._startY = event.changedTouches[0].clientY;
			mouseY = event.changedTouches[0].clientY;
			mouseX = event.changedTouches[0].clientX;

		} else {
			//this._startY = event.clientY;
			mouseY = event.clientY;
			mouseX = event.clientX;
		}

		//this._rect(Math.random()*200, Math.random()*500);
		this._rect(mouseX, mouseY);
		console.log("this down event worked");
		document.addEventListener("mousemove", this._onMouseMove);
		canvas.addEventListener("touchmove", this._onMouseMove);
		document.addEventListener("mouseup", this._onMouseUp);
		document.addEventListener("touchend", this._onMouseUp);
	}

	_onMouseMove(event) {
		event.preventDefault();
		//const mult = (this._max - this._min) / this._sensitivity;
		let mouseY, mouseX;
		if (event.changedTouches) {
			mouseY = event.changedTouches[0].clientY;
			mouseX = event.changedTouches[0].clientX;
		} else {
			mouseY = event.clientY;
			mouseX = event.clientX;
		}
		c.fillStyle = "#09c"
		c.fillRect(mouseX, mouseY, 20, 20);
	}
	
	_onMouseUp() {
		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("touchmove", this._onMouseMove);
		canvas.removeEventListener("touchmove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
		document.removeEventListener("touchend", this._onMouseUp);
	}

	_rect(x, y){
		c.fillStyle = "#09c"
		c.fillRect(x, y, 20, 20);	
	}
}

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const elves = new Game("Elves");

const p = new Rectangle();

