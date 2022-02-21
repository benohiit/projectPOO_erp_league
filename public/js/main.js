// Imports.
/* import "/jsonFunctions.js"; */
import Archer from "./class/Archer.js"
import Assassin from "./class/Assassin.js"
import Mage from "./class/Mage.js"
import Fighter from "./class/Fighter.js"
import Tank from "./class/Tank.js"
import Support from "./class/Support.js"

import Monstre from "./class/Monster.js"
import Game from "./class/Game.js"

/* 

Details of advantages of the champion's type

archer =        2x attack speed     & 2x attak Range      & 10% crit          & 2x attack damage    & /2 hp 
Assassin =      4x attack damage    & 2x move speed       & /2 hp             & 25% crit 
Tank =          4x life             & /4 move speed       & x2 hp regen       & x2 spellblock       & x2 armor 
Fighter =       2x hp               & 2x attack
Mage =          6x power            & /4 attack           & /2 hp 
Support =       2x power            & 4x mana
*/
(async () => {
  
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const hero = urlParams.get('champ').toLowerCase();


  var champ =  await getChamp(hero);
  
  if (champ.length == 0){    //  we need to create it and to post it in the db
    champ = await newChamp(hero);
    
  }
  champ = champ[0];
  var currentChamp;
  switch (champ.tags){
    case "Mage":
    currentChamp = new Mage(champ);
    break;
    case "Fighter":
    currentChamp = new Fighter(champ);
    break;
    case "Tank":
    currentChamp = new Tank(champ);
    break;
    case "Assassin":
    currentChamp = new Assassin(champ);
    break;
    case "Marksman":
    currentChamp = new Archer(champ);
    break;
    case "Support":
      currentChamp = new Support(champ);
      break;
    }

    // Create heroes.
    /* const hanzo = new Archer("Hanzo")
    const muradin = new Fighter("Muradin")
    const orphea = new Mage("Orphea")
    const qhira = new Assassin("Qhira") */

    // Create monsters.

  /*   const garrosh = new Monstre('Garrosh')
    const guldan = new Monstre('Guldan')
    const butcher = new Monstre('Butcher')
    const deathwing = new Monstre('Deathwing') */

    // Add heroes and monsters to array.
    //const heroes = [hanzo, muradin, orphea, qhira]

    //const monsters = [garrosh, guldan, butcher, deathwing]

    //console.log(heroes, monsters)
    /**
     * Function - Create HTML cards.
     * @param {Array} heroesObjArray - Array of Objects.
     * @param {String} type
     * @returns 
     */
    
    function cardHtml(hero, type) {
      let html = ''
      //for (const hero of heroesObjArray) {
      html += `<div class="${type}-card-container ${hero.role.toLowerCase()}" data-player="${hero.name}">`
      html += `<div class="card-hp" data-hp="${hero.hp}"></div>`
      html += `<div class="card-mana" data-mana="${hero.mana}"></div>`
      html += `<div class="${type}-card">`
      html += `<img class="portrait-card" src="${hero.img}" alt="${hero.name} portrait">`
      html += `<div class="role-icon-container">`
      html += `<img class="${hero.role.toLowerCase()}">`
      html += `</div>`
      html += `<div class="${type}-name">${hero.name}</div>`
      html += `<div class="${type}-role">${hero.role}</div>`
      html += `<div class="card-details">`
      html += `<div class="${type}-hp">hp : ${hero.hp}</div>`
      html += `<div class="${type}-mana">mana : ${hero.mana}</div>`
      html += `<div class="${type}-atk">attack : ${hero.atk}</div>`
      html += `<div class="${type}-atk">attack spell : ${hero.atkSpell}</div>`
      html += `<div class="${type}-armor">armor : ${hero.armor}</div>`
      html += `<div class="${type}-armor">armor Spell : ${hero.armorSpell}</div>`
      html += `<div class="${type}-armor">level : ${hero.lvl}</div>`
      html += `</div>`
      html += `</div>`
      html += `<div class="btns-container"></div>`
      html += `</div>`
    //}
    return html
}


// Create map with the level depending of the maplvl of the champ

// call the infos of the json
var lvls =  await getMapLvl(champ.maplvl); 
lvls = lvls[0];


const canvas = document.getElementById("worldmap");
var ctx = canvas.getContext("2d");

var cw = document.getElementById("worldmap").offsetWidth;
var ch = document.getElementById("worldmap").offsetHeight;


var imgmap = new Image();
imgmap.onload = start;
imgmap.src = "./public/img/map.png";

function start() {
  canvas.width = cw;
  canvas.height = ch;

  console.log(cw + " " + ch)
  
  // draw the image on the canvas
  ctx.drawImage(imgmap, 0, 0, cw, ch);
  
  // darken the image with a 40% black fill
  ctx.save();
  ctx.globalAlpha = .4;
  ctx.fillStyle = "#021032";
  ctx.fillRect(0, 0, cw, ch);
  ctx.restore();
  
  // ctx.clip() the area to highlight
  // and redraw the whole image
  // (the image will draw only in the clipping region)
  ctx.save();
  ctx.beginPath();
  ctx.clearRect(lvls.x, lvls.y, lvls.w, lvls.l);
  ctx.rect(lvls.x, lvls.y, lvls.w, lvls.l);

  ctx.clip();
  ctx.drawImage(imgmap, 0, 0, cw, ch);
  ctx.restore();
  
}

//texte aside
let h2Aside = document.createElement('h2');
let pAside = document.createElement('p');
const textAside = document.querySelector(".textAside")
h2Aside.appendChild(document.createTextNode(lvls.name))
pAside.appendChild(document.createTextNode(lvls.story))

textAside.prepend(pAside)
textAside.prepend(h2Aside)


// Create HTML Cards.
const heroesCards = cardHtml(currentChamp, 'hero')
//const monstersCards = cardHtml(monsters, 'monster')

// Selectors.
const heroesElem = document.querySelector('#heroes')
//const monstersElem = document.querySelector('#monsters')

// Insert heroes cards into HTML element.
heroesElem.innerHTML = heroesCards
//monstersElem.innerHTML = monstersCards

// Selectors.
const heroesCardsElem = document.querySelectorAll('#heroes .hero-card-container')
const selectElem = document.querySelector('#buttonChoice')

// For all Heroes Cards.
for (const heroCard of heroesCardsElem) {
  // On Hero Card click.
  heroCard.addEventListener('click', function() {
    for (const item of heroesCardsElem) {
      // Remove all 'is-selected' classes.
      item.classList.remove('is-selected')
    }
    // Add 'is-selected' class.
    this.classList.toggle('is-selected')
    // Enable select button.
    selectElem.removeAttribute('disabled')
  })
}

// On select click button.
selectElem.addEventListener('click', function(e) {

  // Disable Select button once game is started.
  this.setAttribute('disabled', '')

  // Start GAME.
  const game = new Game()
  // Select random monster.
  game.monsterSelection()
  // Get selected players.
  const playersSelected = document.querySelectorAll('.is-selected')
  // Set players.
  const player1 = heroes.find(hero => hero.name === playersSelected[0].dataset.player)
  const player2 = monsters.find(monster => monster.name === playersSelected[1].dataset.player)
  // Initiate GAME with players.
  game.gameInitiate(player1, player2)

})

})();

