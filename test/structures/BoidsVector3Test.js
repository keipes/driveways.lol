import {expect} from 'chai';
import MockBrowser from '../util/MockBrowser';
import BoidsVector3 from "../../src/structures/BoidsVector3";
import {BOID_X, BOID_Y, BOID_Z, VALS_PER_BOID} from "../../src/structures/BoidsConstants";
import BoidsArray from "../../src/structures/BoidsArray";

MockBrowser.mock();

describe('BoidsVector3', () => {
    const length = 3;
    let backingArray;
    let v1;
    let v2;
    let v3;
    const initVectors = () => {
        backingArray = new Float32Array(VALS_PER_BOID * length).fill(0);
        v1 = new BoidsVector3(backingArray, 0);
        v2 = new BoidsVector3(backingArray, VALS_PER_BOID);
        v3 = new BoidsVector3(backingArray, VALS_PER_BOID * 2);
    };
    beforeEach(initVectors);
    it('should store backingArray by reference', () => {
        expect(v1.backingArray).to.eq(v2.backingArray);
    });

    describe('.x', () => {
        it('should update correct position in backing array', () => {
            v1.x = 1;
            v2.x = 2;
            v3.x = 3;
            expect(backingArray[BOID_X]).to.eq(v1.x);
            expect(backingArray[VALS_PER_BOID + BOID_X]).to.eq(v2.x);
            expect(backingArray[VALS_PER_BOID * 2 + BOID_X]).to.eq(v3.x);
        });
        it('should set and get', () => {
            const val = 4;
            v1.x = val;
            expect(v1.x).to.eq(val);
        });
    });

    describe('.y', () => {
        it('should update correct position in backing array', () => {
            v1.y = 4;
            v2.y = 5;
            v3.y = 6;
            expect(backingArray[BOID_Y]).to.eq(v1.y);
            expect(backingArray[VALS_PER_BOID + BOID_Y]).to.eq(v2.y);
            expect(backingArray[VALS_PER_BOID * 2 + BOID_Y]).to.eq(v3.y);
        });
        it('should set and get', () => {
            const val = 4;
            v1.y = val;
            expect(v1.y).to.eq(val);
        });
    });

    describe('.z', () => {
        it('should update correct position in backing array', () => {
            v1.z = 7;
            v2.z = 8;
            v3.z = 9;
            expect(backingArray[BOID_Z]).to.eq(v1.z);
            expect(backingArray[VALS_PER_BOID + BOID_Z]).to.eq(v2.z);
            expect(backingArray[VALS_PER_BOID * 2 + BOID_Z]).to.eq(v3.z);
        });
        it('should set and get', () => {
            const val = 4;
            v1.z = val;
            expect(v1.z).to.eq(val);
        });
    });

    describe('#distance', () => {
        it('should find distances between vectors', () => {
            v1.x = 10;
            v1.y = 10;
            v1.z = 10;
            v2.x = -10;
            v2.y = -10;
            v2.z = -10;
            const expectedDistance = Math.round(Math.sqrt(3) * 20);
            const receivedDistance = Math.round(v1.distance(v2));
            expect(receivedDistance).to.eq(expectedDistance);
        });
    });

    describe('#sub', () => {
        it('should subtract vectors', () => {
            const vExpected = BoidsVector3.createNew();
            v1.x = -4;
            v2.x = 5;
            vExpected.x = -9;
            v1.y = 3;
            v2.y = -4;
            vExpected.y = 7;
            v1.z = 100;
            v2.z = -50;
            vExpected.z = 150;
            v1.sub(v2);
            expect(v1.x).to.eq(vExpected.x);
            expect(v1.y).to.eq(vExpected.y);
            expect(v1.z).to.eq(vExpected.z);
        });
        it('should not modify entire backing array', () => {
            v2.x = 3;
            v1.sub(v3);
            expect(v2.x).to.eq(3);
        });
    });

    describe('#add', () => {
        it('should add vectors', () => {
            const vExpected = BoidsVector3.createNew();
            v1.x = -4;
            v2.x = 5;
            vExpected.x = 1;
            v1.y = 3;
            v2.y = -4;
            vExpected.y = -1;
            v1.z = 100;
            v2.z = -50;
            vExpected.z = 50;
            v1.add(v2);
            expect(v1.x).to.eq(vExpected.x);
            expect(v1.y).to.eq(vExpected.y);
            expect(v1.z).to.eq(vExpected.z);
        });
        it('should not modify entire backing array', () => {
            v2.x = 3;
            v1.add(v3);
            expect(v2.x).to.eq(3);
        });
    });

    describe('#div', () => {
        it('should divide vectors', () => {
            v1.x = 2;
            v1.y = 4;
            v1.z = 6;
            v1.div(2);
            expect(v1.x).to.eq(1);
            expect(v1.y).to.eq(2);
            expect(v1.z).to.eq(3);
        });
        it('should not modify entire backing array', () => {
            v2.x = 3;
            v1.div(2);
            expect(v2.x).to.eq(3);
        });
    });

    describe('#mul', () => {
        it('should multiply vectors', () => {
            v1.x = 1;
            v1.y = 2;
            v1.z = 3;
            v1.mul(2);
            expect(v1.x).to.eq(2);
            expect(v1.y).to.eq(4);
            expect(v1.z).to.eq(6);
        });
        it('should not modify entire backing array', () => {
            v2.x = 3;
            v1.mul(2);
            expect(v2.x).to.eq(3);
        });
    });

    describe('#asAvgWithout', () => {
        it('should compute average without one vector', () => {
            let l = 6;
            const boidsArray = BoidsArray.create(l);
            const boidsArray2 = BoidsArray.create(l - 1);
            for (let i = 0; i < l; i++) {
                boidsArray.getPosition(i).x = i * 10;
                boidsArray.getPosition(i).y = i * 4;
                boidsArray.getPosition(i).z = i * -3;
                if (i < l - 1) {
                    boidsArray2.getPosition(i).x = i * 10;
                    boidsArray2.getPosition(i).y = i * 4;
                    boidsArray2.getPosition(i).z = i * -3;
                }
            }
            const comA = boidsArray.avgPosition();
            const comB = comA.copyOf().asAvgWithout(boidsArray.getPosition(l - 1), l);
            const comC = boidsArray2.avgPosition();
            expect(comA.x).not.to.eq(comB.x);
            expect(comA.y).not.to.eq(comB.y);
            expect(comA.z).not.to.eq(comB.y);
            expect(comB.x).to.eq(comC.x);
            expect(comB.y).to.eq(comC.y);
            expect(comB.z).to.eq(comC.z);
        });
    });

    describe('.length', () => {
        it ('should compute length', () => {
            v1.x = 100;
            v1.y = 100;
            v1.z = 100;
            expect(v1.length).to.eq(Math.sqrt(3) * 100);
        });
    });

    describe('#copyOf', () => {
        it('should not duplicate backing array', () => {
            const vCopy = v1.copyOf();
            expect(vCopy.backingArray).not.to.eq(v1.backingArray);
        });
        it('should create minimal backing array', () => {
            const vCopy = v1.copyOf();
            expect(vCopy.backingArray.length).to.eq(VALS_PER_BOID);
        });
    });

    describe('#setZero', () => {
        it('should reset values to zero', () => {
            v1.x = 20;
            v1.y = 13;
            v1.z = 10;
            v1.setZero();
            expect(v1.x).to.eq(0);
            expect(v1.y).to.eq(0);
            expect(v1.z).to.eq(0);
        });
        it('should not reset entire array', () => {
            v2.x = 2;
            v1.setZero();
            expect(v2.x).to.eq(2);
        });
    });

    describe('#limitLength', () => {
        it('should limit the length of a vector', () => {
            const vCopy = v1.copyOf();
            vCopy.x = 100;
            vCopy.y = 30;
            vCopy.z = -333;
            vCopy.limitLength(10);
            const received = Math.round(vCopy.length);
            expect(received).to.eq(10);
        });
        it('should not modify entire backing array', () => {
            v1.x = 1000;
            v2.x = 1000;
            v1.limitLength(10);
            expect(v2.x).to.eq(1000);
        });
    });

    describe('#equals', () => {
        it('should return true for equal vectors', () => {
            v1.x = 1;
            v1.y = 2;
            v1.z = 3;
            v2.x = v1.x;
            v2.y = v1.y;
            v2.z = v1.z;
            expect(v1.equals(v2)).to.eq(true);
        });
        it('should return false for inequal vectors', () => {
            v1.x = 1;
            v1.y = 1;
            v1.z = 1;
            v2.x = 2;
            v2.y = 2;
            v2.z = 2;
            expect(v1.equals(v2)).to.eq(false);
        });
    });
});
