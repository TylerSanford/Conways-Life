import React, { Component } from 'react';
import Life from './life';
import './App.css';

import { Button, Jumbotron } from 'reactstrap';
import { Card } from 'reactstrap';

/**
 * Life canvas
 */
class LifeCanvas extends Component {
    animate = true;
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.life = new Life(props.width, props.height);
        this.life.randomize();
    }

    /**
     * Component did mount
     */
    componentDidMount() {
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    /**
     * Handle an animation frame
     */
    animFrame() {
        //
        // !!!! IMPLEMENT ME !!!!
        //
        let cells = this.life.getCells();
        let width = this.props.width;
        let height = this.props.height;

        // Request another animation frame
        // Update life and get cells
        // Get canvas framebuffer, a packed RGBA array
        // Convert the cell values into white or black for the canvas
        // Put the new image data back on the canvas
        // Next generation of life

        // Get canvas framebuffer, a packed RGBA array
        const canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        canvas.style.width = canvas.width * 2 + 'px';
        canvas.style.height = canvas.height * 2 + 'px';
        let imageData = ctx.getImageData(0, 0, width, height);

        // Updated the imageData based on the cells
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const state = cells[y][x];
                const color = state === 0 ? 0xff : 0x00;
                const index = (y * width + x) * 4;

                imageData.data[index + 0] = color;
                imageData.data[index + 1] = color;
                imageData.data[index + 2] = color;
                imageData.data[index + 3] = 100;
            }
        }

        // put the new image data back on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Iterate the game state!
        if (this.animate) {
            this.life.step();
        }

        // Request another animation frame
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    handleButtonClickNewCanvas() {
        this.animate = true;
        this.life.randomize();
    }

    handleButtonClickStop() {
        this.animate = false;
    }

    handleButtonClickStart() {
        this.animate = true;
    }

    handleButtonClickClear() {
        this.life.clear();
    }

    /**
     * Render
     */
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>The Game of Life</h1>
                    <canvas
                        ref="canvas"
                        width={this.props.width}
                        height={this.props.height}
                    />
                    <br />
                    <Button
                        color="primary"
                        onClick={this.handleButtonClickNewCanvas.bind(this)}
                    >
                        New Canvas
                    </Button>
                    <Button
                        color="danger"
                        onClick={this.handleButtonClickStop.bind(this)}
                    >
                        Stop
                    </Button>
                    <Button
                        color="success"
                        onClick={this.handleButtonClickStart.bind(this)}
                    >
                        Start
                    </Button>
                    <Button
                        color="warning"
                        onClick={this.handleButtonClickClear.bind(this)}
                    >
                        Clear Canvas
                    </Button>
                </Jumbotron>
            </div>
        );
    }
}

/**
 * Life holder component
 */
class LifeApp extends Component {
    /**
     * Render
     */

    render() {
        return (
            <div>
                <LifeCanvas width={200} height={200} />
            </div>
        );
    }
}

/**
 * Outer App component
 */
class App extends Component {
    /**
     * Render
     */
    render() {
        return (
            <div className="App">
                <LifeApp />
            </div>
        );
    }
}

export default App;
