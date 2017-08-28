import {BOID_X, BOID_Y, BOID_Z, VALS_PER_BOID} from "./BoidsConstants";

export default class BoidsVector3 {

    static createNew() {
        return new BoidsVector3(new Float32Array(VALS_PER_BOID).fill(0), 0);
    }

    constructor(backingArray, offset) {
        this.backingArray = backingArray;
        this.offset = offset;
    }

    get x() {
        return this.backingArray[this.offset + BOID_X];
    }

    set x(x) {
        this.backingArray[this.offset + BOID_X] = x;
        if (isNaN(this.x)) {
            throw new Error('x is not a number');
        }
    }

    get y() {
        return this.backingArray[this.offset + BOID_Y];
    }

    set y(y) {
        this.backingArray[this.offset + BOID_Y] = y;
        if (isNaN(this.y)) {
            throw new Error('y is not a number');
        }
    }

    get z() {
        return this.backingArray[this.offset + BOID_Z];
    }

    set z(z) {
        this.backingArray[this.offset + BOID_Z] = z;
        if (isNaN(this.z)) {
            throw new Error('z is not a number');
        }
    }

    distance(vectorB) {
        if (!vectorB instanceof BoidsVector3) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        return Math.sqrt(
            Math.pow(this.x - vectorB.x, 2) +
            Math.pow(this.y - vectorB.y, 2) +
            Math.pow(this.z - vectorB.z, 2)
        )
    }

    sub(vectorB) {
        if (!vectorB instanceof BoidsVector3) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        this.x -= vectorB.x;
        this.y -= vectorB.y;
        this.z -= vectorB.z;
        return this;
    }

    add(vectorB) {
        if (!vectorB instanceof BoidsVector3) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
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
        if (!vectorB instanceof BoidsVector3) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        if (len === undefined) {
            throw new TypeError('Length must be defined.');
        }
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
        if (!vectorB instanceof BoidsVector3) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        return this.x === vectorB.x &&
            this.y === vectorB.y &&
            this.z === vectorB.z;
    }
}
