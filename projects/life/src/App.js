import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
class LifeCanvas extends Component {

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
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //

    // Request another animation frame
    // Update life and get cells
    // Get canvas framebuffer, a packed RGBA array
    // Convert the cell values into white or black for the canvas
    // Put the new image data back on the canvas
    // Next generation of life

    let width = this.props.width;
    let height = this.props.height;

    this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    let imageData = ctx.getImageData(0, 0, width, height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < height; col++) {
        let lifeGrid = this.life.getCells();
        let index = (row * width + col) * 4;
        let color = lifeGrid[row][col];

        imageData.data[index + 0] = color;
        imageData.data[index + 1] = color;
        imageData.data[index + 2] = color;
        imageData.data[index + 3] = 0xff;

      }
    }

    ctx.putImageData(imageData, 0 , 0);
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
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
        <LifeCanvas width={400} height={300} />
      </div>
    )
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
