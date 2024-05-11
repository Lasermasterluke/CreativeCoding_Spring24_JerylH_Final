let fruits;
let floor;

class Fruits {
    constructor() {
        this.fruitList = ["🍒", "🫐", "🍓", "🍌", "🍋", "🍊", "🍐", "🍏", "🍍", "🍉"];
    }

    // method to get a random fruit with specified probabilities
    getRandomFruit() {
        let r = random();
        if (r < 0.6) { // 60% chance
            return this.fruitList[0]; // cherry
        } else if (r < 0.9) { // 30% chance
            return this.fruitList[1]; // blueberry
        } else { // 10% chance
            return this.fruitList[2]; // strawberry
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // create the floor and set it to static
    floor = createSprite(width / 2, height - 50, width, 100);
    floor.color = "gray";
    floor.collider = "static"; // correctly setting the floor to static

    // initialize the Fruits object
    fruits = new Fruits();
}

function draw() {
    background(255);
}
