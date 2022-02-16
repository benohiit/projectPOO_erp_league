import Personnage from "./Personnage.js"

class Magician extends Personnage {
//Mage =          6x power            & /4 attack           & /2 hp 
    constructor(name) {
        super(name)
        this.hp = this.hp * 0.75
        this.role = 'Magician'
        this.atk = this.atk * 1.4
        this.armor = this.armor * 1
        this.atkSpell = Math.floor(this.atkSpell * 1.7)
        this.armorSpell = this.armorSpell + this.armor
    }

}

export default Magician