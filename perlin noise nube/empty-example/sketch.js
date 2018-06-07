//var xoff1 = 0;
//var xoff2 = 10000;
var inc = 0.01;

function setup() {
createCanvas(200, 200);
pixelDensity(1);
}

function draw() {
  var yoff = 0;

  loadPixels();
  for ( y = 0; y < width; y++){
    var xoff = 0;
    for ( x = 0; x < height; x++){
      var index = (x + y * width) * 4;
      var r = noise(xoff,yoff)*255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}
