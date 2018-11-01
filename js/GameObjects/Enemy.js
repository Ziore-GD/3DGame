class Enemy extends MoveAbleObject {
    constructor() {
        var Geometry = new THREE.BoxGeometry(2, 2, 2);
        var Material = new THREE.MeshBasicMaterial({ color: 0x008000, transparent: true, opacity: 1 });
        var collision = new THREE.Mesh(Geometry, Material);
        super(Geometry, Material, collision);

        this.health = new Health(2, this);
        this.damage = Math.floor((Math.random() * (level * 1.5) + (level * 0.5)));
        this.castShadow = true;
        this.name = 'enemy';
        this.cooldown = 2;
        this.timer = 0;
        this.damage = 1;
        this.moveSpeed = 10;
        this.moveAngle = Math.PI / 4;
        this.normaleVariableNaamDankjewelPIM = 0;
        //this.moveRotation = true;
        this.moveAmount = Math.floor((Math.random() * (2) + (5)));
        //this.moveForward = true;
        this.position.copy(new THREE.Vector3(Math.floor((Math.random() * (width) + (-75))), 1, Math.floor((Math.random() * (width) + (-75)))));
        this.MakeSpawnPos();
        scene.add(this);
        collidableMeshList.push(this);
    }

    Update(deltatime) {
        /*
        if (this.normaleVariableNaamDankjewelPIM > 100) {
            this.normaleVariableNaamDankjewelPIM = 0;
            this.MakeSpawnPos();
        }
        else {

            var newPos = this.position.clone();
            newPos.x -= Math.sin(this.moveAngle) * this.moveSpeed * deltatime;
            newPos.z -= Math.cos(this.moveAngle) * this.moveSpeed * deltatime;


            var collidedObject = this.DetectCollision(newPos.clone());

            if (collidedObject == null) {
                this.position.copy(newPos);
                if (this.DetectCollision(this.position.clone()) != null) {
                    console.log("Gaat hard mis");
                }
            }
            else {
                this.normaleVariableNaamDankjewelPIM += 1;
                if (collidedObject.name == "player" && this.timer >= this.cooldown) {
                    collidedObject.health.DeltaHealth(this.damage);
                    this.timer = 0;
                }
                else {
                    this.moveAngle = Math.random() * (Math.PI * 2);
                }
            }

            if (this.timer <= this.cooldown) {
                this.timer += deltatime;
            }

        }
        */
    }

    MakeSpawnPos() {
        var randomPos = new THREE.Vector3(Math.floor((Math.random() * (width) + (-75))), 1, Math.floor((Math.random() * (width) + (-75))));

        var results = [];
        results.push(this.CheckCollision(randomPos, this.directionUp));
        results.push(this.CheckCollision(randomPos, this.directionDown));
        results.push(this.CheckCollision(randomPos, this.directionLeft));
        results.push(this.CheckCollision(randomPos, this.directionRight));

        results.forEach(e => {
            if (e != null) {
                if (e.distance < 1 && e.object.name == "wall") {
                    this.MakeSpawnPos();
                }
            }
        });

        this.position.copy(randomPos);
    }

    OnDead() {
        console.log("Enemy Died");
        player.experience.DeltaExp(this.health.maxHealth);
    }
    OnHit() {
        console.log("Enemy Hit");
    }
}