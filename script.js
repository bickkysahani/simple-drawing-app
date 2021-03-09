//7 parts
//initializing varibales and conditions
//global scope

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;

ctx.lineJoin = "round";
ctx.lineCap = "round";

var positionX,positionY;

//Element retrieval

var brush = document.getElementById("brush");
var eraser = document.getElementById("erase");
var size = document.getElementById("myRange");
var reset = document.getElementById("reset");
var savelink = document.getElementById("savelink");

// //set initial color conditions
var color = document.getElementById("myColor");
var myColor = color.value;
ctx.strokeStyle = myColor;



function colorChange(){
    myColor = color.value;
    ctx.strokeStyle = myColor;
}

//set initial size conditions 

var mySize = size.value;
ctx.lineWidth = mySize;

brush.style.border = "2px red solid";
canvas.style.cursor = "crosshair";

canvas.addEventListener("mousedown",brushDown,false);
canvas.addEventListener("mousemove",brushMove,false);
canvas.addEventListener("mouseup",brushUp,false);




function sizeChange(){
    mySize = size.value;
    ctx.lineWidth = mySize;
}



//2.Making brush work
function getCoordinates(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}


function brushDraw(canvas,positionX,positionY){
    if (mouse) {
        ctx.lineTo(positionX,positionY);
        ctx.stroke();
        canvas.style.cursor = "crosshair";
    }
}



function brushDown(e){
    mouse = true;
    var coordinates = getCoordinates(canvas, e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;
    ctx.beginPath();
    ctx.moveTo(positionX,positionY);
    ctx.lineTo(positionX,positionY);
    ctx.stroke();
}

function brushMove(e){
    var coordinates = getCoordinates(canvas, e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas,positionX,positionY);

}
function brushUp(){
    mouse = false;
    canvas.style.cursor="default";
}

function brushClick(){
    var brushColor = document.getElementById("myColor");
    ctx.strokeStyle = brushColor.value;
    brush.style.border = "2px solid red";
    eraser.style.border = "none";
    canvas.addEventListener("mousedown",brushDown,false);
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);


}
//3.Making the eraser work
function eraserClick(){
        ctx.strokeStyle = "white";
        eraser.style.border = "2px solid red";
        brush.style.border = "none";
        canvas.addEventListener("mousedown",brushDown,false);
        canvas.addEventListener("mousemove",brushMove,false);
        canvas.addEventListener("mouseup",brushUp,false);
 }
//making reset button work
function resetClick(){
    window.location.reload();
    //var brushColor = document.getElementById("myColor");
    //ctx.strokeStyle = brushColor.value;
}
function saveClick(){
    var data = canvas.toDataURL(); //takes screenshot and get URL of ss
    savelink.href = data;
    savelink.download = "screenshot.png";
}

//Event listener for tools
brush.addEventListener("click",brushClick);
eraser.addEventListener("click",eraserClick);
size.addEventListener("change",sizeChange);
reset.addEventListener("click",resetClick);
savelink.addEventListener("click",saveClick);
color.addEventListener("change",colorChange);