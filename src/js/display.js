
class Display {

  constructor (canvas) {
    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
  }

  renderBricks (bricks, brickWidth, brickHeight, brickColors) {
    for (let i = 0; i < bricks.length; i++) {
        for (let x = 0; x < bricks[i].length; x++) {
            if (bricks[i][x].resistence != 0) {
              this.drawRect(bricks[i][x].x, bricks[i][x].y, brickWidth, brickHeight, brickColors[bricks[i][x].resistence]);
            }
        }
    }
  }

  drawText (font_size, font, color, text, x, y) {
    this.buffer.font = `${font_size} ${font}`;
    this.buffer.fillStyle = color;
    this.buffer.fillText(text, x, y);
  }


  render () {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  };

  fill (color) {

    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  };

  drawRect (x, y, width, height, color) {
      this.buffer.fillStyle = color;
      this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
  }

  drawCircle (x, y, radius, color) {
      this.buffer.fillStyle = color;
      this.buffer.beginPath();
      this.buffer.arc(x, y, radius, 0, Math.PI * 2, true);
      this.buffer.fill();
  }

  resize (width, height, height_width_ratio) {

    if (height / width > height_width_ratio) {

      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;

    } else {

      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;

    }

  };

  handleResize (event) {
    this.resize(event);
  };

}
