let API_key="RGAPI-1a00a867-c6c1-4e57-8958-83ea2d39fa7e"
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


function searchSummoner(){
    summonerName=document.getElementById("summonerName").value;
    console.log(summonerName);
    getRegion();
    data();
}

async function data(){
    let URL="/lol/summoner/v4/summoners/by-name/"+summonerName;
    let fullURL="https://"+regionURL+URL+"?api_key="+API_key;
    if(!fullURL){
        console.log('error')
    }
    console.log(fullURL)
    const dataSummoner1=await fetch(fullURL);
    const dataSummonerFull=await dataSummoner1.json();
    // console.log(dataSummonerFull)

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

    //Summoner wins/lose
    let winLost_url='https://'+ regionURL+'/lol/league/v4/entries/by-summoner/'+dataSummonerFull.id+'?api_key='+API_key;
    let rankedInfo=await fetch(winLost_url);
    let rankedInfoFull=await rankedInfo.json();
    console.log(rankedInfoFull)
    if (!rankedInfoFull){
        console.log('no existe')
    }
    let rankedwins=rankedInfoFull[0].wins;
    let rankedLoss=rankedInfoFull[0].losses; 
    let rankedTier=rankedInfoFull[0].tier;
    let rankedRank=rankedInfoFull[0].rank;
    let rankedLP=rankedInfoFull[0].leaguePoints;
    console.log(rankedLP)
    console.log(rankedRank)

    let winrate=Math.round((rankedwins/(rankedwins+rankedLoss))*1000/10)
    console.log(winrate)

    document.getElementById('wins').innerHTML=rankedwins;
    document.getElementById('losses').innerHTML=rankedLoss;
    document.getElementById('tier').innerHTML=rankedTier;
    document.getElementById('rank').innerHTML=rankedRank;
    document.getElementById('LP').innerHTML=rankedLP;
    document.getElementById('winrate').innerHTML="winrate:"+winrate;
console.log(region)
    let regionNumber=Number(region)
    // Get list of matches, have to check region and use designeted routing value
    //Amerias=NA,BR,LAN,LAS
    //Asia=KR,JP
    //EUROPe=EUN,EUW,TR,RU

    //if region==0,5,6,7 ->NA
    //if 3,4 ->Asia
    //if 1,2,9,10->eu
    //else ->sea

    let routingRegion=getRegionRoute(region);

    console.log(regionNumber)
    console.log(routingRegion)
    //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/l379PuyjqPIqK_wn8RoHVT2MfDSyWjChsLhlS0GP2aoj-XDDpvnfuQb0gKRfgkF2qagwKAze-G8UqA/ids?start=0&count=10&api_key=RGAPI-1a00a867-c6c1-4e57-8958-83ea2d39fa7e
    let matchList='https://'+ routingRegion+'/lol/match/v5/matches/by-puuid/'+dataSummonerFull.puuid+'/ids?start=0&count=10&api_key='+API_key;
    console.log(matchList)


}

function getRegionRoute(regionNumber){
    let routingRegion="";
    if(regionNumber=='0'||regionNumber=='5'||regionNumber=='6'||regionNumber=='7'){
        routingRegion='americas.api.riotgames.com';
    }
    else if(regionNumber=='3'||regionNumber=='4'){
        routingRegion='asia.api.riotgames.com';
    }
    else if(regionNumber=='2'||regionNumber=='3'||regionNumber=='4'){
        routingRegion='europe.api.riotgames.com';
    }
    else{
        routingRegion='sea.api.riotgames.com';
    }
    return routingRegion;
}
