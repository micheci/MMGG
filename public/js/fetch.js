let API_key="RGAPI-93e1c4f6-8a5c-46ee-9125-7d7e2b0a154f"
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
async function getRegion(){
    region=document.getElementById("regions").value;
    regionURL=regions[region]
}


async function searchSummoner(){
    summonerName=document.getElementById("summonerName").value;
    console.log(summonerName);
    getRegion();
    data();
}

// DEAL WITH HOW TO DEAL WITH SUMMONER NOT FOUND
async function data(){
    //getting URL to get summoner via name search
    let URL="/lol/summoner/v4/summoners/by-name/"+summonerName;
    let fullURL="https://"+regionURL+URL+"?api_key="+API_key;
    console.log(fullURL)

    try{
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
    // Check for what kind of tier it is then return pictuere
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
    document.getElementById('winrate').innerHTML=winrate+'%';
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

    let routingRegion=await getRegionRoute(region);

    //plug routing numer into fetch URL for matchList
    console.log(regionNumber)
    console.log(routingRegion)
    //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/l379PuyjqPIqK_wn8RoHVT2MfDSyWjChsLhlS0GP2aoj-XDDpvnfuQb0gKRfgkF2qagwKAze-G8UqA/ids?start=0&count=10&api_key=RGAPI-1a00a867-c6c1-4e57-8958-83ea2d39fa7e
    let matchList='https://'+ routingRegion+'/lol/match/v5/matches/by-puuid/'+dataSummonerFull.puuid+'/ids?start=0&count=5&api_key='+API_key;
    let matchInfo=await fetch(matchList);
    let matchInfoFull=await matchInfo.json();
    console.log(matchInfoFull)//List of matches


  //place url into matchID
    let getMatchInfoResults=await getMatchInfo(matchInfoFull,API_key)
//https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4617014618
  

    

    await getNamesByID(getMatchInfoResults,API_key)



    getTierPic(rankedTier);


    }
    catch(e){
        document.getElementById("error").innerHTML="summoner not found,try another name or chance region"
        console.log('summoner not found,try another name or chance region'
        )
    }
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

//function to show pic tier
function getTierPic(Tier){
    let tierName=Tier;
    if(tierName=="MASTER"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/master.png?image=q_auto,f_webp,w_144&v=1680060873716";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="SILVER"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="BRONZE"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/bronze.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="IRON"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/iron.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="GOLD"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/gold.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="PLATINUM"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/platinum.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="DIAMOND"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/diamond.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="GRANDMASTER"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/grandmaster.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
    else if(tierName=="CHALLENGER"){
        let RankPicURL="https://opgg-static.akamaized.net/images/medals_new/challenger.png?image=q_auto,f_webp,w_144&v=1680060873700";
    document.getElementById("tier_pic").src=RankPicURL;
    }
   
}

//need to check region routing aswell only working for NA right now
async function getMatchInfo(matchListURL,API_key){
    let names=[]
    //fetch data from each past 5 games
//https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4617014618?api_key=RGAPI-0b2d653b-6394-4376-9987-29563365669f
    
    let url='https://americas.api.riotgames.com/lol/match/v5/matches/'
      for(let i=0;i<matchListURL.length;i++){
        let matchInfo=await fetch(url+matchListURL[i]+'?api_key='+API_key);
        let matchInfoFull=await matchInfo.json();
        let matchInfoFull1=matchInfoFull.metadata
        //make it so that it gets the participents, won/loss, kills/deaths/assits of searched summoner
        console.log(matchInfoFull1)
        for(let j=0;j<=9;j++){
            names.push(matchInfoFull1.participants[j] )     
             
        }
    }  
        return names 
} 


//SAVED ALL IDS TO NAME VARIABLE NOW TO CRETE FUCNITON TO CALL FETCH ON ID'S AND GET NAMES
 async function getNamesByID(names,API_key){


    for(let i=0;i<names.length;i++){
        let url='https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/'+names[i]+'?api_key='+API_key
        console.log(url)

        //   let summonernames=await fetch(url)
        //   let summonernamesResult=await summonernames.json();
        //   console.log(summonernamesResult])
       
         
    }
   
}
   