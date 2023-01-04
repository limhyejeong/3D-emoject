import * as THREE from "three";
import { noise } from "@/assets/js/noise";
let geometry, material, matcapTexture;
const texLoader = new THREE.TextureLoader(); // 텍스쳐 로더
let v3 = new THREE.Vector3();
let clock = new THREE.Clock();

let noiseSettings = {
    amplitude: 0,
    scope: 0,
    speed: 0,
};

const CreateEmoject = (mesh, category, activity, length, color) => {
    // Geometry
    if (category == "anger") {
        geometry = new THREE.ConeGeometry(0.7, 1.4, 64, 64);
        // geometry = new THREE.DodecahedronGeometry(1, 10);
        // geometry = new THREE.CylinderGeometry(0.5, 1, 1, 64, 64);
        noiseSettings = { amplitude: 2 + activity * 0.1, scope: 0.5 + activity * 0.1, speed: activity * 0.15 };
    } else if (category == "fear") {
        geometry = new THREE.SphereGeometry(0.7, 64, 64);
        noiseSettings = { amplitude: 10 + activity * 0.3, scope: 0.6 + activity * 0.2, speed: activity * 0.1 };
    } else if (category == "sadness") {
        geometry = new THREE.TorusGeometry(0.5, 0.3, 64, 64);
        noiseSettings = { amplitude: 0.5 + activity * 0.3, scope: 0.5 + activity * 0.1, speed: activity * 0.1 };
    } else if (category == "disgust") {
        geometry = new THREE.ConeGeometry(1, 1.3, 128, 128);
        noiseSettings = { amplitude: 8 + activity * 0.5, scope: 0.1 + activity * 0.05, speed: activity * 0.1 };
    } else if (category == "surprise") {
        geometry = new THREE.SphereGeometry(0.8, 64, 64);
        noiseSettings = {
            amplitude: 0.5 + 0.2 * activity,
            scope: 0.3 + activity * 0.2,
            speed: 9 * 0.2,
        };
    } else if (category == "anticipation") {
        geometry = new THREE.TorusKnotGeometry(0.3, 0.4, 128, 128, 1, 4);
        noiseSettings = { amplitude: 0.1 + activity * 0.2, scope: activity * 0.2, speed: activity * 0.1 };
    } else if (category == "trust") {
        geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16, 2, 3);
        noiseSettings = { amplitude: 1 + activity * 0.1, scope: 0.2 + activity * 0.05, speed: activity * 0.1 };
    } else if (category == "joy") {
        let joyVec;
        joyVec = 5;
        // if (activity <= 3) joyVec = 3;
        // else if (activity <= 6) joyVec = 4;
        // else joyVec = 5;
        geometry = new THREE.TorusKnotGeometry(0.6, 0.15, 256, 16, 1, joyVec);
        noiseSettings = { amplitude: 1 * activity / 1, scope: 0.07 * activity, speed: activity * 0.1 };
    }


    if (length == 2) {
        matcapTexture = texLoader.load("./assets/textures/matcap/02.png");
    } else if (length == 3) {
        matcapTexture = texLoader.load("./assets/textures/matcap/03.png");
    } else if (length == 4) {
        matcapTexture = texLoader.load("./assets/textures/matcap/04.png");
    } else if (length == 5) {
        matcapTexture = texLoader.load("./assets/textures/matcap/05.png");
    } else if (length == 6) {
        matcapTexture = texLoader.load("./assets/textures/matcap/06.png");
    } else if (length == 7) {
        matcapTexture = texLoader.load("./assets/textures/matcap/07.png");
    } else if (length == 8) {
        matcapTexture = texLoader.load("./assets/textures/matcap/08.png");
    } else if (length == 9) {
        matcapTexture = texLoader.load("./assets/textures/matcap/09.png");
    } else {
        matcapTexture = texLoader.load("./assets/textures/matcap/10.png");
    }

    // matcapTexture.encoding = THREE.sRGBEncoding;

    material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(color),
        matcap: matcapTexture,
    });

    // const material = new THREE.MeshStandardMaterial()

    // material.metalness = 0.45
    // material.roughness = 0.65
    // material.color = new THREE.Color(color)
    // // material.map = matcapTexture

    // material.aoMap = matcapTexture
    // material.aoMapIntensity = 4


    // 노이즈 애니메이션을 위한 준비
    geometry.positionData = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        v3.fromBufferAttribute(geometry.attributes.position, i);
        geometry.positionData.push(v3.clone());
    }

    mesh = new THREE.Mesh(geometry, material);

    mesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2))

    return mesh;
}

const noiseAnimation = (mesh, settings) => {
    noise(mesh, clock, settings, v3);
}


export { CreateEmoject, noiseSettings, noiseAnimation }