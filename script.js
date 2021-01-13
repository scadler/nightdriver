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
    x: 0,
    curve: 0,
    arc: 0,
    maxArc: 0,
}
function drawRect(x,y,w,h,rgb){
    ctx.fillStyle = rgb
    ctx.fillRect(x, y, w, h);
}
function arc(){
    if(path.arc > path.maxArc - 0.003 || path.arc < path.maxArc + 0.003){
        if(path.arc > path.maxArc){
            path.arc -= 0.003
        }
        else{
            path.arc += 0.003
        }
    }
}
function generateWalls(){
    
    var i = walls[0].length
    var n = 9
        while(i < n){
            walls[0][i] = 550
            walls[1][i] = 600-(i*(600/n))
            i++
        }
}
function drawWalls(){
    drawRect(0,0,1100, 700, "#000000")
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
   
             if(path.curve < 0){
                path.curve += 1
            }
            else if(path.curve > 0){
                path.curve -= 1
            }
            else if(path.curve === 0){
                if((Math.random()-0.5>0)){
                    
                    if(Math.random()-0.5>0){
                        path.maxArc = 10+Math.floor(Math.random()*30)
                        path.curve = Math.abs(path.maxArc) + Math.floor(Math.random()*20)
                    }
                    else{
                        path.maxArc = -10-Math.floor(Math.random()*30)
                        path.curve = Math.abs(path.maxArc) + Math.floor(Math.random()*20)
                    }
                }
                else{
                    path.curve = Math.abs(path.maxArc)+Math.floor(Math.random()*20)
                    path.maxArc = 0

                }
            }
            
        }
                 arc()
        car.x -= (path.arc/200)*(car.speed/1.5)
        i++
        
    }
}
function drawBackground(){
    drawRect(547,33,6, 6, "#FFFFFF")
    drawRect(753,33,6, 18, "#FFFFFF")
    drawRect(341,33,6, 18, "#FFFFFF")
    // drawRect(400,670,300, 50, "#FFFFFF")
    drawRect(550+ (car.deltaX*100) - 3,39,6, 6, "#FFFFFF")

}
function update(){
    car.x += car.deltaX*(car.speed/1.5)
}
var $mouseX=0
$(parentDiv).mousemove(function(e) {
    if(e.pageX > 750){
        car.deltaX = 2
    }
    else if(e.pageX < 350){
        car.deltaX = -2
    }
    else{
        car.deltaX = -(550 -e.pageX)/100
    }
    }
);
document.addEventListener('keydown', keyPressed)
function keyPressed(e){
    key = e.key
    if (key == "w") {
        if(car.speed < 3.6){
            car.speed += 0.03
        }
        else{
            car.speed = 3.6
        }
        $("#speed").text(Math.floor(car.speed * 50))
    }
    else if (key == " " || key == "s") {
        e.preventDefault();
        if(car.speed > 0.03){
            car.speed -= 0.03
        }
        else{
            car.speed = 0
        }
        $("#speed").text(Math.round(car.speed * 50))
    }
  }
function game(){
    generateWalls()
    drawWalls()
    drawBackground()
    update()
}

setInterval(game,)