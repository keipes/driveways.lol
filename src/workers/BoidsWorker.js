import BoidsArray from "../structures/BoidsArray";
import BoidsVector3 from "../structures/BoidsVector3";
import {RESET_MSG, INIT_MSG, DIRTY_MSG, STATUS_MSG, DATA_MSG} from "./BoidsWorkerMsg";

let boidsWorker = undefined;
class BoidsWorker {
    constructor(data) {
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
            v.add(this.avoidOthers(i));
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

    avoidOthers(i) {
        const minDistance = this.data.minDistance;
        const v = BoidsVector3.createNew();
        let p = this.boids.getPosition(i);
        let p2;
        for (let j = 0; j < this.boids.count(); j++) {
            if (j !== i) {
                p2 = this.boids.getPosition(j);
                if (p.distance(p2) < minDistance) {
                    v.add(p.copyOf().sub(p2));
                }
            }
        }
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
