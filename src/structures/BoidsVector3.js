import {BOID_X, BOID_Y, BOID_Z, VALS_PER_BOID} from "./BoidsConstants";

export default class BoidsVector3 {

    static createNew() {
        return new BoidsVector3(new Float32Array(VALS_PER_BOID).fill(0), 0);
    }

    constructor(backingArray, offset) {
        this.backingArray = backingArray;
        this.offset = offset;
        this.offsetX = offset + BOID_X;
        this.offsetY = offset + BOID_Y;
        this.offsetZ = offset + BOID_Z;

    }

    get x() {
        return this.backingArray[this.offsetX];
    }

    set x(x) {
        this.backingArray[this.offset + BOID_X] = x;
        // if (isNaN(this.x)) {
        //     throw new Error('x is not a number');
        // }
    }

    set xUnsafe(x) {
        this.backingArray[this.offset + BOID_X] = x;
    }

    get y() {
        return this.backingArray[this.offsetY];
    }

    set y(y) {
        this.backingArray[this.offsetY] = y;
        // if (isNaN(this.y)) {
        //     throw new Error('y is not a number');
        // }
    }

    get z() {
        return this.backingArray[this.offsetZ];
    }

    set z(z) {
        this.backingArray[this.offsetZ] = z;
        // if (isNaN(this.z)) {
        //     throw new Error('z is not a number');
        // }
    }

    distance(vectorB) {
        // if (!vectorB instanceof BoidsVector3) {
        //     throw new TypeError('Vector must be of type: ' + typeof this);
        // }
        return Math.sqrt(
            Math.pow(this.x - vectorB.x, 2) +
            Math.pow(this.y - vectorB.y, 2) +
            Math.pow(this.z - vectorB.z, 2)
        )
    }

    distanceUnsafe(vectorB) {
        // if (!vectorB instanceof BoidsVector3) {
        //     throw new TypeError('Vector must be of type: ' + typeof this);
        // }
        return Math.abs(this.x - vectorB.x) + Math.abs(this.y - vectorB.y) + Math.abs(this.z + vectorB.z);
        // return Math.sqrt(
        //     Math.pow(this.x - vectorB.x, 2) +
        //     Math.pow(this.y - vectorB.y, 2) +
        //     Math.pow(this.z - vectorB.z, 2)
        // )
    }

    sub(vectorB) {
        // if (!vectorB instanceof BoidsVector3) {
        //     throw new TypeError('Vector must be of type: ' + typeof this);
        // }
        this.x -= vectorB.x;
        this.y -= vectorB.y;
        this.z -= vectorB.z;
        return this;
    }

    add(vectorB) {
        this.x += vectorB.x;
        this.y += vectorB.y;
        this.z += vectorB.z;
        return this;
    }

    mul(factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    }

    div(factor) {
        this.x /= factor;
        this.y /= factor;
        this.z /= factor;
        return this;
    }

    asAvgWithout(vectorB, len) {
        this.mul(len);
        this.sub(vectorB);
        this.div(len - 1);
        return this;
    }

    get length() {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2)
        )
    }

    copyOf() {
        const c = BoidsVector3.createNew();
        c.add(this);
        return c;
    }

    toString() {
        return `(${this.x},${this.y},${this.z}`;
    }

    setZero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    limitLength(max) {
        const l = this.length;
        if (l > max) {
            this.div(l).mul(max);
        }
    }

    equals(vectorB) {
        return this.x === vectorB.x &&
            this.y === vectorB.y &&
            this.z === vectorB.z;
    }

    equalsRounded(vectorB) {
        return Math.round(this.x) === Math.round(vectorB.x) &&
            Math.round(this.y) === Math.round(vectorB.y) &&
            Math.round(this.z) === Math.round(vectorB.z);
    }
}
