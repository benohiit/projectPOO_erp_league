
const main = document.getElementById('main');

fetch("champions.json")
.then((response) => {
    return response.json()
    })

.then((data) => {
    //console.log(data);
    
    for (var i = 0; i<data.length; i++ ){
        var img = new Image();
        img.src = data[i].icon; 
        const newDiv = document.createElement('div');
        const newTitle = document.createElement('h2');
        const newP = document.createElement('p');
        newDiv.className = 'champDiv';
        newDiv.id = data[i].id;     //id = aatrox, name = Aatrox
        newTitle.appendChild(document.createTextNode(data[i].name));
        newP.appendChild(document.createTextNode(data[i].title));
        main.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newP);
        newDiv.appendChild(img); 
        //newDiv.appendChild(document.createTextNode(data[i].description));    a mettre dans un ::hover peut etre ?
        newDiv.appendChild(document.createElement("br"));
        newDiv.appendChild(document.createTextNode("Type: "));
        
        var icon1 = new Image();
        icon1.src = "../img/"+data[i].tags[0] +"_icon.png"; 
        newDiv.appendChild(icon1);
        
        if(data[i].tags[1]){
            var icon2 = new Image();
            icon2.src = "../img/"+data[i].tags[1] +"_icon.png"; 
            newDiv.appendChild(icon2);
        }        
                        
    } 
    // creation des effets en +
    const champSquares = document.querySelectorAll(".champDiv");
    const champPicker = document.querySelector(".champPick");
    const profile = document.querySelector("#profile");
    const description = document.querySelector("#description");
    const stats = document.querySelector("#stats");
    
    for (var i = 0; i < champSquares.length; i++) {
        champSquares[i].addEventListener('click', function(event) {
            champPicker.classList.add("active");

            //supprime le hero deja séléctionné
            profile.querySelectorAll('*').forEach(n => n.remove());     
            description.querySelectorAll('p').forEach(n => n.remove());     
            stats.querySelectorAll('*').forEach(n => n.remove());     
            
            var id = this.id;
            var champ = data.find(item => item.id == id)  

            var newTitle = document.createElement('h2');
            var newP = document.createElement('p');  
            var descrP = document.createElement('p');  
            var imgSelected = new Image();

            newTitle.appendChild(document.createTextNode(champ.name));
            newP.appendChild(document.createTextNode(champ.title));
            imgSelected.src = champ.icon;
            
            profile.appendChild(newTitle);
            profile.appendChild(newP);
            profile.appendChild(imgSelected);

            var type = new Image();
            type.src = "../img/"+champ.tags[0] +"_icon.png"; 
            type.style.width = '50px';
            type.style.height = '50px';
            profile.appendChild(document.createElement("br"));
            profile.appendChild(type);
            
            descrP.appendChild(document.createTextNode(champ.description));
            description.prepend(descrP);
            /* var tittleStats = document.createElement('h2');
            tittleStats.appendChild(document.createTextNode("Stats:")); 
            stats.appendChild(tittleStats);*/
            var allStats = document.createElement('p'); 
            allStats.appendChild(document.createTextNode("HP: " + ((champ.tags[0] == "Fighter")  ? champ.stats.hp *2 : champ.stats.hp)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Mana: " + ((champ.tags[0] == "Support") ? champ.stats.mp *2 : champ.stats.mp)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Power: " + ((champ.tags[0] == "Mage") ? 100 : champ.tags[0] == "Support" ? 40 : 0)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Attack damage: " + ((champ.tags[0] == "Assassin") ? champ.stats.attackdamage *4 : champ.tags[0] == "Fighter" ? champ.stats.attackdamage *2 : champ.stats.attackdamage )));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Attack speed: " + ((champ.tags[0] == "Marksman") ? champ.stats.attackspeed *2 : champ.stats.attackspeed )));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Attack range: " + ((champ.tags[0] == "Marksman") ? champ.stats.attackrange *2 : champ.stats.attackrange)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Move speed: " + ((champ.tags[0] == "Tank") ? champ.stats.movespeed /2 : champ.tags[0] == "Assassin" ? champ.stats.movespeed *4 : champ.stats.movespeed)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Armor: " + ((champ.tags[0] == "Tank") ? champ.stats.armor *2 : champ.stats.armor)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Spell block: " + ((champ.tags[0] == "Tank") ? champ.stats.armor *2 : champ.stats.spellblock)));
            allStats.appendChild(document.createElement("br"));
            allStats.appendChild(document.createTextNode("Hp regen: " + ((champ.tags[0] == "Tank") ? champ.stats.armor *2 : champ.stats.hpregen)));
            allStats.appendChild(document.createElement("br"));

            stats.appendChild(allStats);


            

        });
    }
});



