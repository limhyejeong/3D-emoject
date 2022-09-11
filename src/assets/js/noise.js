import { makeNoise4D } from "open-simplex-noise";

let noise4D = makeNoise4D(Date.now());

export const noise = (seletedMesh, clock, 진폭, 반경, 속도, v3) => {
    let t = clock.getElapsedTime();

    seletedMesh.geometry.positionData.forEach((p, idx) => {
        let setNoise = noise4D(p.x * 진폭, p.y * 진폭, p.z * 진폭, t * 속도);
        v3.copy(p).addScaledVector(p, setNoise * 반경);
        seletedMesh.geometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
    });

    seletedMesh.rotation.y += 0.01;
    seletedMesh.geometry.computeVertexNormals();
    seletedMesh.geometry.attributes.position.needsUpdate = true;
}