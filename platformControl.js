class Platform {

 constructor(width,height,posX,posY,canvasWidth) {
    
    this.gameOn = false;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.coordinates = {x:this.posX,y:this.posY}
    this.canvasWidth = canvasWidth;
    //this.move()
 }

 draw(ctx) {
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5;
    ctx.fillStyle = "#56585A";
    ctx.beginPath()
    ctx.rect(this.posX,this.posY,this.width,this.height)
    ctx.moveTo(this.posX+30,this.posY)
    ctx.lineTo(this.posX+30,this.posY - this.height+40)
    ctx.moveTo(this.posX+60,this.posY)
    ctx.lineTo(this.posX+60,this.posY - this.height+40)
    ctx.moveTo(this.posX+90,this.posY)
    ctx.lineTo(this.posX+90,this.posY-this.height+40)
    ctx.moveTo(this.posX+120,this.posY)
    ctx.lineTo(this.posX+120,this.posY-this.height+40)
    ctx.moveTo(this.posX,this.posY)
    ctx.lineTo(this.posX+5,this.posY-6)
    ctx.moveTo(this.posX+5,this.posY-6)
    ctx.lineTo(this.posX+this.width-5,this.posY-6)
    ctx.moveTo(this.posX+this.width-5,this.posY-6)
    ctx.lineTo(this.posX+this.width,this.posY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke();
   
  }

  move() {

    document.body.addEventListener("mousemove",(e) => {
      
      if(this.posX + 150 < this.canvasWidth) {
         
        this.posX = e.clientX
        this.coordinates.x = this.posX

      }

      else {

        if(e.clientX + 160 < this.canvasWidth) {
        
          this.posX = e.clientX
          this.coordinates.x = this.posX
  
        }

      }
   
    })

  }

  getCoordinates() {

     return this.coordinates
  }

}
