const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var walls = [[],[]]
var system = {
    time: 90,
    gameOver: false,
}
var car = {
    speed: 0,
    x: 0,
    deltaX: 0,
    crashCooldown: 0,
    score: 0,
    xx: 0,
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
            path.arc -= 0.003*(car.speed*0.7)
        }
        else{
            path.arc += 0.003*(car.speed*0.7)
        }
    }
}
function crash(){
    car.speed = Math.floor(car.speed*(100-(5*car.speed/1)))/100
    car.score = (Math.floor(car.score - (1.5*car.speed)) > 0) ? (Math.floor(car.score - (1.5*car.speed))): 0
    $("#speed").text(": "+Math.floor(car.speed * 50))
}
function generateWalls(){
    var i = walls[0].length
    var n = 20
        while(i < n){
            walls[0][i] = 542
            walls[1][i] = 700-(i*(600/n))
            i++
        }
}
function returnX(i){
    XL = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-walls[1][i])/150)) - (300 / (600/walls[1][i])) + 5 + (7 / (600/walls[1][i]))
    XR = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-walls[1][i])/150)) + (300 / (600/walls[1][i]))
    // bottom = (166.666 + car.x - path.arc*Math.pow(2, (600-700)/150)) - (300 / (600/700)) + 5 + (7 / (600/700))
    return [XL, XR]
}
function returnMaxMin(i){
    n = 20
    min = 700-((n-1)*(600/n))
    max = 700-(0*(600/n))
    maxXL = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-min)/150)) - (300 / (600/min)) + 5 + (7 / (600/min))
    maxXR = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-min)/150)) + (300 / (600/min))
    minXL = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-max)/150)) - (300 / (600/max)) + 5 + (7 / (600/max))
    minXR = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-max)/150)) + (300 / (600/max))
    return [maxXL, maxXR, minXL, minXR]
}
function drawWall(){
    smoothWall()
    ctx.strokeStyle = "#FFFFFF"
    var i=0
    while(i < walls[0].length){
        ctx.lineWidth = 2
        let x = returnX(i)
        let xNext = returnX(i+1)
            ctx.beginPath()
            ctx.lineTo(x[0],walls[1][i])
            ctx.lineTo(xNext[0],walls[1][i+1])
            ctx.stroke()
            ctx.beginPath()
            ctx.lineTo(x[1],walls[1][i])
            ctx.lineTo(xNext[1],walls[1][i+1])
            ctx.stroke()
        i++
    } 
}
function smoothWall(){
    n = 20
    minY = 700-(0*(600/n))
    maxY = 700-((n-1)*(600/n))
ctx.lineWidth = 2
    ctx.strokeStyle = "#FFFFFF"
    if(walls[0][n-1]){
        car.xx = returnX(n-1)
    }
    let x = car.xx
        let xx = returnX(0)
        let xM = returnMaxMin(n-1)
        console.log(Math.ceil((x[0]+x[1])/100000))
            ctx.beginPath()
            ctx.lineTo(xM[0],maxY)
            ctx.lineTo(x[0],walls[1][n-1])
            ctx.stroke()
            ctx.beginPath()
            ctx.lineTo(xM[1],maxY)
            ctx.lineTo(x[1],walls[1][n-1])
            ctx.stroke()
            ctx.beginPath()
            ctx.lineTo(xM[2],minY)
            ctx.lineTo(xx[0],walls[1][0])
            ctx.stroke()
            ctx.beginPath()
            ctx.lineTo(xM[3],minY)
            ctx.lineTo(xx[1],walls[1][0])
            ctx.stroke()
}

function drawWalls(){
    drawRect(0,0,1100, 700, "#000000")
    var i = 0
    var scale = 600
    while(i < walls[0].length){
        width = 5 + (7 / (scale/walls[1][i]))
        leftx = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-walls[1][i])/150)) - (300 / (scale/walls[1][i])) + width
        rightx = (walls[0][i] + car.x - path.arc*Math.pow(2, (600-walls[1][i])/150)) + (300 / (scale/walls[1][i]))
        if(walls[1][i] > 570 && car.crashCooldown < 0){
            if(rightx < 700 || leftx > 390){
                crash()
                car.crashCooldown = 300
            }
        }
        walls[1][i]+= car.speed
        if(walls[1][i] > 700){
            car.score += 1/3 +(Math.floor(car.speed*3)/30)
            $("#score").text(": "+Math.floor(car.score))
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
        car.x -= (path.arc/400)*(car.speed*0.6)
        i++
        car.crashCooldown -= 1
    }
}
function drawBackground(){
    drawRect(547,33,6, 6, "#FFFFFF")
    drawRect(753,33,6, 18, "#FFFFFF")
    drawRect(341,33,6, 18, "#FFFFFF")
    drawRect(550+ (car.deltaX*100) - 3,39,6, 6, "#FFFFFF")
}
function update(){
    car.x -= car.deltaX*(car.speed/1.5)
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
});
document.addEventListener('keydown', keyPressed)
function keyPressed(e){
    key = e.key
    if (key == "w" && !system.gameOver) {
        if(car.speed < 6){
            car.speed += 0.03
        }
        else{
            car.speed = 6
        }
        $("#speed").text(": "+Math.floor(car.speed * 50))
    }
    else if ((key == " " || key == "s") && !system.gameOver) {
        e.preventDefault();
        if(car.speed > 0.03){
            car.speed -= 0.03
        }
        else{
            car.speed = 0
        }
        $("#speed").text(": "+Math.round(car.speed * 50))
    }
}
function game(){
    if(!system.gameOver){
        generateWalls()
        drawWalls()
        drawBackground()
        update()
        drawWall()
        smoothWall()
    }
}
function gameOver(){
    system.gameOver = true
}
function clock(){
    if(system.time >= 1){
        system.time -=1
        $("#time").text(": "+system.time)
        if(system.time === 0 && !system.gameOver){
            gameOver()
        }
        setTimeout(clock, 1000);
    }
}
setInterval(game,)
clock() /*make this function run only once game has started*/