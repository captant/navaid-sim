function load() {
    var canvas = document.getElementById('sim');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        setupComponents(canvas, context)
    }
}


function setupComponents(canvas, context) {    
    position = {
        x: canvas.width/2,
        y: canvas.height/2
    };
    isDraggable = false;
    
    var img = new Image();
    img.src = 'vorsim/image/VORDME.png';
    img.width = 50;
    img.height = 50;
    img.onload = function() {
        _Go();
    }
    
    function _Go() {
        _MouseEvents();
        
        setInterval(function() {
            _ResetCanvas();
            _DrawImage();
        }, 1000/30)
    }
    
    function _ResetCanvas() {
      context.fillStyle = '#fff';
      context.fillRect(0,0, canvas.width, canvas.height);
    }
    
    function _DrawImage() {
        center = {
            x: position.x - (img.width/2),
            y: position.y - (img.height/2)
        };
        context.drawImage(img, center.x, center.y, img.width, img.height);
    }
    
    function _MouseEvents() {
        
        canvas.onmousedown = function(event) {
            var mouse = {
                x: event.pageX - this.offsetLeft,
                y: event.pageY - this.offsetTop
            };
            var isInside = 
                (mouse.x >= (position.x - img.width/2) &&
                mouse.x <= (position.x + img.width/2) &&
                mouse.y >= (position.y - img.height/2) &&
                mouse.y <= (position.y + img.height/2));
            
            if (isInside) {
                isDraggable = true;
            }
        }
        
        canvas.onmouseup = function() {
            isDraggable = false;
        }
        
        canvas.onmouseout = function() {
            isDraggable = false;
        }
        
        canvas.onmousemove = function(e) {
            var mouse = {
                x: event.pageX - this.offsetLeft,
                y: event.pageY - this.offsetTop
            };
           if (isDraggable) {
              position.x = mouse.x;
              position.y = mouse.y;
            }
        }
    }
}

class MouseListener {
    constructor(canvas, position, img, isDraggable) {
        this.canvas = canvas;
        this.position = position;
        this.img = img;
        this.isDraggable = isDraggable;
    }
    
    _OnMouseDown() {
        this.canvas.onmousedown = function (event) {
            var mouse = {
                x: event.pageX - this.offsetLeft,
                y: event.pageY - this.offsetTop
            };
            var isInside = 
                (mouse.x >= (this.position.x - this.img.width/2) &&
                mouse.x <= (this.position.x + this.img.width/2) &&
                mouse.y >= (this.position.y - this.img.height/2) &&
                mouse.y <= (this.position.y + this.img.height/2));
            
            if (isInside) {
                this.isDraggable = true;
            }
        }
    }
}

