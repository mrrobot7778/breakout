class Map {

  constructor(width,height,health) {

   this.width = width;
   this.height = height;
   this.obsticles = [
    [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]],
  ]
   
  }
 
  setLevel(level,ctx,width,height,x,y,circle,obsticle) {

    switch(level) {

      case 1:
        createLevelOneMap(ctx,width,height,this.obsticles[0],x,y,circle,obsticle)
        break;
      case 2:
        createLevelTwoMap(ctx,width,height,this.obsticles[1],x,y,circle,obsticle)
        break;  
     
    }

  }

  update(ctx) {
    
    this.#draw(ctx)

  }

 #draw(ctx) {
 
   const gradient = ctx.createLinearGradient(5, 105, 5, this.width);
   gradient.addColorStop(0, '#82178F'); // Přidání první barvy na začátek
   gradient.addColorStop(1, '#0C4772'); // Přidání druhé barvy na konec
    
   ctx.beginPath() 
   ctx.lineWidth = 10;
   ctx.rect(0,100,this.width,this.height-100)
   ctx.strokeStyle = gradient;
   ctx.stroke()
   ctx.closePath()
   
   ctx.beginPath() 
   ctx.strokeStyle = "#041624"
   ctx.moveTo(0,window.innerHeight)
   ctx.lineTo(window.innerWidth,window.innerHeight)
   ctx.stroke()
   ctx.closePath()

  
   ctx.lineWidth = 0.2;
   ctx.strokeStyle = "white"
   ctx.beginPath()
   ctx.moveTo(0,95)
   ctx.lineTo(this.width,95)
   ctx.closePath()
   ctx.stroke()  

   ctx.beginPath()
   ctx.moveTo(5,105)
   ctx.lineTo(this.width-5,105)
   ctx.closePath()

   ctx.stroke()
   ctx.beginPath()
   ctx.moveTo(5,105)
   ctx.lineTo(5,this.height)
   ctx.closePath();
   ctx.stroke()
  
   ctx.beginPath()
   ctx.moveTo(this.width-5,105);
   ctx.lineTo(this.width-5,this.height)
   ctx.closePath();
   ctx.stroke()

   ctx.beginPath()
   ctx.fillStyle = '#072439'
   ctx.shadowColor = '#072439'
   ctx.shadowBlur = 50;
   ctx.rect(5,100,window.innerWidth-20,300)
   ctx.fill()
   ctx.closePath()
  
   ctx.beginPath()
   ctx.fillStyle  = "#071F32"
   ctx.shadowColor = '#071F32'
   ctx.shadowBlur = 50;
   ctx.rect(10,300,window.innerWidth-20,100)
   ctx.fill()
   ctx.closePath()
    
    
   ctx.beginPath()
   ctx.fillStyle = '#040A0F'
   ctx.shadowColor = '#040A0F'
   ctx.shadowBlur = 50;
   ctx.rect(10,window.innerHeight-200,window.innerWidth-20,window.innerHeight)
   ctx.fill()
   ctx.closePath()
  
  }

  drawScore(value,ctx) {

      let baseS = "";
      let points = ""
    
      if(!value) {
        points = "0000"
      }
      
      else {
        baseS = "0000"
        points = baseS.substring(0,baseS.length-value.toString().length) + value.toString()
 
      }
      
      ctx.shadowColor = "#4AA6EC";
      ctx.shadowBlur = 60;
      ctx.font = 'bold 80px Arial'; // Set font size and family
      ctx.fillStyle = '#4AA6EC'; // Set text color
      ctx.fillText(points, 50, 80) 

      ctx.font = '20px Arial'; // Set font size and family
      ctx.fillStyle = '#4AA6EC'; // Set text color
      ctx.fillText("SCORE", 230, 80) 

  }

   drawHealth(ctx,health) {
    
    let x = window.innerWidth/2;
    let y = 50;

    for(let i=1;i<=3;i++) {

      ctx.beginPath()
      ctx.fillStyle = "#4AA6EC"
      ctx.strokeStyle = "#4AA6EC"
      ctx.shadowColor = "#4AA6EC";
      ctx.shadowBlur = 40;
      ctx.arc(x,y,10,0,Math.PI*2)

      if(health.at(-i)) {
        ctx.fill()
        
      }
      else {
        ctx.stroke();
      }
       
      x = x + 40;
      ctx.closePath()

    }
    
  }

  drawLevel(ctx) {
   
    ctx.shadowColor = "#4AA6EC";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 5; // Horizontal offset
    ctx.shadowOffsetY = 2
    ctx.font = '20px Arial'; // Set font size and family
    ctx.fillStyle = '#4AA6EC'; // Set text color
    ctx.fillText("LEVEL", window.innerWidth-210, 80) 
 
    ctx.font = '80px Arial'; // Set font size and family
    ctx.fillStyle = '#4AA6EC'; // Set text color
    ctx.fillText("01", window.innerWidth-150, 80)
    ctx.fillText("",window.innerWidth-100, 80)    

  }

}