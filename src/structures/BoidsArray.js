
import BoidsVector3 from "./BoidsVector3";
import {VALS_PER_BOID} from "./BoidsConstants";

export default class BoidsArray {

    static create(length) {
        return new BoidsArray(
            new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * VALS_PER_BOID * length),
            new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * VALS_PER_BOID * length)
        );
    }

    constructor(positionBuffer, velocityBuffer) {
        if (positionBuffer.byteLength !== velocityBuffer.byteLength) {
            throw new Error('Buffers must be of equal length');
        }
        this.positionBuffer = positionBuffer;
        this.positionArray = new Float32Array(this.positionBuffer);
        this.velocityBuffer = velocityBuffer;
        this.velocityArray = new Float32Array(this.velocityBuffer);
        this.length = this.positionBuffer.byteLength / Float32Array.BYTES_PER_ELEMENT / VALS_PER_BOID;
        this.positionVectors = [];
        this.velocityVectors = [];
        if (isNaN(this.length)) {
            throw new Error('length NaN');
        }
        for (let i = 0; i < this.count(); i++) {
            this.positionVectors[i] = new BoidsVector3(this.positionArray, i * VALS_PER_BOID);
            this.velocityVectors[i] = new BoidsVector3(this.velocityArray, i * VALS_PER_BOID);
        }
    }

    getPositionBuffer() {
        return this.positionBuffer;
    }

    getVelocityBuffer() {
        return this.velocityBuffer;
    }

    count() {
        return this.length;
    }

    getPosition(i) {
        return this.positionVectors[i];
    }

    getX(i) {
        return this.positionArray[i * VALS_PER_BOID];
    }

    getVelocity(i) {
        if (this.velocityVectors[i] === undefined) {
            this.velocityVectors[i] = new BoidsVector3(this.velocityArray, i * VALS_PER_BOID);
        }
        return this.velocityVectors[i];
    }

    avgPosition() {
        let p = BoidsVector3.createNew();
        for (let i = 0; i < this.count(); i++) {
            p.add(this.getPosition(i));
        }
        p.div(this.count());
        return p;
    }

    avgVelocity() {
        let v = BoidsVector3.createNew();
        for (let i = 0; i < this.count(); i++) {
            v.add(this.getVelocity(i));
        }
        v.div(this.count());
        return v;
    }
}
