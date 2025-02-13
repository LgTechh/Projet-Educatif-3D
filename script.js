const shapeSelect = document.getElementById("shape");
const faceSelect = document.getElementById("face");
const colorInput = document.getElementById("color");
const shape3D = document.getElementById("shape-3d");
const resetButton = document.getElementById("reset-button");

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let rotationX = 0;
let rotationY = 0;

function updateShape() {
    const selectedShape = shapeSelect.value;

    shape3D.className = "";
    shape3D.classList.add(selectedShape);

    if (selectedShape === "cube") {
        shape3D.style.width = "150px";
        shape3D.style.height = "150px";
    } else if (selectedShape === "rectangular-prism") {
        shape3D.style.width = "200px";
        shape3D.style.height = "100px";
    }
}

function changeFaceColor() {
    const selectedFace = faceSelect.value;
    const color = colorInput.value;

    const face = shape3D.querySelector(`.${selectedFace}`);
    if (face) {
        face.style.backgroundColor = color;
    }
}

function onMouseDown(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function onMouseMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    shape3D.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function onMouseUp() {
    isDragging = false;
}

function resetAll() {
    rotationX = 0;
    rotationY = 0;
    shape3D.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    shapeSelect.value = "cube";
    updateShape();

    const faces = shape3D.querySelectorAll(".face");
    faces.forEach((face) => {
        face.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    });

    faceSelect.value = "front";
    colorInput.value = "#ff0000";
}

shapeSelect.addEventListener("change", updateShape);
colorInput.addEventListener("input", changeFaceColor);
faceSelect.addEventListener("change", changeFaceColor);
shape3D.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);
resetButton.addEventListener("click", resetAll);

updateShape();