import { makeNoise4D } from "open-simplex-noise";

let noise4D = makeNoise4D(Date.now());

export const noise = (seletedMesh, clock, noiseSettings, v3) => {
    let t = clock.getElapsedTime();

    seletedMesh.geometry.positionData.forEach((p, idx) => {
        let setNoise = noise4D(p.x * noiseSettings.amplitude, p.y * noiseSettings.amplitude, p.z * noiseSettings.amplitude, t * noiseSettings.speed);
        v3.copy(p).addScaledVector(p, setNoise * noiseSettings.scope);
        seletedMesh.geometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
    });

    seletedMesh.geometry.attributes.position.needsUpdate = true;
    seletedMesh.geometry.computeVertexNormals();
}