import * as THREE from "three";
import { noise } from "@/assets/js/noise";
let geometry, material, matcapTexture;
const texLoader = new THREE.TextureLoader(); // 텍스쳐 로더
let v3 = new THREE.Vector3();
let clock = new THREE.Clock();

let noiseSettings = {
    진폭: 0,
    반경: 0,
    속도: 0,
};

const createEmoject = (mesh, category, activity, length, color) => {
    // Geometry
    if (category == "anger") {
        geometry = new THREE.ConeGeometry(0.7, 1.4, 64, 64);
        // geometry = new THREE.DodecahedronGeometry(1, 10);
        // geometry = new THREE.CylinderGeometry(0.5, 1, 1, 64, 64);
        noiseSettings = { 진폭: 2 + activity * 0.1, 반경: 0.5 + activity * 0.1, 속도: activity * 0.15 };
    } else if (category == "fear") {
        geometry = new THREE.SphereGeometry(0.7, 64, 64);
        noiseSettings = { 진폭: 10, 반경: 0.5 + activity * 0.1, 속도: activity * 0.07 };
    } else if (category == "sadness") {
        geometry = new THREE.TorusGeometry(0.5, 0.3, 64, 64);
        noiseSettings = { 진폭: 0.5 + activity * 0.2, 반경: 0.5 + activity * 0.1, 속도: activity * 0.1 };
    } else if (category == "disgust") {
        geometry = new THREE.ConeGeometry(1, 1.3, 128, 128);
        noiseSettings = { 진폭: 8 + activity * 0.5, 반경: 0.1 + activity * 0.05, 속도: activity * 0.1 };
    } else if (category == "surprise") {
        geometry = new THREE.SphereGeometry(0.8, 64, 64);
        noiseSettings = { 진폭: 1.2 + 0.2 * activity, 반경: 0.1 + activity * 0.2, 속도: 9 * 0.2 };
    } else if (category == "anticipation") {
        geometry = new THREE.TorusKnotGeometry(0.3, 0.4, 128, 128, 1, 4);
        noiseSettings = { 진폭: 0.1 + activity * 0.2, 반경: activity * 0.2, 속도: activity * 0.1 };
    } else if (category == "trust") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16, 2, 3);
        noiseSettings = { 진폭: 1 + activity * 0.1, 반경: 0.2 + activity * 0.05, 속도: activity * 0.1 };
    } else if (category == "joy") {
        let joyVec;
        if (activity <= 3) joyVec = 3;
        else if (activity <= 6) joyVec = 4;
        else joyVec = 5;
        geometry = new THREE.TorusKnotGeometry(0.6, 0.15, 256, 16, 1, joyVec);
        noiseSettings = { 진폭: 1 * activity / 1, 반경: 0.07 * activity, 속도: activity * 0.1 };
    }


    if (length == 2) {
        matcapTexture = texLoader.load("./assets/textures/matcap/pink.png");
    } else if (length == 3) {
        matcapTexture = texLoader.load("./assets/textures/matcap/gold.png");
    } else if (length == 4) {
        matcapTexture = texLoader.load("./assets/textures/matcap/yellow.jpg");
    } else if (length == 5) {
        matcapTexture = texLoader.load("./assets/textures/matcap/은은.png");
    } else if (length == 6) {
        matcapTexture = texLoader.load("./assets/textures/matcap/wild.png");
    } else if (length == 7) {
        matcapTexture = texLoader.load("./assets/textures/matcap/rainbow.png");
    } else if (length == 8) {
        matcapTexture = texLoader.load("./assets/textures/matcap/crystal.png");
    } else if (length == 9) {
        matcapTexture = texLoader.load("./assets/textures/matcap/galaxy.png");
    } else if (length == 10) {
        matcapTexture = texLoader.load("./assets/textures/matcap/magic.png");
    }

    // matcapTexture = texLoader.load("./assets/textures/matcap/glass.png");
    // matcapTexture = texLoader.load("./assets/textures/matcap/구슬.png");

    material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(color),
        matcap: matcapTexture,
    });

    // 노이즈 애니메이션을 위한 준비
    geometry.positionData = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(geometry.attributes.position, i);
        geometry.positionData.push(v3.clone());
    }

    mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

const noiseAnimation = (mesh, settings) => {
    noise(mesh, clock, settings, v3);
}


export { createEmoject, noiseSettings, noiseAnimation }