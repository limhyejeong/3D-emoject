export const createObj = () => {
    cube = null;

    if (category.value == "joy") {
        geometry = new THREE.BoxGeometry(1, 1, 1);
    } else {
        geometry = new THREE.SphereGeometry(1, 128, 128);
    }
    material = new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        color: "hsl(0, 50%, 50%)",
        wireframe: false,
    });
    // material = new THREE.MeshNormalMaterial({});
    // material = new THREE.ShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {
    //     uTime: { value: 0 },
    //     uSpeed: { value: settings.speed },
    //     uNoiseDensity: { value: settings.density },
    //     uNoiseStrength: { value: settings.strength },
    //     uFrequency: { value: settings.frequency },
    //     uAmplitude: { value: settings.amplitude },
    //     uIntensity: { value: settings.intensity },
    //   },
    //   // wireframe: true,
    // });
    cube = new THREE.Mesh(geometry, material);
    // cube.scale.set(0.5, 0.5, 0.5);
    cube.receiveShadow = true;
    cube.castShadow = true;
    cube.rotation.x = -Math.PI / 4;

    scene.add(cube);
    // console.log(cube);
}