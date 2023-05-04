const fetch = require('node-fetch');



module.exports = {
  _getSummonerName: async (req, res) => {
    try {
      let name = req.body.SummonerName;
      let valueRegion = req.body.selectpicker;
      let API_key = process.env.Riot_API_STRING;
      let url = 'https://' + valueRegion + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + API_key;

      const SummonerNameurl1 = await fetch(url);
      const SummonerNameurlFull = await SummonerNameurl1.json();
      console.log(SummonerNameurlFull);

      //get Pic
      let picID = SummonerNameurlFull.profileIconId;
      let profilePicURL = "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/" + picID + '.png';
      //Summoner ID
      let id = SummonerNameurlFull.id;
      //get win/loss/tier/rank & LP
      let winLost_url = 'https://' + valueRegion + '/lol/league/v4/entries/by-summoner/' + id + '?api_key=' + API_key;
      console.log(winLost_url);
      const rankedInfo = await fetch(winLost_url);
      const rankedInfoFull = await rankedInfo.json();
      console.log(rankedInfoFull)
      // if rankedInfoFull.tier[0]
      console.log('before')
      console.log(rankedInfoFull[0].tier);

      //Get routing regions
      let routingRegion = '';
      if (valueRegion == 'br1.api.riotgames.com' || valueRegion == 'la2.api.riotgames.com' || valueRegion == 'la1.api.riotgames.com' || valueRegion == 'na1.api.riotgames.com') {
        routingRegion = 'americas.api.riotgames.com';
      }
      else if (valueRegion == 'kr.api.riotgames.com' || valueRegion == 'jp1.api.riotgames.com') {
        routingRegion = 'asia.api.riotgames.com';
      }
      else if (valueRegion == 'europe.api.riotgames.com' || valueRegion == 'euw1.api.riotgames.com' || valueRegion == 'ru.api.riotgames.com' || valueRegion == '	tr1.api.riotgames.com') {
        routingRegion = 'europe.api.riotgames.com';
      }
      else
        routingRegion = 'sea.api.riotgames.com';

      //get list of matches via ID
      //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/l379PuyjqPIqK_wn8RoHVT2MfDSyWjChsLhlS0GP2aoj-XDDpvnfuQb0gKRfgkF2qagwKAze-G8UqA/ids?start=0&count=5&api_key=RGAPI-66efb83d-3934-4fcc-85d5-b34710bd3040 
      let matchListUrl = 'https://' + routingRegion + '/lol/match/v5/matches/by-puuid/' + SummonerNameurlFull.puuid + '/ids?start=0&count=2&api_key=' + API_key;
      //console.log(matchListUrl)
      const matchListUrlFull = await fetch(matchListUrl);
      const matchListUrlFull1 = await matchListUrlFull.json();
      //console.log(matchListUrlFull1)
      //get players   
      let NameofPlayers = [];
      NameofPlayers = await getNames(matchListUrlFull1, routingRegion, API_key, valueRegion);
      let participantsPicsID = [];
      let ItemsPicsID=[]
      let championName = [];
      let assists=[]
      let deaths=[]
      let kills=[]
      let champPicsUrl = [];
      let matchesBackgroundColor=[]
      let items0=[]
      let items1=[]
      let items2=[]
      let items3=[]
      let items4=[]
      let items5=[]
      let items6=[]
      let items0Pic=[]
      let items1Pic=[]
      let items2Pic=[]
      let items3Pic=[]
      let items4Pic=[]
      let items5Pic=[]
      let items6Pic=[]
      participantsPicsID = await getParticipantsPics(matchListUrlFull1, routingRegion, API_key, valueRegion);
      ItemsPicsID=await getItems(matchListUrlFull1, routingRegion,NameofPlayers)
      await getWinLossColor(matchListUrlFull1, routingRegion,NameofPlayers)
     
      //await getItems(matchListUrlFull1, routingRegion,NameofPlayers,items0)
      let champsPlayed=[]
      let summonerPersonalScores=[]
      let personalKills=[]
      let personalDeaths=[]
      let personalAssists=[]
          
      let userChampPicExample=await getUserChampPic(NameofPlayers,championName)
      await getUserScore(matchListUrlFull1,kills, routingRegion,NameofPlayers)

      //console.log(ItemsPicsID)
      getItemPics0()
      getItemPics1()
      getItemPics2()
      getItemPics3()
      getItemPics4()
      getItemPics5()
      getItemPics6()

      
      //console.log(champsPlayed)
      //console.log(championName);
      //console.log(NameofPlayers)\
      
      //console.log(assists)
      //console.log(deaths)
      //console.log(assists)
      //console.log(matchesBackgroundColor)
      console.log(items0)
      console.log(items1)
      console.log(items2)
      console.log(items3)
      console.log(items4)
      console.log(items5)
      console.log(items6)
  


      //champPicsUrl=await getChampPics(championName)
      // console.log(participantsPicsID[0]['championName'])
      //get pics of champs
      async function getNames(matchListUrlFull1, routingRegion) {
        let list = [];
        for (let i = 0; i < matchListUrlFull1.length; i++) {
          let matchDataList = 'https://' + routingRegion + '/lol/match/v5/matches/' + matchListUrlFull1[i] + '?api_key=' + API_key;
          const matchDataListFull = await fetch(matchDataList);
          const matchDataListFull1 = await matchDataListFull.json();

          let participants = matchDataListFull1.metadata.participants;

          for (let j = 0; j < participants.length; j++) {
            let individualMatchIdurl = 'https://' + valueRegion + '/lol/summoner/v4/summoners/by-puuid/' + participants[j] + '?api_key=' + API_key;
            const individualMatchIdurlFull = await fetch(individualMatchIdurl);
            const individualMatchIdurl1 = await individualMatchIdurlFull.json();
            list.push(individualMatchIdurl1.name);
            //console.log(individualMatchIdurl1)
          }
        } return list;
      }
      async function getParticipantsPics(matchListUrlFull1, routingRegion) {


        for (let i = 0; i < matchListUrlFull1.length; i++) {
          let matchDataList = 'https://' + routingRegion + '/lol/match/v5/matches/' + matchListUrlFull1[i] + '?api_key=' + API_key;
          const matchDataListFull = await fetch(matchDataList);
          const matchDataListFull1 = await matchDataListFull.json();
          participantsPicsID = matchDataListFull1.info;

          //navigate through all the participants
          for (let j = 0; j < 10; j++) {

            championName.push(participantsPicsID['participants'][j]['championName']);
                assists.push(participantsPicsID['participants'][j]['assists'])
             deaths.push(participantsPicsID['participants'][j]['deaths'])
            kills.push(participantsPicsID['participants'][j]['kills'])

            //champPicsUrl.push('http://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/'+championName[j]+'.png')
            //console.log(champPicsUrl)
          }
        }
        return participantsPicsID;
      }

      await getChampPics(championName);
      //console.log(championName)

      async function getChampPics(championName) {
        for (let j = 0; j < 20; j++) {

          champPicsUrl.push('http://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/' + championName[j] + '.png');
        }
      }

// Make function to get users played champ CAN

      async function getUserChampPic(NameofPlayers,championName){
        for(let i=0;i<20;i++){
          if(NameofPlayers[i]===req.body.SummonerName){
            console.log(championName[i])
            champsPlayed.push(championName[i])
          
          }
          
        }     
      }
// fixing items
      
      //Make function to get users personal score
      async function getUserScore(matchListUrlFull1,kills, routingRegion,NameofPlayers) {
        // for (let i = 0; i < matchListUrlFull1.length; i++) {
        //   let matchDataList = 'https://' + routingRegion + '/lol/match/v5/matches/' + matchListUrlFull1[i] + '?api_key=' + API_key;
        //   const matchDataListFull = await fetch(matchDataList);
        //   const matchDataListFull1 = await matchDataListFull.json();
        //   summonerPersonalScores = matchDataListFull1.info;
          //navigate through all the participants
          for (let j = 0; j < NameofPlayers.length; j++) {
            if(req.body.SummonerName===NameofPlayers[j]){
              //console.log(NameofPlayers[j])
              //console.log(j)
              personalKills.push(kills[j])
              personalAssists.push(assists[j])
              personalDeaths.push(deaths[j])

              
               
              //personalKills.push(summonerPersonalScores['participants'][j]['kills'])
              //personalDeaths.push(summonerPersonalScores['participants'][j]['deaths'])
              //personalAssists.push(summonerPersonalScores['participants'][j]['assists'])
          }
          
        }
        return summonerPersonalScores;
      }

      async function getItems(matchListUrlFull1, routingRegion,NameofPlayers) {
        
        
        for (let i = 0; i < matchListUrlFull1.length; i++) {
          let matchDataList = 'https://' + routingRegion + '/lol/match/v5/matches/' + matchListUrlFull1[i] + '?api_key=' + API_key;
          const matchDataListFull = await fetch(matchDataList);
          const matchDataListFull1 = await matchDataListFull.json();
          ItemsPicsID = matchDataListFull1.info;
          //navigate through all the participants and check if same user find if win or lost game
          for (let j = 0; j <10; j++) {
            if(req.body.SummonerName===ItemsPicsID['participants'][j]['summonerName']){
              console.log(NameofPlayers[j])
              items0.push(ItemsPicsID['participants'][j]['item0'])
              items1.push(ItemsPicsID['participants'][j]['item1'])
              items2.push(ItemsPicsID['participants'][j]['item2'])
              items3.push(ItemsPicsID['participants'][j]['item3'])
              items4.push(ItemsPicsID['participants'][j]['item4'])
              items5.push(ItemsPicsID['participants'][j]['item5'])
              items6.push(ItemsPicsID['participants'][j]['item6'])
              console.log(ItemsPicsID['participants'][j]['championName'])
               console.log(ItemsPicsID['participants'][j]['item0'])
                console.log(ItemsPicsID['participants'][j]['item1'])
                console.log(ItemsPicsID['participants'][j]['item2'])
                console.log(ItemsPicsID['participants'][j]['item3'])
                console.log(ItemsPicsID['participants'][j]['item4'])
                console.log(ItemsPicsID['participants'][j]['item5'])
                console.log(ItemsPicsID['participants'][j]['item6'])
            }
          }
        }return ItemsPicsID
        
      }
      function getItemPics0(){
        for(let i=0;i<items0.length;i++){
          items0Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items0[i]}.png`)
        }
      }
      function getItemPics1(){
        for(let i=0;i<items1.length;i++){
          items1Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items1[i]}.png`)
        }
      }
      function getItemPics2(){
        for(let i=0;i<items2.length;i++){
          items2Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items2[i]}.png`)
        }
      }function getItemPics3(){
        for(let i=0;i<items3.length;i++){
          items3Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items3[i]}.png`)
        }
      }function getItemPics4(){
        for(let i=0;i<items4.length;i++){
          items4Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items4[i]}.png`)
        }
      }
      function getItemPics5(){
        for(let i=0;i<items5.length;i++){
          items5Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items5[i]}.png`)
        }
      }
      function getItemPics6(){
        for(let i=0;i<items6.length;i++){
          items6Pic.push(`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${items6[i]}.png`)
        }
      }


      async function getWinLossColor(matchListUrlFull1, routingRegion,NameofPlayers) {
        for (let i = 0; i < matchListUrlFull1.length; i++) {
          let matchDataList = 'https://' + routingRegion + '/lol/match/v5/matches/' + matchListUrlFull1[i] + '?api_key=' + API_key;
          const matchDataListFull = await fetch(matchDataList);
          const matchDataListFull1 = await matchDataListFull.json();
          participantsPicsID = matchDataListFull1.info;

          //navigate through all the participants and check if same user find if win or lost game
          for (let j = 0; j < 10; j++) {
            if(req.body.SummonerName===NameofPlayers[j]){
             
              matchesBackgroundColor.push(participantsPicsID['participants'][j]['win'])
            }
          }
        }
        
      }
     




      res.render("index.ejs", {
        name: name,matchesBackgroundColor:matchesBackgroundColor,items0Pic:items0Pic,items1Pic:items1Pic,items2Pic:items2Pic,items3Pic:items3Pic,items4Pic:items4Pic,personalKills:personalKills,personalDeaths:personalDeaths,personalAssists:personalAssists,assists:assists,deaths:deaths,kills:kills,champsPlayed:champsPlayed, SummonerNameurlFull: SummonerNameurlFull, profilePicURL: profilePicURL,
        rankedInfoFull: rankedInfoFull,items5Pic:items5Pic,items6Pic:items6Pic, NameofPlayers: NameofPlayers, champPicsUrl: champPicsUrl
      });
    } catch (err) {
      console.log(err);
    }
  },
  get getSummonerName() {
    return this._getSummonerName;
  },
  set getSummonerName(value) {
    this._getSummonerName = value;
  },
  
};
