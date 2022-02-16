import Personnage from "./Personnage.js";

class Tank extends Personnage {
//Tank =          4x life             & /4 move speed       & x2 hp regen       & x2 spellblock       & x2 armor 
    constructor(name) {
        super(name);
        this.hp = this.hp * 4;
        this.role = 'Tank';
        this.atk = this.atk;
        this.atkSpell = this.atk *1.5;
        this.armor = this.armor * 2;
        this.armorSpell = this.armorSpell + this.armor;
    }
    
}

export default Tank