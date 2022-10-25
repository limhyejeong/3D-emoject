import * as THREE from "three";
let geometry, material, matcapTexture;
const texLoader = new THREE.TextureLoader(); // 텍스쳐 로더

let colorArr = [
    new THREE.Color(0xf7781a),
    new THREE.Color(0xf2c925),
    new THREE.Color(0x37c8ff),
    new THREE.Color(0x91af00),
    new THREE.Color(0xa98e75),
];

export const createEmoject = (mesh, category, activity) => {
    // Geometry
    if (category == "anger") {
        geometry = new THREE.ConeGeometry(1, 2, 128, 128);
        // noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
    } else if (category == "fear") {
        geometry = new THREE.SphereGeometry(1, 64, 64);
        // noiseSettings = { 진폭: 10, 반경: 0.5, 속도: 1 };
    } else if (category == "sadness") {
        geometry = new THREE.TorusGeometry(0.5, 0.3, 64, 64);
        // noiseSettings = { 진폭: 3, 반경: 0.5, 속도: 1 };
    } else if (category == "disgust") {
        geometry = new THREE.ConeGeometry(1, 1.3, 128, 128);
        // noiseSettings = { 진폭: 8, 반경: 0.1, 속도: 1 };
    } else if (category == "surprise") {
        geometry = new THREE.TetrahedronGeometry(0.7, 10);
        // noiseSettings = { 진폭: 2, 반경: 2, 속도: 1 };
    } else if (category == "anticipation") {
        geometry = new THREE.SphereGeometry(1, 64, 64);
        // noiseSettings = { 진폭: 1, 반경: 4, 속도: 1 };
    } else if (category == "trust") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16, 2, 3);
        // noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
    } else if (category == "joy") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 256, 16, 1, 5);
        // noiseSettings = { 진폭: 1, 반경: 0.2, 속도: 1 };
    }

    if (activity == 2) {
        matcapTexture = texLoader.load("./assets/textures/matcap/말랑.png");
    } else if (activity == 3) {
        matcapTexture = texLoader.load("./assets/textures/matcap/은은.png");
    } else if (activity == 4) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울.png");
    } else if (activity == 5) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
    } else if (activity == 6) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
    } else if (activity == 7) {
        matcapTexture = texLoader.load("./assets/textures/matcap/물방울2.png");
    } else if (activity == 8) {
        matcapTexture = texLoader.load("./assets/textures/matcap/음영.png");
    } else if (activity == 9) {
        matcapTexture = texLoader.load("./assets/textures/matcap/철.png");
    } else if (activity == 10) {
        matcapTexture = texLoader.load("./assets/textures/matcap/페인트.png");
    }

    let sPick = Math.floor(Math.random() * colorArr.length);

    matcapTexture = texLoader.load("./assets/textures/matcap/은은.png");

    material = new THREE.MeshMatcapMaterial({
        color: colorArr[sPick],
        matcap: matcapTexture,
    });
    mesh = new THREE.Mesh(geometry, material);

    return mesh;
}
