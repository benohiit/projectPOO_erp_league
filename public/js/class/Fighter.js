import Personnage from "./Personnage.js"

class Fighter extends Personnage {
//Fighter =       2x hp               & 2x attack
    constructor(champ) {
        super(champ)
        this.hp = this.hp * 2
        this.role = 'Fighter'
        this.atk = this.atk * 2
        this.armor = this.armor * 2
        this.armorSpell = this.armorSpell + this.armor
    }

}

export default Fighter