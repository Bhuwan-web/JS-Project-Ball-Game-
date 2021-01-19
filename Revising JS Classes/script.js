var canvas,ctx;
window.onload=init;


function canvasDimension(){
    /*Setting up the dimension for canvas to run which equals to the given height for the window of browser */
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
}
player={
    x:10,
    y:10,
    width:15,
    height:15,
    color:'green'
}
function drawPlayer(){
    ctx.save();
    ctx.translate(player.x,player.y);
    ctx.fillStyle=player.color;
    ctx.fillRect(0,0,player.width,player.height)
    ctx.restore();
}
function playerMovement(evt){
    player.x=evt.clientX-player.width/2;
    player.y=evt.clientY-player.height/2;
}
class Ball {
    constructor(x,y,radius,speedX,speedY,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speedX=speedX;
        this.speedY=speedY;
        this.color=color;
    }
     drawBalls(ctx){
         /**This is the way we draw circle in canvas */
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.translate(this.x,this.y);
        ctx.arc(0,0,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
    }
    moveBalls(index){
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.onWallCollision();
        this.playerBallCollision(index);
    }
    onWallCollision(){
        if(this.x + this.radius>canvas.width || this.x-this.radius<0){
            this.speedX=-this.speedX;
        }
        if(this.y+this.radius>canvas.height || this.y-this.radius <0){
            this.speedY=-this.speedY;
        }
    }
    playerBallCollision(index){
        var playerX=player.x+player.width/2;
        var playerY=player.y+player.height/2;
        var x=playerX-this.x;
        var y=playerY-this.y;
        /*if(this.x+this.radius<player.x){
            var x=player.x-this.x-this.radius;
        };
        if(this.x-this.radius>player.x+player.width){
            var x=player.x+player.width-this.x+this.radius;
        };
    
        if(this.y+this.radius<player.y){
            var y=player.y-this.y-this.radius;
        };
        if(this.y-this.radius>player.y+player.height){
            var y=player.y+player.height - this.y+this.radius;
        };*/
        /**Distance formula between the coordinates SquareRoot{(x2-x1)^2+(y2-y1)^2} */
        let distance=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        if(distance<this.radius+player.width/2){
            balls.splice(index,1);

        }
    }
}
function allBalls(n,canvas){
    /**Each Property of Ball has been defined as one individual and raandered as class constructor argument
     * and whole class is pushed to an array named balls .
     */
    balls=[];
    for(noOfBalls=0;noOfBalls<n;noOfBalls++){

        let x=canvas.width/2;
        let y=canvas.height/2;
        let radius=5+Math.round(10*Math.random());
        let speedX=Math.random();
        let speedY=3*Math.random();
        /**I had already prepaired random color generator function  in another file i just imported it here and used insted of rewriting the whole code*/
        let color=randomColorGenerator();
        let ball=new Ball(x,y,radius,speedX,speedY,color);
        balls.push(ball);
    };
    
return balls;
}
function drawAllBalls(balls){
    /**The array of balls containing class emements  id rendered in a loop and all the balls are displayed in the screen*/
    balls.forEach(function(ball,index){
        ball.drawBalls(ctx);
        ball.moveBalls(index);
    });
}
function init(){
    /*This is the main Function to run everything on window load  */
    canvas=document.getElementById('ballGame');
    ctx=canvas.getContext('2d');
    canvasDimension(canvas);
    canvas.addEventListener('mousemove',function(evt){playerMovement(evt)});
    randerBalls=allBalls(10,canvas)
    play();
}
function play(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllBalls(randerBalls);
    drawPlayer();
    requestAnimationFrame(play);
}

