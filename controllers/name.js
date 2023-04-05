
// const Post = require("../models/Post");
// const Event=require("../models/Event")
// const Sub=require("../models/Sub")
// const Income=require("../models/Income")

module.exports = {
  getSummonerName: async (req, res) => {
    try {
        let name=req.body.SummonerName
        let valueRegion=req.body.selectpicker
        let API_key="RGAPI-66efb83d-3934-4fcc-85d5-b34710bd3040"
        let url='https://'+valueRegion+'/lol/summoner/v4/summoners/by-name/'+name+'?api_key='+API_key
        
        const SummonerNameurl1=await fetch(url); 
        const SummonerNameurlFull=await SummonerNameurl1.json();
        console.log(SummonerNameurlFull)

        //get Pic
        let picID=SummonerNameurlFull.profileIconId
        let profilePicURL="http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/"+picID+'.png';
        //Summoner ID
        let id=SummonerNameurlFull.id
        //get win/loss/tier/rank & LP
        let winLost_url='https://'+valueRegion+'/lol/league/v4/entries/by-summoner/'+id+'?api_key='+API_key;
        console.log(winLost_url)
        const rankedInfo=await fetch(winLost_url);
        const rankedInfoFull=await rankedInfo.json();
        console.log(rankedInfoFull)

        //Get routing regions
        let routingRegion=''
        if (valueRegion=='br1.api.riotgames.com'||valueRegion=='la2.api.riotgames.com'||valueRegion=='la1.api.riotgames.com'||valueRegion=='na1.api.riotgames.com'){
            routingRegion='americas.api.riotgames.com'
        }
        else if(valueRegion=='kr.api.riotgames.com'||valueRegion=='jp1.api.riotgames.com'){
            routingRegion='asia.api.riotgames.com'
        }
        else if(valueRegion=='europe.api.riotgames.com'||valueRegion=='euw1.api.riotgames.com'||valueRegion=='ru.api.riotgames.com'||valueRegion=='	tr1.api.riotgames.com'){
            routingRegion='europe.api.riotgames.com'
        }
        else routingRegion='sea.api.riotgames.com'

//https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/l379PuyjqPIqK_wn8RoHVT2MfDSyWjChsLhlS0GP2aoj-XDDpvnfuQb0gKRfgkF2qagwKAze-G8UqA/ids?start=0&count=5&api_key=RGAPI-66efb83d-3934-4fcc-85d5-b34710bd3040 
let matchListUrl='https://'+routingRegion+'/lol/match/v5/matches/by-puuid/'+ SummonerNameurlFull.puuid+'/ids?start=0&count=5&api_key='+API_key     
console.log(matchListUrl)
        



      res.render("index.ejs", { name:name,SummonerNameurlFull:SummonerNameurlFull,profilePicURL:profilePicURL,
        rankedInfoFull:rankedInfoFull});
    } catch (err) {
      console.log(err);
    }
  },
  
};
