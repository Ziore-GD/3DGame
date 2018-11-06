/**
 * @function
 * Stars particles
 * Creates particles
 * 
 * make a formula to randomly spawn "stars" into the skybox.
 */
THREE.Stars = function (scene, amount) {
    var particleCount = amount,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: Math.random() * 1,
            transparent: true,
            opacity: .3,
        });

    for (var p = 0; p < particleCount; p++) {
        var pX = Math.random() * (width / 2 * -3 - width / 2 * 3) + width / 2 * 3,
            pY = 40 + Math.random() * 30,
            pZ = Math.random() * (width / 2 * -3 - width / 2 * 3) + width / 2 * 3,
            particle = new THREE.Vector3(pX, pY, pZ);

        particle.velocity = new THREE.Vector3(
            Math.random() * (-.00001 - .00001) + .00001,
            Math.random() * -.00001,
            Math.random() * (-.00001 - .00001) + .00001);

        particles.vertices.push(particle);
    }

    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    particleSystem.sortParticles = true;

    scene.add(particleSystem);
        /** 
         * Update the star particles 
         * @param {number} deltatime - timetick
         * Set the velocity to a random number and add the velocity to the particle
         */
    this.Update = function (deltatime) {
        var pCount = particleCount;
        while (pCount--) {
            var particle = particles.vertices[pCount];

            if (particle.y < 10) {
                particle.y = 40;
                particle.velocity.y = 0;
            }

            particle.velocity.y -= Math.random() * .0001 * deltatime;
            particle.add(particle.velocity);
        }

        particleSystem.geometry.verticesNeedUpdate = true;
    }
}