
// const Post = require("../models/Post");
// const Event=require("../models/Event")
// const Sub=require("../models/Sub")
// const Income=require("../models/Income")

module.exports = {
  getSummonerName: async (req, res) => {
    try {
        let name=req.body.SummonerName
        let API_key="RGAPI-7727157a-0ef2-4222-8c4d-dc7b76a47a9f"
        let url='https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+name+'?api_key='+API_key
        
        const SummonerNameurl1=await fetch(url); 
        const SummonerNameurlFull=await SummonerNameurl1.json();
        console.log(SummonerNameurlFull)

        //get Pic
        let picID=SummonerNameurlFull.profileIconId
        let profilePicURL="http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/"+picID+'.png';
        console.log(profilePicURL)

        //regionSelector
        let regions=['br1.api.riotgames.com','eun1.api.riotgames.com'
        ,'euw1.api.riotgames.com','jp1.api.riotgames.com','kr.api.riotgames.com'
        ,'la1.api.riotgames.com','la2.api.riotgames.com','na1.api.riotgames.com','oc1.api.riotgames.com'
        ,'tr1.api.riotgames.com','ru.api.riotgames.com','ph2.api.riotgames.com',
        'sg2.api.riotgames.com','th2.api.riotgames.com','tw2.api.riotgames.com']
        valueRegion=req.body.selectpicker
        console.log(valueRegion)

        //Get winrates
        //https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/_h28nu-QHYA4fc1Rgazl8PQWBpR93eHFj1eSIbbOFlri5KSd?api_key=RGAPI-93e1c4f6-8a5c-46ee-9125-7d7e2b0a154f
        let id=SummonerNameurlFull.id
        let winLost_url='https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id+'?api_key='+API_key;
        const rankedInfo=await fetch(winLost_url);
        const rankedInfoFull=await rankedInfo.json();
        console.log(rankedInfoFull)



        



      res.render("index.ejs", { name:name,SummonerNameurlFull:SummonerNameurlFull,profilePicURL:profilePicURL,
        rankedInfoFull:rankedInfoFull});
    } catch (err) {
      console.log(err);
    }
  },
  
};
