import Personnage from "./Personnage.js";

class Support extends Personnage {
//Support =       2x power            & 4x mana
    constructor(name) {
        super(name);
        this.hp = this.hp * 0.75;
        this.role = 'Support';
        this.atk = this.atk * 0.75;
        this.armor = this.armor * 1;
        this.atkSpell = Math.floor(this.atkSpell * 1);
        this.armorSpell = this.armorSpell + this.armor;
    }

}

export default Support;