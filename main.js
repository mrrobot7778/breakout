const canvas = document.getElementById("myCanvas");
const storageData = localStorage.getItem("stats")
const playerStats = storageData ? JSON.parse(storageData) : [];
let level = 1;
let index = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const map = new Map(canvas.width,canvas.height)
const platform = new Platform(150,20,(canvas.width/2)-75,canvas.height-100,canvas.width)
const circle  = new Circle(10,platform.posX+platform.width/2,platform.posY-150,4,{sX:canvas.width/2,sY:canvas.width/2},platform.width);
const obsticle = new Obsticle(100,25)

let animationId = 0;
let t1 = 6;
let pause = false;
let startTime = null;
let elapsedTime = 0;
let intervalId = null;
let platformMove;
let circleMove
startGame(t1,ctx)
animate()

function startGame(t,ctx) {

  document.getElementById("game-on").onclick = () => {

    document.getElementsByClassName("game-menu")[0].style.display = "none";          

    }

  document.body.addEventListener("click",() => {

     if(document.getElementsByClassName("game-menu")[0].style.display === "none") {

        platformMove = platform.move
        circleMove = circle.move

     }


  })

}

function animate() {

    ctx.save(); // Save the current canvas state
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    map.update(ctx); // Update the map if necessary
    console.log(platformMove)
   

    platform.move(); // Update platform position
    circle.platformPosition = platform.coordinates
    circle.move(ctx,map); // Update circle position or properties
    platform.draw(ctx); // Draw the platform
    circle.draw(ctx); // Draw the circle
    map.setLevel(level,ctx,150,25,50,map.height-450,circle,obsticle)
    map.drawScore(circle.points,ctx)
    map.drawLevel(ctx)
    let health = circle.getHealth()
    ctx.restore(); 
    animationId = requestAnimationFrame(animate); 
   
    if(health[health.length-1] !== 0) {

        if(health[index] === 0) {
            pause = true;
        }
            if(pause) {

                cancelAnimationFrame(animationId)
                setTiming(ctx,3,map)
                setTimeout(() => {
                    pause = false;
                    circle.posX = canvas.width/2;
                    circle.posY = canvas.height-500
                    index++;
                    animate()
            },4000) 

          }

        }  
        else {

            cancelAnimationFrame(animationId)
            let timePlayed = stopTimer()
            let obj = {score:circle.points,time:timePlayed,current:true,playerName:""}
            fillTable(obj,playerStats)
        }
        
        if(isFinished(map.obsticles[level-1])) {

            pause = true
            obsticle.coordinates = []
            if(pause) {

                cancelAnimationFrame(animationId)
                setTiming(ctx,3,map)
                setTimeout(() => {
                    pause = false;
                    circle.posX = canvas.width/2;
                    circle.posY = canvas.height-500
                    level++;
                    animate()
            },4000) 

          }

      }

 }



