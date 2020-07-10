function load() {
    var canvas = document.getElementById('sim');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        drawShapes(context)
    }
}

function drawShapes(context) {
    var shape = new Shape(context);
    shape.drawRedSquare()
    shape.drawThickBlackSquare()
    shape.drawBlueSquare()
    shape.drawTriangle()
    shape.drawCircleSet()
}

class Shape {
    constructor(context) {
        this.context = context;
    }
    
    drawRedSquare() {
        this.context.fillStyle = 'rgb(200, 0, 0)';
        this.context.fillRect(10, 10, 50 ,50);
    }
    
    drawBlueSquare() {
        this.context.fillStyle = 'rgba(0, 0, 200, 0.5)';
        this.context.fillRect(30, 15, 50, 50);
    }
    
    drawThickBlackSquare() {
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(25, 25, 100, 100);
        this.context.clearRect(45, 45, 60, 60);
        this.context.strokeRect(50, 50, 50, 50);
    }
    
    drawTriangle() {
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.beginPath();
        this.context.moveTo(175, 50);
        this.context.lineTo(200, 75);
        this.context.lineTo(200, 25);
        this.context.fill();
    }
    
    drawCircleSet() {
        for (var i = 0; i < 4; i++) {
            for(var j = 0; j < 3; j++) {
                this.drawArc(i, j)                
            }
        }
    }
    
    drawArc(i, j) {
        this.context.beginPath();
        var stepsize = 50;
        var x = 325 + j * stepsize;
        var y = 25 + i * stepsize;
        var r = 20; // radius
        var startAngle = 0;
        var endAngle = Math.PI + (Math.PI * j) / 2; // in radians
        var isAnticlockwise = this.isArcAnticlockwise(i);
        
        this.context.arc(x, y, r, startAngle, endAngle, isAnticlockwise);
        this.setArcFillOrStroke(i);
    }
    
    isArcAnticlockwise(i) {
        var isAnticlockwise = i % 2 !== 0; // clockwise or counterclockwise
        return isAnticlockwise
    }
    
    setArcFillOrStroke(i) {
        if (i > 1) {
            this.context.fill();
        } else {
            this.context.stroke();
        }
    }    
}