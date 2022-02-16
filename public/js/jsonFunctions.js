

const fetchFromLocalJson = async function() {
    const response = await fetch('../public/json/champions.json')
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        console.error('Error : ', response.status);
    }
}

const getMapLvl = async function(id) {
    const response = await fetch('http://localhost:8000/map?id='+ id)
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error : ', response.status);
    }
} 

const getChamp = async function(id) {
    const response = await fetch('http://localhost:8000/champs?id='+ id)
    if (response.ok) {
        
        return await response.json();
    } else {
        console.error('Error : ', response.status);
    }
}

const newChamp = async function(id) {
    var data = await fetchFromLocalJson();

    data = data.find(x => x.id == id)         // where id  = ...
    data.lvl = 1;
    
    data.tags = data.tags[0];
    data.stats.spell = 50;
    data.maplvl = 1;
    data.img = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+data.name+"_0.jpg"

    const response = await fetch('http://localhost:8000/champs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
            response.json()
    } else {
        console.error('Server : ' + response.status)
    }
    return data;
  
}