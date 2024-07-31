let dots = [];

const canvas = document.getElementById('circleCanvas');
const context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

    if (distFromCenter <= radius) {
        dots.push({ x, y });

        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }
});

function connectDots() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawConcentricCircles();

    if (dots.length > 1) {
        context.beginPath();
        context.moveTo(dots[0].x, dots[0].y);
        for (let i = 1; i < dots.length; i++) {
            context.lineTo(dots[i].x, dots[i].y);
        }
        context.lineTo(dots[0].x, dots[0].y);

        // Set the color for the line connecting the dots
        context.strokeStyle = 'green'; // Change color here
        context.lineWidth = 2; // Adjust width as needed
        context.stroke();
    }
}

function drawConcentricCircles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const step = canvas.width / 20;

    context.lineWidth = 1;
    context.strokeStyle = '#000';

    // Draw concentric circles
    for (let i = 1; i <= 10; i++) {
        context.beginPath();
        context.arc(centerX, centerY, i * step, 0, 2 * Math.PI, false);
        context.stroke();

        // Add labels
        context.fillStyle = 'black';
        context.font = '12px Arial';
        context.fillText(i, centerX + i * step - 10, centerY - 10);
    }

    // Draw perpendicular lines
    context.beginPath();
    context.moveTo(centerX, 0);
    context.lineTo(centerX, canvas.height);
    context.moveTo(0, centerY);
    context.lineTo(canvas.width, centerY);
    context.stroke();
}

// Initial draw of the concentric circles
drawConcentricCircles();
