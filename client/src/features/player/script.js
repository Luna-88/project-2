let character = document.querySelector(".character");
let map = document.querySelector(".map");

//start in the middle of the map
let x = 170;
let y = 140;
let held_directions = []; //State of which arrow keys we are holding down
let speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   let leftLimit = 0;
   let rightLimit = 336;
   let topLimit = -26;
   let bottomLimit = 304.25;
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   //Centers the camera
   let camera_left = pixelSize * 135;
   let camera_top = pixelSize * 117.5;
   
   //moves the map in the opposite direction as the character moves
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


let time = Date.now()

// Animation loop
const step = () => {

   // Time
   const currentTime = Date.now()
   const deltaTime = currentTime - time
   time = currentTime

   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!


/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}

//e is for event, which is an property of a keyboard event but is deprecated
document.addEventListener("keydown", (e) => {
   let dir = keys[e.which]; //currently looking for a solution for which method alternative
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   let dir = keys[e.which];
   let index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



