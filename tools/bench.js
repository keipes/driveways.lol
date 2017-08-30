import Benchmark from 'benchmark';
import {VALS_PER_BOID} from "../src/structures/BoidsConstants";
import BoidsArray from "../src/structures/BoidsArray";
import BoidsWorker from "../src/workers/BoidsWorker";

const numBoids = 1000;
const positionBuffer = new ArrayBuffer(VALS_PER_BOID * Float32Array.BYTES_PER_ELEMENT * numBoids);
const velocityBuffer = new ArrayBuffer(VALS_PER_BOID * Float32Array.BYTES_PER_ELEMENT * numBoids);
const boids = new BoidsArray(positionBuffer, velocityBuffer);
// const suite = ;
const staticIndex = 0;
const v = boids.getPosition(staticIndex);

const opts = {minSamples: 10000, minTime: 1};
const val = 1;


// (new Benchmark.Suite)
//     .add('getPosition.x', () => {
//         boids.getPosition(staticIndex).x;
//     })
//     .add('getX', () => {
//         boids.getX(staticIndex);
//     })
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     .run(opts);
//
// (new Benchmark.Suite)
//     .add('getX', () => {
//         v.x;
//     })
//
//     .add('getY', () => {
//         v.y;
//     })
//     .add('getZ', () => {
//         v.z;
//     })
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     .run(opts);
//
// (new Benchmark.Suite)
//     .add('setX', () => {
//         v.x = val;
//     })
//     .add('setXUnsafe', () => {
//         v.xUnsafe = val;
//     })
//     .add('getX', () => {
//         v.x;
//     })
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     .run(opts);

const v2 = boids.getPosition(staticIndex + 1);
v.x = 12;
v.y = 13;
v.z = 11;

v2.x = 10;
v2.y = 10;
v2.z = 10;
// (new Benchmark.Suite)
//     .add('distance', () => {
//         v.distance(v2);
//     })
//     .add('distanceUnsafe', () => {
//         v.distanceUnsafe(v2);
//     })
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     .run(opts);

const worker = new BoidsWorker({
    positionBuffer: positionBuffer,
    velocityBuffer: velocityBuffer,
    swarmFactor: 8,
    minDistance: 10000,
    maxSpeed: 100
});
worker.avoidOthers(staticIndex);
let r = worker.avoidOthers(staticIndex);
let r2 = worker.avoidOthers2(staticIndex);
console.log(r);
console.log(r2);
worker.warmupDistances(staticIndex);
if (!r.equalsRounded(r2)) {
    console.error('vectors don\'t match');
} else {
    (new Benchmark.Suite)
        .add('avoidOthers', () => {
            worker.avoidOthers(staticIndex);
        })
        .add('avoidOthers2', () => {
            worker.avoidOthers2(staticIndex);
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run(opts);

}

