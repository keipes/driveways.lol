import BoidsArray from "../structures/BoidsArray";
import BoidsVector3 from "../structures/BoidsVector3";
import {RESET_MSG, INIT_MSG, DIRTY_MSG, STATUS_MSG, DATA_MSG} from "./BoidsWorkerMsg";

let boidsWorker = undefined;

//     var self = {
//         addEventListener: ()  => {},
//         postMessage: () => {}
//     };

export default class BoidsWorker {
    constructor(data) {
        this.boids = new BoidsArray(data.positionBuffer, data.velocityBuffer);
        this.data = data;
        this.reset();
        self.postMessage({type: STATUS_MSG, status: 'initialized'});
        this.distances = new Float32Array(this.boids.count());
        // this.distances[i] = [];
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
        const com = this.boids.avgPosition();
        const cov = this.boids.avgVelocity();
        let oldV;
        let oldP;
        for (let i = 0; i < this.boids.count(); i++) {
            v = this.boids.getVelocity(i);
            oldV = this.boids.getVelocity(i).copyOf();
            oldP = this.boids.getPosition(i).copyOf();
            const v1 = this.moveTowards(i, com);
            v.add(v1);
            const v2 = this.avoidOthers(i);
            v.add(v2);
            const v3 = this.matchSwarmVelocity(i, cov);
            v.add(v3);
            const v4 = this.moveTowards(i, center);
            v.add(v4);

            if (!this.boids.getPosition(i).equals(oldP)) {
                throw new Error("Position was mutated!");
            }
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

    warmupDistances(i) {
        let p = this.boids.getPosition(i);
        let p2;
        for (let j = 0; j < this.boids.count(); j++) {
            p2 = this.boids.getPosition(j);
            this.distances[j] = p.distance(p2);
        }
    }

    avoidOthers2(i) {
        const minDistance = this.data.minDistance;
        const v = BoidsVector3.createNew();
        let p = this.boids.getPosition(i);
        let p2;
        for (let j = 0; j < this.boids.count(); j++) {
            if (j !== i) {
                if (this.distances[j] < minDistance) {
                    v.add(this.boids.getPosition(j));
                    // v.add(p.copyOf().sub(this.boids.getPosition(j)));
                    // v.sub(this.boids.getPosition(j).copyOf().add(p));
                }
            }
        }
        v.div(this.boids.count());
        return p.copyOf().sub(v);
        // for (let j = 0; j < i; j++) {
        //     if (this.distances[j] < minDistance) {
        //         v.add(p.copyOf().sub(this.boids.getPosition(j)));
        //     }
        // }
        // for (let j = i; j < this.boids.count(); j++) {
        //     if (this.distances[j] < minDistance) {
        //         v.add(p.copyOf().sub(this.boids.getPosition(j)));
        //     }
        // }
        return v;
    }
}

self.addEventListener('message', (msg) => {
    switch (msg.data.type) {
        case INIT_MSG:
            boidsWorker = new BoidsWorker(msg.data);
            boidsWorker.think();
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

