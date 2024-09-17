// Content List
// 1. Initial Game Setup
// 2. Story Data and Branching
// 3. Choice Handling
// 4. Inventory Management
// 5. Villain Encounters
// 6. Endings Logic

// 1. Initial Game Setup
let inventory = [];
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices');
const inventoryList = document.getElementById('inventory-list');

// 2. Story Data and Branching
const storyData = [
  // Index 0
  {
    text: "You are Captain Blackbeard, sailing toward a forgotten island rumored to hold the Lost Treasure. What do you do?",
    choices: [
      { text: "Sail to the island", nextIndex: 1 },
      { text: "Consult your crew", nextIndex: 2 }
    ]
  },
  // Index 1
  {
    text: "The island is within sight, but a storm is approaching. Will you continue or wait it out?",
    choices: [
      { text: "Brave the storm", nextIndex: 3 },
      { text: "Wait until morning", nextIndex: 4 }
    ]
  },
  // Index 2
  {
    text: "Your crew shares tales of a villainous pirate named Scarlet Sam, who is also after the treasure. What's your next move?",
    choices: [
      { text: "Set sail immediately", nextIndex: 1 },
      { text: "Prepare the ship for battle", nextIndex: 5 }
    ]
  },
  // Index 3
  {
    text: "The storm wrecks your ship on the island's shore. You survive but lose some supplies.",
    choices: [
      { text: "Search the wreckage", nextIndex: 6 },
      { text: "Head into the jungle", nextIndex: 7 }
    ]
  },
  // Index 4
  {
    text: "At dawn, you notice another ship anchoring nearby—it's Scarlet Sam! What do you do?",
    choices: [
      { text: "Confront Sam", nextIndex: 8 },
      { text: "Sneak onto the island", nextIndex: 7 }
    ]
  },
  // Index 5
  {
    text: "Your ship is ready for battle. Suddenly, Scarlet Sam attacks! Do you fight or flee?",
    choices: [
      { text: "Fight", nextIndex: 9 },
      { text: "Flee into the storm", nextIndex: 3 }
    ]
  },
  // Index 6
  {
    text: "You find a mysterious map piece in the wreckage.",
    choices: [
      { text: "Add map piece to inventory", nextIndex: 7, action: () => addToInventory('Map Piece') }
    ]
  },
  // Index 7
  {
    text: "In the jungle, you encounter a wise old man who offers you a clue in exchange for a gold coin.",
    choices: [
      { text: "Give gold coin", nextIndex: 10, condition: () => inventory.includes('Gold Coin') },
      { text: "Decline and move on", nextIndex: 11 }
    ]
  },
  // Index 8
  {
    text: "Scarlet Sam laughs and challenges you to a duel.",
    choices: [
      { text: "Accept the duel", nextIndex: 12 },
      { text: "Set a trap instead", nextIndex: 13 }
    ]
  },
  // Index 9
  {
    text: "You engage in a fierce battle but are defeated.",
    choices: [
      { text: "Game Over - Restart", nextIndex: 0 }
    ]
  },
  // Index 10
  {
    text: "The old man reveals a secret passage to the treasure.",
    choices: [
      { text: "Thank him and proceed", nextIndex: 14 }
    ],
    action: () => removeFromInventory('Gold Coin')
  },
  // Index 11
  {
    text: "You get lost in the jungle and fall into a trap set by Scarlet Sam.",
    choices: [
      { text: "Game Over - Restart", nextIndex: 0 }
    ]
  },
  // Index 12
  {
    text: "In a dramatic duel, you defeat Scarlet Sam!",
    choices: [
      { text: "Claim the treasure", nextIndex: 14 }
    ]
  },
  // Index 13
  {
    text: "Your trap fails, and Scarlet Sam captures you.",
    choices: [
      { text: "Game Over - Restart", nextIndex: 0 }
    ]
  },
  // Index 14
  {
    text: "You find the Lost Treasure! Congratulations!",
    choices: [
      { text: "Play Again", nextIndex: 0 }
    ]
  }
];

// 3. Choice Handling
function displayStory(index) {
  const story = storyData[index];

  // Update story text
  storyText.textContent = story.text;

  // Clear previous choices
  choicesContainer.innerHTML = '';

  // Execute any immediate actions
  if (story.action) story.action();

  // Handle inventory conditions
  story.choices.forEach(choice => {
    if (choice.condition && !choice.condition()) {
      // Skip rendering this choice
      return;
    }

    const button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.action) choice.action();
      displayStory(choice.nextIndex);
    };
    choicesContainer.appendChild(button);
  });

  // Update inventory display
  updateInventory();
}

// 4. Inventory Management
function addToInventory(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);
  }
}

function removeFromInventory(item) {
  inventory = inventory.filter(invItem => invItem !== item);
}

function updateInventory() {
  inventoryList.innerHTML = '';
  inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// 5. Villain Encounters
// Scarlet Sam's character arc is intertwined within the storyData choices and outcomes.

// 6. Endings Logic
// The endings are determined by the player's choices leading to different story indices.

// Start the game at the first story node
displayStory(0);
