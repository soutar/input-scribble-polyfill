function ScribbleInput(inputElem) {
  this.input = {
    elem: inputElem,
    classList: $(inputElem).attr('class'), 
    size: {
      x: $(inputElem).attr('width'),
      y: $(inputElem).attr('height')
    },
    src: $(inputElem).attr('src')
  };
  this.canvas = {};
  this.lastClick = {x: null, y: null};
}

ScribbleInput.prototype.init = function () {
  var imageObj,
      self = this;

  /* Create out canvas and copy classes from our input */
  self.canvas.elem = $('<canvas>')[0];
  $(self.canvas.elem)
    .attr('class', self.input.classList)
    .attr('width', self.input.size.x)
    .attr('height', self.input.size.y);

  /* Throw our canvas element into the DOM */
  $(self.input.elem).after(self.canvas.elem);

  self.canvas.pos = {
    x: $(self.canvas.elem).position().left,
    y: $(self.canvas.elem).position().top
  };
  
  self.ctx = self.canvas.elem.getContext('2d');

  /* Load our image */
  imageObj = new Image(self.input.size.x, self.input.size.y);
  imageObj.src = self.input.src;

  /* Draw it to the canvas as soon as it's loaded */
  imageObj.onload = function () {
    self.ctx.drawImage(imageObj, 0, 0, self.input.size.x, self.input.size.y);
  };

  /* Register our event handlers */
  $(self.canvas.elem).on('mousedown', function (e) { self.startDrawing(e); });
  $(self.canvas.elem).on('mouseup', function (e) { self.stopDrawing(e); });
  $(self.canvas.elem).on('mouseout', function (e) { self.stopDrawing(e); });
  $(self).closest('form').on('submit', self.writeVal);
}

ScribbleInput.prototype.startDrawing = function () {
  var self = this;

  $(this.canvas.elem).on('mousemove', function (e) {
    self.draw(e);
  });
}

ScribbleInput.prototype.stopDrawing = function () {
 var self = this;
  
  if (self.lastClick.x || self.lastClick.y) {
    $(this.canvas.elem).off('mousemove');
    this.lastClick.x = null;
    this.lastClick.y = null;
  }
  
  self.writeVal();
}

ScribbleInput.prototype.writeVal = function () {
  var self = this;

  $(self.input.elem).val(this.canvas.elem.toDataURL());
}

ScribbleInput.prototype.draw = function (e) {
  var self = this,
      click = {
        /* Don't break in Firefox */
        x: (e.offsetX === undefined ? e.originalEvent.layerX - self.canvas.pos.x : e.offsetX),
        y: (e.offsetY === undefined ? e.originalEvent.layerY - self.canvas.pos.y : e.offsetY)
      };

  self.ctx.beginPath();

  /* If we're in the process of drawing a line,
   * we want to make sure we're drawing in the right place
   *
   * Move to the position of the last draw call
   */
  if (self.lastClick.x || self.lastClick.y) {
    self.ctx.moveTo(self.lastClick.x, self.lastClick.y);
  }

  self.ctx.lineTo(click.x, click.y);
  self.ctx.strokeStyle = 'rgb(0, 0, 0)';
  self.ctx.lineWidth = 3;
  self.ctx.lineCap = 'round';
  self.ctx.stroke();
  self.ctx.closePath();

  self.lastClick.x = click.x;
  self.lastClick.y = click.y;
}

$.prototype.scribblify = function () {
  var scribbleInput = new ScribbleInput(this);
  scribbleInput.init();
}

/* Scribblify our inputs */
$('input[data-interact="scribble"]').each(function () {
  $(this).scribblify();
});
