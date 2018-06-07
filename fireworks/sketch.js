var fireworks;
var gravity;

function setup(){
  createCanvas(400,300);
  gravity = createVector(0,0.2);
  stroke(255);
  strokeWeight(4);
  firework = new Particle();
}

function draw(){
  background(51);
  //fireworks.push(new Firework());
  for(var i = 0; i < 100; i++){
firework();
  }

}
