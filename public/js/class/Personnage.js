function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

class Personnage {
  
  // Constructor.
  constructor(champ) {
    this.name = champ.name;
    this.hp = champ.stats.hp;
    this.mana = champ.stats.mp;
    this.armor = champ.stats.armor;
    this.armorSpell = champ.stats.spellblock;
    this.atk = champ.stats.attackdamage;
    this.atkSpell = champ.stats.spell;
    this.lvl = champ.lvl;
    this.maplvl = champ.maplvl;
    this.img = champ.img;
    this.hpTmp = this.hp;
  }

  // Attack (basic) method.
  attack(target) {

    // Attack.
    target.hp = target.hp + target.armor - this.atk

    // Gain mana.
    // this.mana = this.mana + 5

    // Log dealt damages.
    const p = document.createElement('p')
    let html = `<span class="${(target.role !== 'Monster') ? 'txt-red' : 'txt-green'}">${this.name}</span>`
        html += ` deals `
        html += `${(this.atk - target.armor)} damages to `
        html += `<span class="${(target.role !== 'Monster') ? 'txt-green' : 'txt-red'}">${target.name}</span>`
    p.innerHTML = html
    const selector = document.querySelector('#versus-gamelog')
    selector.prepend(p)

    // Update life (hp) bar status.
    let hpBar = ''
    if(target.role != 'Monster') {
      hpBar = document.querySelector('#game .hero-card-container.is-selected .card-hp')
    } else {
      hpBar = document.querySelector('#game .monster-card-container.is-selected .card-hp')
    }
    const hpStart = hpBar.dataset.hp
    const hpLeft = (target.hp * 100) / hpStart
    hpBar.style.width = hpLeft + '%'

    // Update life (hp) VS status.
    const hpVSHero = document.querySelector('#game #hero-hp-left')
    const hpVSMonster = document.querySelector('#game #monster-hp-left')
    
    if(target.role != 'Monster') {
      hpVSHero.textContent = target.hp
      this.hpTmp = parseInt(hpVSHero.dataset.hptmp)
      animateValue(hpVSHero, this.hpTmp, target.hp, 1000);
    } else {
      hpVSMonster.textContent = target.hp
      this.hpTmp = parseInt(hpVSMonster.dataset.hptmp)
      animateValue(hpVSMonster, this.hpTmp, target.hp, 1000);
    }
  }

  // Attack (spell) method.
  attackSpell(target) {

    // Attack.
    target.hp = target.hp + target.armorSpell - this.atkSpell

    // Reduce Mana.
    this.mana = this.mana - 25
    const p = document.createElement('p')
    let html = `<span class="${(target.role !== 'Monster') ? 'txt-red' : 'txt-green'}">${this.name}</span>`
        html += ` deals `
        html += `${(this.atkSpell - target.armorSpell)} damages to `
        html += `<span class="${(target.role !== 'Monster') ? 'txt-green' : 'txt-red'}">${target.name}</span>`
    p.innerHTML = html
    const selector = document.querySelector('#versus-gamelog')
    selector.prepend(p)

    // Update life (hp) bar status.
    let hpBar = ''
    if(target.role != 'Monster') {
      hpBar = document.querySelector('#game .hero-card-container.is-selected .card-hp')
    } else {
      hpBar = document.querySelector('#game .monster-card-container.is-selected .card-hp')
    }
    const hpStart = hpBar.dataset.hp
    const hpLeft = (target.hp * 100) / hpStart
    hpBar.style.width = hpLeft + '%'

    // Update mana bar status.
    let manaBar = ''
    if(this.role != 'Monster') {
      manaBar = document.querySelector('#game .hero-card-container.is-selected .card-mana')
    } else {
      manaBar = document.querySelector('#game .monster-card-container.is-selected .card-mana')
    }
    const manaStart = manaBar.dataset.mana
    const manaLeft = (this.mana * 100) / manaStart
    manaBar.style.width = manaLeft + '%'

    // Update life (hp) VS status.
    const hpVSHero = document.querySelector('#game #hero-hp-left')
    const hpVSMonster = document.querySelector('#game #monster-hp-left')
    if(target.role != 'Monster') {
      hpVSHero.textContent = target.hp
      this.hpTmp = parseInt(hpVSHero.dataset.hptmp)
      animateValue(hpVSHero, this.hpTmp, target.hp, 1000);
    } else {
      hpVSMonster.textContent = target.hp
      this.hpTmp = parseInt(hpVSMonster.dataset.hptmp)
      animateValue(hpVSMonster, this.hpTmp, target.hp, 1000);}
  }

}

export default Personnage;
