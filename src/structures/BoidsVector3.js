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
        if (typeof vectorB !== typeof this) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        return Math.sqrt(
            Math.pow(this.x - vectorB.x, 2),
            Math.pow(this.y - vectorB.y, 2),
            Math.pow(this.z - vectorB.z, 2)
        )
    }

    // subtract(vectorB) {
    //     if (typeof vectorB !== typeof this) {
    //         throw new TypeError('Vector must be of type: ' + typeof this);
    //     }
    //     return this.copy().subtractInPlace(vectorB);
    //     // let v = this.copy();
    //     // v.subtractInPlace(vectorB);
    //     // return v;
    //     // let newArr = this.backingArray.subarray(this.offset, VALS_PER_BOID);
    //     // newArr[0] -= vectorB.x;
    //     // newArr[1] -= vectorB.y;
    //     // newArr[2] -= vectorB.z;
    //     // return new BoidsVector3(newArr, 0);
    // }

    sub(vectorB) {
        if (typeof vectorB !== typeof this) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        this.x -= vectorB.x;
        this.y -= vectorB.y;
        this.z -= vectorB.z;
        return this;
    }

    // add(vectorB) {
    //     if (typeof vectorB !== typeof this) {
    //         throw new TypeError('Vector must be of type: ' + typeof this);
    //     }
    //     return this.copy().addInPlace(vectorB);
    //     // let v = this.copy();
    //     // v.addInPlace(vectorB);
    //     // return v;
    //     // let newArr = this.backingArray.subarray(this.offset, VALS_PER_BOID);
    //     // newArr[0] += vectorB.x;
    //     // newArr[1] += vectorB.y;
    //     // newArr[2] += vectorB.z;
    //     // return BoidsVector3(newArr, 0);
    // }

    add(vectorB) {
        if (typeof vectorB !== typeof this) {
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

    asAvgWithout(vectorB) {
        if (typeof vectorB !== typeof this) {
            throw new TypeError('Vector must be of type: ' + typeof this);
        }
        this.mul(VALS_PER_BOID);
        this.sub(vectorB);
        this.div(VALS_PER_BOID - 1);
        return this;
    }

    length() {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2)
        )
    }

    copy() {
        return new BoidsVector3(this.backingArray.subarray(this.offset, VALS_PER_BOID), 0);
    }

    toString() {
        return `(${this.x},${this.y},${this.z}`;
    }



    // subtractInPlace(vectorB) {
    //     if (typeof vectorB !== typeof this) {
    //         throw new TypeError('Vector must be of type: ' + typeof this);
    //     }
    //     this.vector[0] -= vectorB.x;
    //     this.vector[1] -= vectorB.y;
    //     this.vector[2] -= vectorB.z;
    // }
}
