import { makeNoise4D } from "open-simplex-noise";

let noise4D = makeNoise4D(Date.now());

export const noise = (seletedMesh, clock, noiseSettings, v3) => {
    let t = clock.getElapsedTime();

    seletedMesh.geometry.positionData.forEach((p, idx) => {
        let setNoise = noise4D(p.x * noiseSettings.진폭, p.y * noiseSettings.진폭, p.z * noiseSettings.진폭, t * noiseSettings.속도);
        v3.copy(p).addScaledVector(p, setNoise * noiseSettings.반경);
        seletedMesh.geometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
    });

    seletedMesh.geometry.attributes.position.needsUpdate = true;
    seletedMesh.geometry.computeVertexNormals();
}