const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var walls = [[],[]]
var car = {
    speed: 0,
    x: 0,
    deltaX: 0,

}
function drawRect(x,y,w,h,rgb){
    ctx.fillStyle = rgb
    ctx.fillRect(x, y, w, h);
}
function generateWalls(){
    var i = walls[0].length
    //var n = # of walls
    var n = 9
    while(i < n){
        walls[0][i] = 350
        walls[1][i] = 600-(i*(600/n))
        i++
    }
}
function drawWalls(){
    var i = 0
    var scale = 600
    while(i < walls[0].length){
        width = 5 + (7 / (scale/walls[1][i]))
        leftx = (walls[0][i] + car.x) - (300 / (scale/walls[1][i])) + width
        rightx = (walls[0][i] + car.x) + (300 / (scale/walls[1][i]))
        drawRect(leftx,walls[1][i], width, width*2, "#FFFFFF")
        drawRect(rightx,walls[1][i], width, width*2, "#FFFFFF")
        walls[1][i]+= car.speed
        if(walls[1][i] > 700){
            walls[0].splice(i,1)
            walls[1].splice(i,1)
        }
        i++
    }
}
function drawBackground(){
    drawRect(0,0,canvas.height, canvas.width, "#000000")
    drawRect(345,30,10, 10, "#FFFFFF")
    drawRect(car.x - 5,40,10, 10, "#FFFFFF")
    console.log(car.x)

}
function update(){
    car.x += car.deltaX
}
var $mouseX=0
$(canvas).mousemove(function(e) {
        car.x -=(350 -e.pageX)/100
        console.log(car.deltaX)
    }
);
document.addEventListener('keydown', keyPressed)
function keyPressed(e){
    key = e.key
    if (key == "w") {
        if(car.speed < 2.56){
            car.speed += 0.08
        }
        else{
            car.speed = 2.56
        }
        $("#speed").text(Math.round(car.speed * 100))
    }
    else if (key == " " || key == "s") {
        e.preventDefault();
        if(car.speed > 0.05){
            car.speed -= 0.08
        }
        else{
            car.speed = 0
        }
        $("#speed").text(Math.round(car.speed * 100))
    }
  }
function game(){
    generateWalls()
    drawWalls()
    drawBackground()
    update()
}

setInterval(game,)