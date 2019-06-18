import React, { Component } from "react";

export default class DrawingPreview extends Component {
  componentDidMount() {
    let ctx = this.canvas.getContext("2d");
    var twoD = [];
    while (this.props.drawing.length)
      twoD.push(this.props.drawing.splice(0, 28));

    twoD.map((cols, row) => {
      return cols.map((data, col) => {
        if (data)
          ctx.rect(col * 2, row * 2, 2, 2);

        return null;
      });
    });

    ctx.fillStyle = "black";
    // ctx.stroke();
    ctx.fill();
  }
  render() {
    return (
      <div>
        <canvas
          style={{
            border: "1px solid red"
          }}
          width={56}
          height={56}
          ref={e => (this.canvas = e)}
        />
      </div>
    );
  }
}
