// global variables
var renderer;
var scene;
var camera;

var collidableMeshList = [];
var width = 150;

var player;
var level = 1;
var enemy;

var world;
var enemy;
var trap;

/**
 * Particles
 */
var stars;

/**
 * Initializes the scene, camera and objects. Called when the window is
 * loaded by using window.onload (see below)
 */
function Init() {
    world = new World();
    stars = new THREE.Stars(scene, 1800);
    enemy = new Enemy(scene);

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    player = new Player(scene, camera);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    // call the render function, after the first render, interval is determined
    // by requestAnimationFrame
    AnimateCam();
    Render();
}

/**
 * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
 * for future renders
 */
function Render() {
    // and render the scene
    renderer.render(scene, camera);
    player.Update();
    stars.Update();
    requestAnimationFrame(Render);
}

/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function HandleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function AnimateCam() {
    requestAnimationFrame(AnimateCam);
    renderer.render(scene, camera);
}

// calls the init function when the window is done loading.
window.onload = Init;
// calls the handleResize function when the window is resized
window.addEventListener('resize', HandleResize, false);

function KeyDown(event) {
    player.keyboard[event.keyCode] = true;
}

function KeyUp(event) {
    player.keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', KeyDown);
window.addEventListener('keyup', KeyUp);