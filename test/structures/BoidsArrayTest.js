import BoidsArray from '../../src/structures/BoidsArray'
// import {assert} from 'chai';
import {before, describe, it} from "mocha";
import {expect} from 'chai';
import MockBrowser from '../util/MockBrowser';
import BoidsVector3 from "../../src/structures/BoidsVector3";
import * as assert from "assert";

MockBrowser.mock();

describe('BoidsArray', () => {
    describe('create', () => {
        const length = 3;
        const boidsArray = BoidsArray.create(length);
        it('should create a new BoidsArray', () => {
            expect(boidsArray).to.exist;
        });
    });

    describe('#getPositionBuffer', () => {
        const bufferP = new ArrayBuffer(4);
        const bufferV = new ArrayBuffer(4);
        const boidsArray = new BoidsArray(bufferP, bufferV);
        it('should return the backing buffer by reference', () => {
            expect(boidsArray.getPositionBuffer()).to.eq(bufferP);
        });
    });
    describe('#getVelocityBuffer', () => {
        const bufferP = new ArrayBuffer(4);
        const bufferV = new ArrayBuffer(4);
        const boidsArray = new BoidsArray(bufferP, bufferV);
        it('should return the backing buffer by reference', () => {
            expect(boidsArray.getVelocityBuffer()).to.eq(bufferV);
        });
    });
    // avgVelocity
    describe('#count', () => {
        const length = 20;
        const boidsArray = BoidsArray.create(length);
        it('should return the number of boids', () => {
            expect(boidsArray.count()).to.eq(length);
        });
    });

    describe('#getPosition', () => {
        const length = 20;
        const idx = 5;
        const boidsArray = BoidsArray.create(length);
        it('should return a BoidsVector3', () => {
            expect(boidsArray.getPosition(idx)).instanceof(BoidsVector3);
        });
        it('should reuse object references', () => {
            const p1 = boidsArray.getPosition(idx);
            const p2 = boidsArray.getPosition(idx);
            expect(p1).to.eq(p2);
        });
    });

    describe('#getVelocity', () => {
        const length = 20;
        const idx = 5;
        const boidsArray = BoidsArray.create(length);
        it('should return a BoidsVector3', () => {
            expect(boidsArray.getVelocity(idx)).instanceof(BoidsVector3);
        });
        it('should reuse object references', () => {
            const p1 = boidsArray.getVelocity(idx);
            const p2 = boidsArray.getVelocity(idx);
            expect(p1).to.eq(p2);
        });
    });

    describe('#avgPosition', () => {
        const length = 3;
        const boidsArray = BoidsArray.create(length);
        const offset = BoidsVector3.createNew();
        offset.x = 20;
        offset.y = 10;
        offset.z = -4;
        boidsArray.getPosition(0).x = 1;
        boidsArray.getPosition(0).add(offset);
        boidsArray.getPosition(1).y = 1;
        boidsArray.getPosition(1).add(offset);
        boidsArray.getPosition(2).z = 1;
        boidsArray.getPosition(2).add(offset);
        const com = boidsArray.avgPosition();
        it('should find the center of mass', () => {
            // round values to ignore FP errors
            expect(Math.round(com.x)).to.eq(offset.x);
            expect(Math.round(com.y)).to.eq(offset.y);
            expect(Math.round(com.z)).to.eq(offset.z);
        });
    });

    describe('#getVelocity', () => {
        const length = 3;
        const boidsArray = BoidsArray.create(length);
        const offset = BoidsVector3.createNew();
        offset.x = 20;
        offset.y = 10;
        offset.z = -4;
        boidsArray.getVelocity(0).x = 1;
        boidsArray.getVelocity(0).add(offset);
        boidsArray.getVelocity(1).y = 1;
        boidsArray.getVelocity(1).add(offset);
        boidsArray.getVelocity(2).z = 1;
        boidsArray.getVelocity(2).add(offset);
        const com = boidsArray.avgVelocity();
        it('should find the center of mass', () => {
            // round values to ignore FP errors
            expect(Math.round(com.x)).to.eq(offset.x);
            expect(Math.round(com.y)).to.eq(offset.y);
            expect(Math.round(com.z)).to.eq(offset.z);
        });
    });
});
