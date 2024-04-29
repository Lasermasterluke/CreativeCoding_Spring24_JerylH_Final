function setup() {
    createCanvas(windowWidth, windowHeight);

    // set global gravity
    world.gravity.y = 10;

    // create the floor and set it to static
    floor = createSprite(width / 2, height - 40, width, 40);
    floor.shapeColor = 'gray';
    floor.collider = 'static';

    // create the dog's body just above the floor
    dogBody = createSprite(width / 4, height - 200, 320, 120);
    dogBody.shapeColor = 'red';
    dogBody.collider = 'dynamic';
    //dogBody.mass = '10';

    // initialize two legs
    legs = {
        frontLeg: createLeg(-30, 30, 'green'),
        backLeg: createLeg(30, 30, 'pink')
    };
}

function createLeg(offsetX, offsetY, colorName) {
    let upperLeg = createSprite(dogBody.position.x + offsetX, dogBody.position.y + offsetY, 20, 40);
    upperLeg.color = colorName;

    let lowerLeg = createSprite(upperLeg.position.x, upperLeg.position.y + 40, 20, 40);
    lowerLeg.color = colorName;
    lowerLeg.debug = true;
    lowerLeg.offset.y = 20;
    return { upperLeg, lowerLeg };
}

function draw() {
    background(255);
    handleLegControl();
    updateLegs();

    // handle collision with the floor and apply gravity
    dogBody.collide(floor);
}

function handleLegControl() {
    controlLeg(legs.frontLeg, 87); // w key for front leg
    controlLeg(legs.backLeg, 68);  // d key for back leg
}

function controlLeg(leg, key) {
    // gradual rotation control
    let rotationSpeed = 10;
    if (keyIsDown(key)) {
        leg.lowerLeg.rotation += rotationSpeed;
        leg.lowerLeg.rotation = min(leg.lowerLeg.rotation, 90); // max bend at 90 degrees
    } else {
        leg.lowerLeg.rotation -= 2 * rotationSpeed;
        leg.lowerLeg.rotation = max(leg.lowerLeg.rotation, 0); // min bend at 0 degrees
    }
}

function updateLegs() {
    // update leg positions based on body movement
    ['frontLeg', 'backLeg'].forEach(key => {
        const leg = legs[key];
        const baseX = dogBody.position.x + (key === 'frontLeg' ? -50 : 50);
        const baseY = dogBody.position.y + dogBody.height / 2 + 20;
        leg.upperLeg.position.set(baseX, baseY);
        leg.upperLeg.rotation = 0;
        leg.lowerLeg.position.set(baseX, baseY + 20);
    });
}
