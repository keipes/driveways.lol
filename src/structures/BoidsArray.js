
import BoidsVector3 from "./BoidsVector3";
import {VALS_PER_BOID} from "./BoidsConstants";
// import {BOID_X, BOID_Y, BOID_Z, VALS_PER_BOID} from "./BoidsConstants";

export default class BoidsArray {

    static createWithNewBuffer(length) {
        console.log('initializing new backing buffer');
        return new BoidsArray(new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * VALS_PER_BOID * length));
    }

    constructor(backingBuffer) {
        console.log('initializing from shared buffer');
        // this.intsPerBoid = 3;
        this.sharedBuffer = backingBuffer;
        this.intLength = this.sharedBuffer.byteLength / Float32Array.BYTES_PER_ELEMENT;
        this.length = this.intLength / VALS_PER_BOID;
        this.sharedArray = new Float32Array(this.sharedBuffer);
        this.vectors = [];
        if (isNaN(this.length)) {
            throw new Error('length NaN');
        }
        if (isNaN(this.intLength)) {
            throw new Error('intLength NaN');
        }
        console.debug('I have ' + this.length + ' boids.');
        console.debug('I have ' + this.intLength + ' ints.');
        console.debug('My sharedBuffer is ' + this.sharedBuffer);
        console.debug('My sharedBuffer has ' + this.sharedBuffer.byteLength + ' bytes.');
        console.debug('My sharedArray is ' + this.sharedArray);
    }

    getBuffer() {
        return this.sharedBuffer;
    }

    numBoids() {
        return this.length;
    }

    // getBoidX(i) {
    //     return this.sharedArray[i * VALS_PER_BOID + BOID_X];
    // }
    //
    // setBoidX(i, x) {
    //     this.sharedArray[i * VALS_PER_BOID + BOID_X] = x;
    // }
    //
    // getBoidY(i) {
    //     return this.sharedArray[i * VALS_PER_BOID + BOID_Y];
    // }
    //
    // setBoidY(i, y) {
    //     this.sharedArray[i * VALS_PER_BOID + BOID_Y] = y;
    // }
    //
    // getBoidZ(i) {
    //     return this.sharedArray[i * VALS_PER_BOID + BOID_Z];
    // }
    //
    // setBoidZ(i, z) {
    //     this.sharedArray[i * VALS_PER_BOID + BOID_Z] = z;
    // }

    getPositionVector(i) {
        if (this.vectors[i] === undefined) {
            this.vectors[i] = new BoidsVector3(this.sharedArray, i * VALS_PER_BOID);
        }
        return this.vectors[i];
    }

    // validate() {
    //     this.sharedArray.forEach((v) => {
    //         if (isNaN(v)) {
    //
    //         }
    //     })
    // }
}
