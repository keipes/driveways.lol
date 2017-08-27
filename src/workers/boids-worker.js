import BoidsArray from "../structures/BoidsArray";
import BoidsVector3 from "../structures/BoidsVector3";
import {VALS_PER_BOID} from "../structures/BoidsConstants";

console.log('worker loaded');

let boidsWorker = undefined;
class BoidsWorker {
    constructor(buffer) {
        console.log('BoidsWorker loaded');
        this.boidsArray = new BoidsArray(buffer);
        this.velocities = new Float32Array(this.boidsArray.numBoids() * VALS_PER_BOID);
        this.storedVectors = [];
        let position;
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            position = this.boidsArray.getPositionVector(i);
            position.x = (Math.random() - 0.5) * 20;
            position.y = (Math.random() - 0.5) * 20;
            position.z = (Math.random() - 0.5) * 20;
            // this.boidsArray.setBoidX(i, (Math.random() - 0.5) * 20);
            // this.boidsArray.setBoidY(i, (Math.random() - 0.5) * 20);
            // this.boidsArray.setBoidZ(i, (Math.random() - 0.5) * 20);
        }
        this.boidsArray.getPositionVector(0);
        console.log(this.velocities);
        this.doLogic();
        this.logBoids();
    }

    logBoids() {
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            console.log(`boid ${i} \n\tp: ${this.boidsArray.getPositionVector(i)}\n\tv: ${this.getVelocityVector(i)}`);
        }
    }

    doLogic() {
        const com = this.getCenterOfMass();
        const swarmVelocity = this.getSwarmVelocity();
        // console.log(swarmVelocity);
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            const v1 = this.moveToCOM(i, com);
            const v2 = this.avoidOthers(i);
            const v3 = this.matchSwarmVelocity(i, swarmVelocity);
            // const v2 = new Float32Array(this.dimensions);
            // const velocity = this.getVelocityVector(i);
            // const velocityB = this.getVelocityVector(i);
            // if (velocity === velocityB && !done) {
            //     console.log(`velocity vectors equal each other: ${velocityB === velocity}`);
            //     done = true;
            // }
            let v = this.getVelocityVector(i);
            v.add(v1);
            v.add(v2);
            v.add(v3);
            BoidsWorker.limitSpeed(v, 20);
            // this.setVelX(i, this.getVelX(i) + v1[0] + v2[0] + v3[0]);
            // this.setVelY(i, this.getVelY(i) + v1[1] + v2[1] + v3[1]);
            // this.setVelZ(i, this.getVelZ(i) + v1[2] + v2[2] + v3[2]);
            let p = this.boidsArray.getPositionVector(i);
            p.add(v);
            //
            // this.boidsArray.setBoidX(i, this.boidsArray.getBoidX(i) + this.getVelX(i));
            // this.boidsArray.setBoidY(i, this.boidsArray.getBoidY(i) + this.getVelY(i));
            // this.boidsArray.setBoidZ(i, this.boidsArray.getBoidZ(i) + this.getVelZ(i));
        }
        // console.log(`com: (${com[0]}, ${com[1]}, ${com[2]})`);
        // console.log(this.boidsArray.getBoidX(0));
        setTimeout(this.doLogic.bind(this), 16);
        // this.logBoids();
    }

    static limitSpeed(v, max) {
        const speed = v.length();
        if (speed > max) {
            v.div(speed).mul(max);
        }
    }

    getVelocityVector(i) {
        if (this.storedVectors[i] === undefined) {
            this.storedVectors[i] = new BoidsVector3(this.velocities, i * VALS_PER_BOID);
        }
        return this.storedVectors[i];
        // return new BoidsVector3(this.velocities, i * this.dimensions);
    }

    // getVelX(i) {
    //     return this.velocities[i * this.dimensions];
    // }
    //
    // setVelX(i, x) {
    //     this.velocities[i * this.dimensions] = x;
    // }
    //
    // getVelY(i) {
    //     return this.velocities[i * this.dimensions + 1];
    // }
    //
    // setVelY(i, y) {
    //     this.velocities[i * this.dimensions + 1] = y;
    // }
    //
    // getVelZ(i) {
    //     return this.velocities[i * this.dimensions + 2];
    // }
    //
    // setVelZ(i, z) {
    //     this.velocities[i * this.dimensions + 2] = z;
    // }

    getCenterOfMass() {
        let com = BoidsVector3.createNew();
        let position;
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            position = this.boidsArray.getPositionVector(i);
            com.add(position);
            // com[0] += this.boidsArray.getBoidX(i);
            // com[1] += this.boidsArray.getBoidY(i);
            // com[2] += this.boidsArray.getBoidZ(i);
        }
        com.div(this.boidsArray.numBoids());
        // com[0] = com[0] / this.boidsArray.numBoids();
        // com[1] = com[1] / this.boidsArray.numBoids();
        // com[2] = com[2] / this.boidsArray.numBoids();
        return com;
    }

    getSwarmVelocity() {
        let vel = new BoidsVector3(new Float32Array(VALS_PER_BOID), 0);
        // let vel = new Float32Array(this.dimensions);
        // let v;
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            vel.add(this.getVelocityVector(i));
            // vel[0] += this.getVelX(i);
            // vel[1] += this.getVelY(i);
            // vel[2] += this.getVelZ(i);
        }
        return vel;
    }

    matchSwarmVelocity(i, swarmVelocity) {
        const factor = 8;
        // let v = new BoidsVector3(new Float32Array(VALS_PER_BOID), 0);
        // let v = swarmVelocity.copy();
        return swarmVelocity.copy().asAvgWithout(this.getVelocityVector(i)).div(factor);
        // let v = swarmVelocity.sub(this.getVelocityVector(i));
        // v.x = this.normalizeAvg(swarmVelocity[0], this.getVelX(i));
        // v.y = this.normalizeAvg(swarmVelocity[1], this.getVelY(i));
        // v.z = this.normalizeAvg(swarmVelocity[2], this.getVelZ(i));
        // v.subtractInPlace(this.getVelocityVector(i));
        // v.div(factor);
        // let perceivedSwarmVelocity = new Float32Array(this.dimensions);
        // perceivedSwarmVelocity[0] = this.normalizeAvg(swarmVelocity[0], this.getVelX(i));
        // perceivedSwarmVelocity[1] = this.normalizeAvg(swarmVelocity[1], this.getVelY(i));
        // perceivedSwarmVelocity[2] = this.normalizeAvg(swarmVelocity[2], this.getVelZ(i));
        // let v = new Float32Array(this.dimensions);
        // v[0] = (perceivedSwarmVelocity[0] - this.getVelX(i)) / factor;
        // v[1] = (perceivedSwarmVelocity[1] - this.getVelY(i)) / factor;
        // v[2] = (perceivedSwarmVelocity[2] - this.getVelZ(i)) / factor;
        // return v;
    }

    moveToCOM(i, com) {
        const factor = 100;
        // let perceivedCOM = BoidsVector3.createNew();
        // perceivedCOM.asAvgWithout(this.boidsArray.getPositionVector(i));
        // return perceivedCOM.sub(this.boidsArray.getPositionVector(i))
        let p = this.boidsArray.getPositionVector(i);
        let perceivedCOM = com.copy().asAvgWithout(p);
        return perceivedCOM.sub(p).div(factor);
        // let perceivedCOM = new Float32Array(this.dimensions);
        // perceivedCOM[0] = this.normalizeAvg(com[0], this.boidsArray.getBoidX(i));
        // perceivedCOM[1] = this.normalizeAvg(com[1], this.boidsArray.getBoidY(i));
        // perceivedCOM[2] = this.normalizeAvg(com[2], this.boidsArray.getBoidZ(i));
        // com.copy().asAvgWithout(this.boidsArray.getPositionVector(i)).div(factor);
        //
        // let v = new Float32Array(this.dimensions);
        // v[0] = (perceivedCOM[0] - this.boidsArray.getBoidX(i)) / factor;
        // v[1] = (perceivedCOM[1] - this.boidsArray.getBoidY(i)) / factor;
        // v[2] = (perceivedCOM[2] - this.boidsArray.getBoidZ(i)) / factor;
        // return new BoidsVector3(v, 0);
    }

    avoidOthers(i) {
        const minDistance = 1;
        // const v = this.getVelocityVector(i);
        const v = BoidsVector3.createNew();
        let p = this.boidsArray.getPositionVector(i);
        let p2;
        // let distance;
        // let v = new Float32Array(this.dimensions);
        for (let j = 0; j < this.boidsArray.numBoids(); j++) {
            if (j !== i) {
                // distance =
                // const distance = this.distance(i, j);
                p2 = this.boidsArray.getPositionVector(j);
                if (p.distance(p2) < minDistance) {
                    v.sub(p).sub(p2);
                    // v[0] = v[0] - (this.boidsArray.getBoidX(i) - this.boidsArray.getBoidX(j));
                    // v[1] = v[1] - (this.boidsArray.getBoidY(i) - this.boidsArray.getBoidY(j));
                    // v[2] = v[2] - (this.boidsArray.getBoidZ(i) - this.boidsArray.getBoidZ(j));
                }
            }
        }
        return v;
    }

    // distance(i, j) {
    //     return Math.sqrt(
    //         Math.pow(this.boidsArray.getBoidX(i) - this.boidsArray.getBoidX(j), 2) +
    //         Math.pow(this.boidsArray.getBoidY(i) - this.boidsArray.getBoidY(j), 2) +
    //         Math.pow(this.boidsArray.getBoidZ(i) - this.boidsArray.getBoidZ(j), 2)
    //     )
    // }
    //
    // normalizeAvg(com, valToRemove) {
    //     if (this.boidsArray.numBoids() < 2) {
    //         return com;
    //     }
    //     return (com * this.boidsArray.numBoids() - valToRemove) / (this.boidsArray.numBoids() - 1);
    // }
}

self.addEventListener('message', (msg) => {
    switch (msg.data.type) {
        case 'init':
            boidsWorker = new BoidsWorker(msg.data.buffer);
            break;
        default:
            console.error('received unknown message');
            console.error(msg);
            break;
    }
});