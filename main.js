var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

//scene variables
var scene,
	camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;
    
function createScene() {
    //Get width and height of screen and setup camera aspect ratio and size of renderer
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    //Create scene
    scene = new THREE.Scene();

    //Fog effect
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)



    //Create camera
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    //Set position of camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;



    //Create Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    //Define renderer size
    renderer.setSize(WIDTH, HEIGHT);

    renderer.shadowMap.enabled = true;

    //Add renderer DOM element to container "world"
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    //Add screen listener. If user resizes screen, camera and render size must be updated
    window.addEventListener('resize', handleWindowResize, false)
}

//Handle screen events
function handleWindowResize() {
    //update height, width of renderer and  camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function init() {
	// set up the scene, camera, and renderer
	createScene();

	// add the lights
	createLights();

	// add the objects
	createPlane();
	createSea();
	createSky();

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	loop();
}

window.addEventListener('load', init, false);
