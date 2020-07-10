function load() {
    var canvas = document.getElementById('sim');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        setupComponents(context);
    }
}

function setupComponents(context) {
    var navaid = new Navaid(context);
    navaid.VORDME();
    navaid.VOR(50, 50);
    navaid.DME(120, 50);
    navaid.VORTAC(190, 50);
}

class Navaid {
    constructor(context) {
        this.context = context;
    }
    
    VOR(x = 0, y = 0, size = 50) {
        var shape = new Shape(this.context);
        shape.drawHexagon(x, y, size);
        shape.drawCircle(x, y, size);  
    }
    
    VORDME(x = 0, y = 0, size = 50) {
        var shape = new Shape(this.context);
        shape.drawHexagon(x, y, size);
        shape.drawCircle(x, y, size);    
        shape.drawRectangle(x, y, size);
    }
    
    VORTAC(x = 0, y = 0, size = 50) {
        var shape = new Shape(this.context);
        shape.drawTacMarks(x, y, size);
        shape.drawHexagon(x, y, size);
        shape.drawCircle(x, y, size);
    }
    
    DME(x = 0, y = 0, size = 50) {
        var shape = new Shape(this.context);
        shape.drawRectangle(x, y, size);
    }
}

class Shape {
    constructor(context) {
        this.context = context;
        this.context.lineWidth = 3;
    }
    
    drawHexagon(x = 0, y = 0, s = 50) {        
        this.context.beginPath();
        this.context.moveTo(x+s/4, y+0);
        this.context.lineTo(x+0, y+s/2);
        this.context.lineTo(x+s/4, y+s);
        this.context.lineTo(x+3*s/4, y+s);
        this.context.lineTo(x+s, y+s/2);
        this.context.lineTo(x+3*s/4, y+0);
        this.context.lineTo(x+s/4, y+0);        
        this.context.stroke();
    }
    
    drawCircle(x = 0, y = 0, size = 50) {
        this.context.beginPath();
        this.context.arc(x+size/2, y+size/2, size/10, 0, 2*Math.PI);
        this.context.fill();
    }
    
    drawRectangle(x = 0, y = 0, size = 50) {
        this.context.strokeRect(x, y, size, size);
    }
    
    drawTacMarks(x = 0, y = 0, s = 50) {
        var L =Math.sqrt(101.25);
        
        // Draw top-left corner.
        this.context.beginPath();
        this.context.moveTo(x+s/4, y+0);
        this.context.lineTo(x+0, y+s/2);
        this.context.lineTo(x+0-2*s/L, y+s/2-s/L);
        this.context.lineTo(x+s/4-2*s/L, y+0-s/L);
        this.context.fill();
        this.context.stroke();
        
        // Draw top-right corner.
        this.context.beginPath();
        this.context.moveTo(x+3*s/4, y+0);
        this.context.lineTo(x+s, y+s/2);
        this.context.lineTo(x+s+2*s/L, y+s/2-s/L);
        this.context.lineTo(x+3*s/4+2*s/L, y+0-s/L);
        this.context.fill();
        this.context.stroke();
        
        // Draw bottom.
        this.context.beginPath();
        this.context.moveTo(x+s/4, y+s);
        this.context.lineTo(x+3*s/4, y+s);
        this.context.lineTo(x+3*s/4, y+s+s/4.5);
        this.context.lineTo(x+s/4, y+s+s/4.5);
        this.context.fill();
        this.context.stroke();
    }
}