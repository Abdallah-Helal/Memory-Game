let gameblocks=[
  {
    "img":"imgs/angular.png",
    "data-technology":"angular"
  },
  {
    "img":"imgs/vuejs.png",
    "data-technology":"vuejs"
  },
  {
    "img":"imgs/css3.png",
    "data-technology":"css3"
  },
  {
    "img":"imgs/github.png",
    "data-technology":"github"
  },
  {
    "img":"imgs/gulpjs.png",
    "data-technology":"gulpjs"
  },
  {
    "img":"imgs/html5.png",
    "data-technology":"html5"
  },
  {
    "img":"imgs/jest.png",
    "data-technology":"jest"
  },
  {
    "img":"imgs/mongodb.png",
    "data-technology":"mongodb"
  },
  {
    "img":"imgs/python.png",
    "data-technology":"python"
  },
  {
    "img":"imgs/react.png",
    "data-technology":"react"
  },

]

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
putIimgs();
putIimgs();
function putIimgs(){

  gameblocks.forEach((e)=>{
    let item=document.createElement("div");
    item.classList.add("game-block");
    item.setAttribute('data-technology',e["data-technology"]);
    item.innerHTML=`<div class="face front"></div>
    <div class="face back">
      <img src=${e.img} alt="">
    </div>`;
    blocksContainer.appendChild(item);

  })
  
}


// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = 'Unknown';

  // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;

  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

};

// Effect Duration
let duration = 500;

blocksContainer = document.querySelector(".memory-game-blocks");
// console.log(blocksContainer.children);
// Create Array From Game Blocks
// let blocks = Array.from(blocksContainer.children);
let blocks =Array.from( blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(blocks);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});

// Flip Block Function
function flipBlock(selectedBlock) {

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }

}

// Stop Clicking Function
function stopClicking() {

  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');

  }, duration);

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);


  }

}

// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // swap
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;

  }
  return array;
}

