let API_key="RGAPI-9f54b52b-714b-4d46-a472-fb3f7b158286"
let summonerName=""
let NAregion="https://na1.api.riotgames.com"
let region="";
let regionURL="";
let regions=['br1.api.riotgames.com','eun1.api.riotgames.com'
,'euw1.api.riotgames.com','jp1.api.riotgames.com','kr.api.riotgames.com'
,'la1.api.riotgames.com','la2.api.riotgames.com','na1.api.riotgames.com','oc1.api.riotgames.com'
,'tr1.api.riotgames.com','ru.api.riotgames.com','ph2.api.riotgames.com',
'sg2.api.riotgames.com','th2.api.riotgames.com','tw2.api.riotgames.com'
]

//get Region
function getRegion(){
    region=document.getElementById("regions").value;
    regionURL=regions[region]
}
console.log(region)

function searchSummoner(){
    summonerName=document.getElementById("summonerName").value;
    console.log(summonerName);
    getRegion();
    data();
}

async function data(){
    let URL="/lol/summoner/v4/summoners/by-name/"+summonerName;
    let fullURL="https://"+regionURL+URL+"?api_key="+API_key;
    console.log(fullURL)
    const dataSummoner1=await fetch(fullURL);
    const dataSummonerFull=await dataSummoner1.json();
    console.log(dataSummonerFull)

    //Summoner Name
    let name=dataSummonerFull.name;
    document.getElementById("summoner_name").innerHTML=name

    //Summoner Level
    let level=dataSummonerFull.summonerLevel;
    document.getElementById("summoner_level").innerHTML=level

    //Summoner picID
    let picID=dataSummonerFull.profileIconId;
    let profilePicURL="http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/"+picID+'.png';
    document.getElementById("summoner_pic").src=profilePicURL;

}
