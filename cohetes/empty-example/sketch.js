var rocket;
var population;
var lifespan = 200;
var lifeP;
var count = 0;
var target;

function setup(){
  createCanvas(400,300);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width/2,50);
}


function draw(){
  background(0);
  population.run();
  lifeP.html(count)

  count++;

if (count == lifespan){
  //population = new Population();
  population.evaluate();
  population.selection();

  count = 0;
}


  ellipse(target.x, target.y, 16, 16);
}


function Population(){
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness();
      // If current fitness is greater than max, then make max eqaul to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    // Take rockets fitness make in to scale of 1 to 100
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
this.selection = function(){
  var newRockets = [];
  for (var i = 0; i < this.rockets.length; i++) {
    // Picks random dna
    var parentA = random(this.matingpool).dna;
    var parentB = random(this.matingpool).dna;
    // Creates child by using crossover function
    var child = parentA.crossover(parentB);
    // Creates new rocket with child dna
    newRockets[i] = new Rocket(child);
  }
  // This instance of rockets are the new rockets
  this.rockets = newRockets;
}

// Calls for update and show functions
this.run = function() {
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i].update();
    // Displays rockets to screen
    this.rockets[i].show();
  }
}
}

function DNA(genes){
  if (genes){
    this.genes = genes;
  }else {
  this.genes = [];
  for (var i = 0; i < lifespan; i++){
    this.genes[i] = p5.Vector.random2D();
    this.genes[i].setMag(0.1);
  }
}
  this.crossover = function(partner){
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++){
      if (i > mid){
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
}

function Rocket(dna){
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  if (dna) {
    this.dna = dna;
  } else {
  this.dna = new DNA();
}
  this.fitness = 0;


this.applyForce = function(force){
  this.acc.add(force);
}

this.calcFitness = function(){
  var d = dist(this.pos.x, this.pos.y, target.x, target.y);
  this.fitness = 1/d;
}

this.update = function(){

  var d = dist(this.pos.x, this.pos.y, target.x, target.y);
  if(d < 10){
    this.completed = true;
    this.pos = target.copy();
  }

  this.applyForce(this.dna.genes[count]);

if(!this.completed){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
  }
}
this.show = function(){
  push();
  noStroke();
  fill(255,150);
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
  rectMode(CENTER);
  rect(0, 0, 25, 5);
  pop();
}



}
