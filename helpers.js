function setPowerUps() {





   
}

function saveName(index,table) {

 document.getElementById("save").addEventListener("click",() =>  {
   
   const storageData = localStorage.getItem("stats")
   const playerStats = storageData ? JSON.parse(storageData) : [];
   playerStats[index].current = false;
   localStorage.setItem("stats",JSON.stringify(playerStats))
   table[index].contentEditable = false;
   

 })

}


function setName(index,table) {


   table[index].addEventListener("input",(e) => {

      if(e.target.textContent.length > 10) {

         let s = e.target.textContent;
         s = s.substring(0,s.length-1);
         e.target.textContent = s;
         const storageData = localStorage.getItem("stats")
         const playerStats = storageData ? JSON.parse(storageData) : [];
         playerStats[index].playerName = s;
         localStorage.setItem("stats",JSON.stringify(playerStats))

       }

       else {

         const storageData = localStorage.getItem("stats")
         const playerStats = storageData ? JSON.parse(storageData) : [];
         playerStats[index].playerName = e.target.textContent
         localStorage.setItem("stats",JSON.stringify(playerStats))

       }

   })


}
 
function fillTable(obj,playerStats) {

   let sortedArr = sortStatsArr(obj,playerStats);
   let editableIndex = 0;

      document.getElementsByClassName("score-table")[0].style.display = "block";
      let timeTable = document.getElementsByClassName("time-played")[0].children
      let scoreTable = document.getElementsByClassName("scores")[0].children
      let names = document.getElementsByClassName("player-names")[0].children
      
      sortedArr.forEach((el,index) => {

         if(el.current) {
            editableIndex = index;
         }
         
      });

      console.log(editableIndex)

      for(let i=0;i<=sortedArr.length-1;i++) {
      
         let obj = sortedArr[i];
         names[i].textContent = obj.playerName
         timeTable[i].textContent = obj.time;
         scoreTable[i].textContent = obj.score
      
      }
   
  
   names[editableIndex].contentEditable = true
   localStorage.setItem("stats",JSON.stringify(sortedArr))


   setName(editableIndex,names)
   saveName(editableIndex,names)
   
}


function sortStatsArr(newStats,statsArr) {
  
   statsArr.push(newStats)

   if(statsArr.length >= 2) {
  
      for(let i=0;i<statsArr.length-1;i++) {
      
         for(let j=0;j<statsArr.length-1;j++) {

            let temp = statsArr[j]

            if(statsArr[j+1].score < statsArr[j].score || (statsArr[j+1].score === statsArr[j].score && statsArr[j+1].time < statsArr[j].time)) {
            
               statsArr[j] = statsArr[j+1]
               statsArr[j+1] = temp;
               
              } 

            }
      
         }
        
      }     

   statsArr.reverse()

   if(statsArr.length > 10) {

    statsArr.splice(statsArr.length-1)

   }
   
   return statsArr


}

function startTimer() {
   startTime = Date.now() - elapsedTime;
   intervalId = setInterval(updateTime, 1000);
 }

 function updateTime() {
   const currentTime = Date.now();
   elapsedTime = currentTime - startTime;
 }

 function stopTimer() {
   clearInterval(intervalId);
   const seconds = Math.floor(elapsedTime / 1000); // Convert milliseconds to seconds
   return seconds;
 }


function setTiming(ctx,t) {
     
   let intervalId = setInterval(() => {
      
        if(t >=1) {

         document.getElementById("timer-value").style.display = "inline";
         document.getElementById("timer-value").textContent = t;
        
        }

        if(t === 0) {
         clearInterval(intervalId)
         document.getElementById("timer-value").style.display = "none";

        }

        t = t-1;

   },1000)

}



function isFinished(obsticlesArray) {

  let finished = true;

  for(let i=0;i<=obsticlesArray.length-1;i++) {

     let arr = obsticlesArray[i]

    for(let j=0;j<=arr.length-1;j++) {
    
      if(arr[j] === 1) {
        finished = false;
      }

    }

  }

   return finished;
} 


function createLevelOneMap(ctx,width,height,obsticlesArray,x,y,circle,obsticle) {
   
  let value = Math.round(Math.random()*9)
  let startingY = y

  if(!obsticle.coordinates.length) {
   for(let i=0;i<=obsticlesArray.length-1;i++) {

      let arr = obsticlesArray[i]
      obsticle.coordinates.push([])

      for(let j=0;j<=arr.length-1;j++) {
         
        if(arr[j] > 0) { 
         obsticle.coordinates[i].push({X:x,Y:y})
        }

         y = y + 30;  

      }
      
      x = x + 160;
      y = startingY;

   }

}
   
   let colorIndex = 0;
   for(let i=0;i<=obsticle.coordinates.length-1;i++) {

      let arr1 = obsticle.coordinates[i]
      let arr2 = obsticlesArray[i];

      if(colorIndex === obsticle.colors.length-1) {
          colorIndex = 0;
      }

      for(let j=0;j<=arr1.length-1;j++) {
       
         if(arr2[j]) {
           
           let X = arr1[j].X;
           let Y = arr1[j].Y;
           obsticle.draw(ctx,X,Y,colorIndex)

         }
        
      }

      colorIndex++;

      
   }
  
   obsticle.collisionDetection(ctx,obsticlesArray,circle)
   
}