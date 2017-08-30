import React from 'react';
import BoidsWorker from 'worker-loader?inline!../../workers/BoidsWorker'
import BoidsArray from "../../structures/BoidsArray";
import {Button, Col, ControlLabel, FormControl, FormGroup, InputGroup, Row} from "react-bootstrap";
import {DATA_MSG, DIRTY_MSG, INIT_MSG, RESET_MSG, STATUS_MSG} from "../../workers/BoidsWorkerMsg";
import BoidsVector3 from "../../structures/BoidsVector3";

export default class Boids extends React.Component {

    constructor() {
        super();
        this.cameraName = "myCamera";
        this.lightName = "myLight";
        this.spheres = [];
        this.numBoids = 1000;
        this.dirty = true;
        this.state = {
            swarmFactor: 8,
            minDistance: 40,
            maxSpeed: 100,
            fps: 0
        };
        this.workers = [];
    }

    render() {
        return(
            <div>
                <Row>
                    <Col md={3}>
                        <p>{`fps: ${Math.floor(this.state.fps)}`}</p>
                        <div className="d-boids-controls">
                            <form>
                                <FormGroup>
                                    <ControlLabel>Swarm Factor</ControlLabel>
                                    <FormControl type="number" value={this.state.swarmFactor} onChange={this.changeSwarmFactor.bind(this)}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Min Distance</ControlLabel>
                                    <FormControl type="number" value={this.state.minDistance} onChange={this.changeMinDistance.bind(this)}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Max Speed</ControlLabel>
                                    <FormControl type="number" value={this.state.maxSpeed} onChange={this.changeMaxSpeed.bind(this)}/>
                                </FormGroup>
                            </form>
                            <Button onClick={this.reset.bind(this)}>{"Reset"}</Button>
                        </div>
                    </Col>
                </Row>
                <canvas id="foo" className="boids-canvas"
                        ref={(canvas) => {this.canvas = canvas;}}
                />
            </div>

        );
    }

    componentDidMount() {
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(1,1,1);

        this.camera = new BABYLON.FreeCamera(
            this.cameraName,
            new BABYLON.Vector3(2000, 2000, 2000),
            this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        const light = new BABYLON.HemisphericLight(
            this.lightName,
            new BABYLON.Vector3(0,1,0),
            this.scene);
        light.intensity = 0.5;
        this.worker = new BoidsWorker();
        this.boids = BoidsArray.create(this.numBoids);
        this.worker.postMessage({
            type: INIT_MSG,
            positionBuffer: this.boids.getPositionBuffer(),
            velocityBuffer: this.boids.getVelocityBuffer(),
            swarmFactor: this.state.swarmFactor,
            minDistance: this.state.minDistance,
            maxSpeed: this.state.maxSpeed
        });
        this.worker.onmessage = this.onWorkerMessage.bind(this);
        for (let i = 0; i < this.boids.count(); i++) {
            const name = 'sphere' + i;
            this.spheres[i] = BABYLON.Mesh.CreateBox(name, 20, this.scene);
        }
        let p = this.boids.avgPosition();
        let v = this.boids.avgVelocity();
        this.boidVector = BABYLON.MeshBuilder.CreateLines("boidVector", {points: [
           this.toBabylonVector(p), this.toBabylonVector(p.add(v))
        ]}, this.scene);

        window.setInterval(() => {this.setState({fps: this.engine.getFps()});}, 100);
        this.engine.runRenderLoop(this.babylonRender.bind(this));
    }

    componentWillUnmount() {
        if (this.worker !== undefined) {
            this.worker.terminate();
        }
    }

    toBabylonVector(boidsVector) {
        if (!boidsVector instanceof BoidsVector3) {
            throw new TypeError('boidsVector must be of type BoidsVector3');
        }
        return new BABYLON.Vector3(boidsVector.x, boidsVector.y, boidsVector.z);
    }

    onWorkerMessage(msg) {
        switch (msg.data.type) {
            case STATUS_MSG:
                console.log(`worker status: ${msg.data.status}`);
                break;
            case DIRTY_MSG:
                this.dirty = true;
                break;
            default:
                console.error('received unknown message');
                console.error(msg);
                break;
        }
    }

    babylonRender() {
        if (this.dirty) {
            let p;
            for (let i = 0; i < this.boids.count(); i++) {
                p = this.boids.getPosition(i);
                this.spheres[i].position.x = p.x;
                this.spheres[i].position.y = p.y;
                this.spheres[i].position.z = p.z;
            }
            // const com = this.boids.avgPosition();
            // const cov = this.boids.avgVelocity();
            // this.boidVector = BABYLON.MeshBuilder.CreateLines("boidVector", {points: [
            //     this.toBabylonVector(com), this.toBabylonVector(com.copyOf().add(cov))
            // ], instance: this.boidVector});
            this.scene.render();
            this.dirty = false;
        }
    }

    reset() {
        this.worker.postMessage({type: RESET_MSG});
    }

    changeSwarmFactor(e) {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            return;
        }
        this.worker.postMessage({type: DATA_MSG, swarmFactor: e.target.value});
        this.setState({swarmFactor: e.target.value});
    }

    changeMinDistance(e) {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            return;
        }
        this.worker.postMessage({type: DATA_MSG, minDistance: e.target.value});
        this.setState({minDistance: e.target.value});
    }

    changeMaxSpeed(e) {
        e.preventDefault();
        if (isNaN(e.target.value)) {
            return;
        }
        this.worker.postMessage({type: DATA_MSG, maxSpeed: e.target.value});
        this.setState({maxSpeed: e.target.value});
    }
}
