/** Class representing World */
class World {

    constructor() {
        this.CreateMaze();
        this.plane;
        this.maze;
        this.finishTargetPos;
    }
    /** 
     * @function CreateMaze
     * Create the maze walls / plane / skybox / Particles
     */
    CreateMaze() {
        collidableMeshList = [];
        //Create scene
        scene = new THREE.Scene();
        var random = Math.floor((Math.random() * (level * 2) + (3 + level)));
        //Create maze
        this.maze = new Maze(scene, random, 150, 150);
        this.maze.generate();
        this.maze.draw();
        var walls = this.maze.getElements();
        walls.forEach(function (e) { collidableMeshList.push(e) });

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(width, width, 40, 40);
        var planeMaterial = new THREE.MeshLambertMaterial({});
        planeMaterial.map = textureLoader.load("assets/grasstundra-94x94.png");
        planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
        planeMaterial.map.repeat.set(3, 3);
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.receiveShadow = true;
        this.plane.rotation.x = -0.5 * Math.PI;
        scene.add(this.plane);

        //Start
        var startWall = new THREE.BoxGeometry(10, 13, 1);
        var startMesh = new THREE.Mesh(startWall);
        startMesh.name = "start";
        startMesh.position.set(width / 2 - 5, 0, width / 2);
        collidableMeshList.push(startMesh);
        scene.add(startMesh);
        //Finish
        var endWall = new THREE.BoxGeometry(10, 13, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({});
        planeMaterial.map = textureLoader.load("assets/finish.png");
        planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
        var endMesh = new THREE.Mesh(endWall, planeMaterial);
        endMesh.name = "finish";
        endMesh.position.set(-width / 2 + 5, 0, -width / 2);
        collidableMeshList.push(endMesh);
        scene.add(endMesh);

        //Create finish light
        var finishLight = new THREE.AmbientLight(0xbbbbff);
        var finishTarget = new THREE.Object3D();
        finishTarget.position.set(-60, 0, -60);
        finishLight.target = finishTarget;
        this.finishTargetPos = finishTarget.position;

        //Lighting
        var directionalLight = new THREE.DirectionalLight(0x0000ff, 0.5);
        scene.add(directionalLight);
        scene.add(finishLight);

        //skybox
        this.CreateSkyBox();

        //Particles
        stars = new THREE.Stars(scene, 1800);
        blood = new THREE.BloodFX(scene);

        if (arrowGeometry != null) {
            this.CreateObjectsWithModels();
        }
    }
    /** 
     * @function CreateMaze 
     * if the player has reached level 5 display finish screen
     * if the player hasn't reached level 5 yet create the next level
     * */
    CreateNewMaze() {
        level++;
    
        if (level >= 6) {
            document.getElementById("gameScreen").style.display = "none";
            document.getElementById("finishScreen").style.display = "block";
            scene = new THREE.Scene();
            player.TeleportScene(scene);
            time = clock.getElapsedTime();

            var completeTime;
            var minutes = Math.floor((time % 3600) / 60);
            var seconds = Math.floor(time % 60);
            seconds = ('0' + seconds).slice(-2);
            completeTime = minutes + ":" + seconds;
            document.getElementById("timeCompleted").innerHTML = completeTime;
            document.getElementById("enemiesKilled").innerHTML = kills;
            document.getElementById("playerDeaths").innerHTML = deaths;
            document.getElementById("playerLevel").innerHTML = player.level;

            return;
        }
        this.CreateMaze();

        player.TeleportScene(scene);
        gamePanel.AddLevels();
    }

    /**
     * @function CreateSkyBox
     * Creates the skybox
     */
    CreateSkyBox() {
        var loader = new THREE.TextureLoader();
        loader.load('assets/skybox.jpg', function (texture) {
            var sphericalSkyboxGeometry = new THREE.SphereGeometry(500, 32, 32);
            var sphericalSkyboxMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            var sphericalSkybox = new THREE.Mesh(sphericalSkyboxGeometry, sphericalSkyboxMaterial);
            scene.add(sphericalSkybox);
        });
    }
    /**
     * @function CreateShootingTraps
     * Creates a random (5 to 10) amount of traps that shoot projectiles
     */
    CreateShootingTraps() {
        var amountOfTraps = Math.floor((Math.random() * 10 + 5));
        for (var i = 0; i < amountOfTraps; i++)
            updatableTraps.push(new ShootingTrap(level));
    }
    /**
     * @function CreateTraps
     * Create a random (5 to 10) amount of regular (spike) traps
     */
    CreateTraps() {
        var amountOfTraps = Math.floor((Math.random() * 10 + 5));
        for (var i = 0; i < amountOfTraps; i++)
            new Trap(null, null);
    }
    /**
     * @function CreateEnemies
     * create 5 enemies
     */
    CreateEnemies() {
        enemies.forEach(element => {
            element = null;
        });
        enemies = [];

        for (var i = 0; i < 5; i++)
            enemies.push(new Enemy(slimeGeometry, slimeMaterial));
    }
    /**
     * @function CreateObjectsWithModels
     * create all models
     */
    CreateObjectsWithModels() {
        this.CreateEnemies();
        this.CreateTraps();
        this.CreateShootingTraps();
    }
}