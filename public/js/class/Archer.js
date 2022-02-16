import Personnage from "./Personnage.js";

class Archer extends Personnage {
    //archer =        2x attack speed     & 2x attak Range      & 10% crit          & 2x attack damage    & /2 hp 
    constructor(name) {
        super(name)
        this.hp = this.hp * 1
        this.role = 'Archer'
        this.atk = this.atk * 2
        this.atkSpell = Math.floor(this.atkSpell * 1.35)
        this.armor = this.armor * 2
        this.armorSpell = this.armorSpell + this.armor
    }
    
}

export default Archer