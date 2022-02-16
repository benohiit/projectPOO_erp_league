import Personnage from "./Personnage.js"

class Assassin extends Personnage {
//Assassin =      4x attack damage    & 2x move speed       & /2 hp             & 25% crit 
    constructor(name) {
        super(name)
        this.hp = this.hp * 1.25
        this.role = 'Assassin'
        this.atk = this.atk * 1.6
        this.atkSpell = Math.floor(this.atkSpell * 1.35)
        this.armor = this.armor * 3
        this.armorSpell = this.armorSpell + this.armor
    }

}

export default Assassin