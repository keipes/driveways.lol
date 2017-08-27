import React from 'react';
import BoidsWorker from 'worker-loader!../../workers/boids-worker'
import BoidsArray from "../../structures/BoidsArray";

export default class Boids extends React.Component {

    constructor() {
        super();
        this.cameraName = "myCamera";
        this.lightName = "myLight";
        this.spheres = [];
        this.numBoids = 100;
    }

    render() {
        return(
            <canvas id="foo" className="boids-canvas"
                ref={(canvas) => {this.canvas = canvas;}}
            />
        );
    }

    componentDidMount() {
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0,1,0);

        const camera = new BABYLON.FreeCamera(
            this.cameraName,
            new BABYLON.Vector3(0, 5, -10),
            this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, false);
        const light = new BABYLON.HemisphericLight(
            this.lightName,
            new BABYLON.Vector3(0,1,0),
            this.scene);
        light.intensity = 0.5;
        const worker = new BoidsWorker();
        this.boidsArray = BoidsArray.createWithNewBuffer(this.numBoids);
        worker.postMessage({
            type: 'init',
            buffer: this.boidsArray.getBuffer()
        });
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            const name = 'sphere' + i;
            this.spheres[i] = BABYLON.Mesh.CreateSphere(name, 16, 2, this.scene);
        }
        this.engine.runRenderLoop(this.babylonRender.bind(this));
    }

    babylonRender() {
        let p;
        for (let i = 0; i < this.boidsArray.numBoids(); i++) {
            p = this.boidsArray.getPositionVector(i);
            this.spheres[i].position.x = p.x;
            this.spheres[i].position.y = p.y;
            this.spheres[i].position.z = p.z;
        }
        this.scene.render();
    }
}
