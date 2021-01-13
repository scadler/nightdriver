const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var walls = [[],[]]
var car = {
    speed: 0,
    x: 0,
    deltaX: 0,
}
var path = {
    x: 350,
    curve: 10,
    turn: 1,
    arc: 15,
    maxArc: 15,
}
function drawRect(x,y,w,h,rgb){
    ctx.fillStyle = rgb
    ctx.fillRect(x, y, w, h);
}
function arc(){
    if(path.arc!==path.maxArc){
        if(path.arc > path.maxArc){
            path.arc -= 1
        }
        else{
            path.arc +=1
        }
    }
}
function generateWalls(){
    var i = walls[0].length
    var n = 9
        while(i < n){
            walls[0][i] = path.x
            walls[1][i] = 600-(i*(600/n))
            i++
        }
}
function drawWalls(){
    drawRect(0,0,canvas.height, canvas.width, "#000000")
    var i = 0
    var scale = 600
    while(i < walls[0].length){
        width = 5 + (7 / (scale/walls[1][i]))
        leftx = (walls[0][i] + car.x + path.arc*Math.pow(2, (600-walls[1][i])/150)) - (300 / (scale/walls[1][i])) + width
        rightx = (walls[0][i] + car.x + path.arc*Math.pow(2, (600-walls[1][i])/150)) + (300 / (scale/walls[1][i]))
        drawRect(leftx,walls[1][i], width, width*2, "#FFFFFF")
        drawRect(rightx,walls[1][i], width, width*2, "#FFFFFF")
        walls[1][i]+= car.speed
        if(walls[1][i] > 700){
            walls[0].splice(i,1)
            walls[1].splice(i,1)
            arc()
             if(path.curve < 0){
                path.curve += 1
            }
            else if(path.curve > 0){
                path.curve -= 1
            }
            else if(path.curve === 0){
                if((Math.random()-0.5>0)){
                    console.log("turn")
                    path.curve = -8*Math.floor(Math.random()*8)
                    path.maxArc = Math.floor(Math.random*20)
                }
                else{
                    console.log("straight")
                    path.curve = 8*Math.floor(Math.random()*8)
                    path.maxArc = 0

                }
            }
        }
        i++
    }
}
function drawBackground(){
    drawRect(347,33,6, 6, "#FFFFFF")
    drawRect(350+ (car.deltaX*100) - 3,39,6, 6, "#FFFFFF")

}
function update(){
    car.x += car.deltaX
}
var $mouseX=0
$(canvas).mousemove(function(e) {
        car.deltaX = -(350 -e.pageX)/100
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