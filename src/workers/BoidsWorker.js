import BoidsArray from "../structures/BoidsArray";
import BoidsVector3 from "../structures/BoidsVector3";
import {RESET_MSG, INIT_MSG, DIRTY_MSG, STATUS_MSG, DATA_MSG} from "./BoidsWorkerMsg";

console.log('worker loaded');

let boidsWorker = undefined;
class BoidsWorker {
    constructor(data) {
        console.log('BoidsWorker loaded');
        this.boids = new BoidsArray(data.positionBuffer, data.velocityBuffer);
        this.data = data;
        this.reset();
        this.think();
        self.postMessage({type: STATUS_MSG, status: 'initialized'});
    }

    mergeData(data) {
        Object.assign(this.data, data);
    }

    reset() {
        let position;
        let velocity;
        for (let i = 0; i < this.boids.count(); i++) {
            position = this.boids.getPosition(i);
            position.x = (Math.random() - 0.5) * 1000;
            position.y = (Math.random() - 0.5) * 1000;
            position.z = (Math.random() - 0.5) * 1000;
            velocity = this.boids.getVelocity(i);
            velocity.setZero();
        }
    }

    logBoids() {
        let p;
        let v;
        for (let i = 0; i < this.boids.count(); i++) {
            p = this.boids.getPosition(i);
            v = this.boids.getVelocity(i);
            console.log(`boid ${i} \n\tp: ${p}\n\tv: ${v}\n\tvel: ${v.length}`);
        }
    }

    think() {

        let center = BoidsVector3.createNew();
        let v;
        for (let i = 0; i < this.boids.count(); i++) {
            const com = this.boids.avgPosition();
            const cov = this.boids.avgVelocity();
            v = this.boids.getVelocity(i);
            const v1 = this.moveTowards(i, com);
            v.add(v1);
            this.avoidOthers(i);
            const v3 = this.matchSwarmVelocity(i, cov);
            v.add(v3);
            const v4 = this.moveTowards(i, center);
            v.add(v4);

            v.limitLength(this.data.maxSpeed);
            this.boids.getPosition(i).add(v);
        }
        self.postMessage({type: DIRTY_MSG});
        setTimeout(this.think.bind(this), 16);
    }

    matchSwarmVelocity(i, swarmVelocity) {
        const v = this.boids.getVelocity(i);
        return swarmVelocity.copyOf().asAvgWithout(v, this.boids.count()).sub(v).div(this.data.swarmFactor);
    }

    moveTowards(i, com) {
        const factor = 100;
        let p = this.boids.getPosition(i);
        let perceivedCOM = com.copyOf().asAvgWithout(p, this.boids.count());
        return perceivedCOM.sub(p).div(factor);
    }

    // moveTowards(i) {
    //     const factor = 100;
    //     const com = BoidsVector3.createNew();
    //     for (let j = 0; j < this.boidsArray.numBoids(); j++) {
    //         if (i !== j) {
    //             com.add(this.boidsArray.getPositionVector(j));
    //         }
    //     }
    //     com.div(this.boidsArray.numBoids() - 1);
    //     let p = this.boidsArray.getPositionVector(i);
    //     return com.sub(p).div(factor);
    //     // let perceivedCOM = com.copyOf().asAvgWithout(p, this.boidsArray.numBoids());
    //     // return perceivedCOM.sub(p).div(factor);
    // }


    avoidOthers(i) {
        const minDistance = this.data.minDistance;
        const v = BoidsVector3.createNew();
        let p = this.boids.getPosition(i);
        let p2;
        for (let j = 0; j < this.boids.count(); j++) {
            if (j !== i) {
                p2 = this.boids.getPosition(j);
                // const dist = this.getStoredDistance(i, j);
                // const distDirect = p.distance(p2);
                // const iSum = BoidsWorker.geometricSum(i-1);
                // const jSum = BoidsWorker.geometricSum(j-1);
                // let idx = BoidsWorker.getStoredDistIdx(i, j);
                // if (Math.abs(dist - distDirect) > 0.01) {
                //     throw new Error('distance compute failed');
                // }
                // let d;
                // d = p.distance(p2);
                if (p.distance(p2) < minDistance) {
                    v.sub(p.copyOf().sub(p2));
                }
            }
        }
        // v.div(this.boidsArray.numBoids());
        // v.limitLength(10);
        p.sub(v);
        return v;
    }
}

self.addEventListener('message', (msg) => {
    switch (msg.data.type) {
        case INIT_MSG:
            boidsWorker = new BoidsWorker(msg.data);
            break;
        case RESET_MSG:
            boidsWorker.reset();
            break;
        case DATA_MSG:
            boidsWorker.mergeData(msg.data);
            break;
        default:
            console.error('received unknown message');
            console.error(msg);
            break;
    }
});
