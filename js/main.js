const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particleArray = [];
let adjustX = 10;
let adjustY = 25;

const mouse = {
    x: null,
    y: null,
    radius: 75
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

ctx.font = '900 30px poppins';
ctx.fillStyle = '#ffff';
ctx.fillText('Never give', 0, 55);
ctx.fillText(' up!', 40, 85);


const textCoordinates = ctx.getImageData(0,0,1000,1000)

class Particle {
    constructor(x,y){
        this.x = x
        this.y = y
        this.size = 1
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*30) + 1;
    }

    draw(){
        ctx.fillStyle = '#581845';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()
    }
    update(){
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx*dx + dy*dy)

        let forceDirectionX = dx/distance
        let forceDirectionY = dy/distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if(distance < mouse.radius){
            this.x -= directionX
            this.y -= directionY
        }else{
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX
                this.x -= dx/20
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY
                this.y -= dy/20
            }
        }
    }
}

function init(){
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y - adjustY;
                console.log(positionX, positionY);
                particleArray.push(new Particle(positionX * 9, positionY* 9))
            }
        }
    }
    
}
init()
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate)
}
animate()