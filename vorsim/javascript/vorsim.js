function load() {
    var canvas = document.getElementById('sim');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        drawShapes(context)
    }
}

function drawShapes(context) {
    // Draw solid red square.
    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(10, 10, 50, 50);
    
    // Draw alpha blue square.
    context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    context.fillRect(30, 30, 50, 50);
}