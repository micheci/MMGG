


module.exports = {
  getSummonerName: async (req, res) => {
    try {
        let name=req.body.SummonerName
        let valueRegion=req.body.selectpicker
        let API_key="RGAPI-bc168463-4b44-4a0c-aeeb-d476c2566ecb"
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

        // if rankedInfoFull.tier[0]
        
        console.log(rankedInfoFull[0].tier)

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

        //get list of matches via ID
        //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/l379PuyjqPIqK_wn8RoHVT2MfDSyWjChsLhlS0GP2aoj-XDDpvnfuQb0gKRfgkF2qagwKAze-G8UqA/ids?start=0&count=5&api_key=RGAPI-66efb83d-3934-4fcc-85d5-b34710bd3040 
        let matchListUrl='https://'+routingRegion+'/lol/match/v5/matches/by-puuid/'+ SummonerNameurlFull.puuid+'/ids?start=0&count=2&api_key='+API_key     
        //console.log(matchListUrl)
        const matchListUrlFull=await fetch(matchListUrl);
        const matchListUrlFull1=await matchListUrlFull.json();
        //console.log(matchListUrlFull1)


        //get players   
        let NameofPlayers=[];
        NameofPlayers=await getNames(matchListUrlFull1,routingRegion,API_key,valueRegion);
        let participantsPicsID=[]
        let championName=[]
        let champPicsUrl=[]
        participantsPicsID=await getParticipantsPics(matchListUrlFull1,routingRegion,API_key,valueRegion)
        console.log(championName)
        console.log(champPicsUrl)
        //get pics of champs
       
        
     
    
        async function getNames(matchListUrlFull1,routingRegion){
            let list=[]
            for(let i=0;i<matchListUrlFull1.length;i++){
                let matchDataList= 'https://'+routingRegion+'/lol/match/v5/matches/'+matchListUrlFull1[i]+'?api_key='+API_key             
                const matchDataListFull=await fetch(matchDataList);
                const matchDataListFull1=await matchDataListFull.json(); 
                
                let participants=matchDataListFull1.metadata.participants
            
                for(let j=0;j<participants.length;j++){
                    let individualMatchIdurl= 'https://'+valueRegion+'/lol/summoner/v4/summoners/by-puuid/'+participants[j]+'?api_key='+API_key;
                    const individualMatchIdurlFull=await fetch(individualMatchIdurl);
                    const individualMatchIdurl1=await individualMatchIdurlFull.json();
                    list.push(individualMatchIdurl1.name)
                    //console.log(individualMatchIdurl1)
                        }
                }return list
        }
       async function getParticipantsPics(matchListUrlFull1,routingRegion){
        
       
          for(let i=0;i<matchListUrlFull1.length;i++){
            let matchDataList= 'https://'+routingRegion+'/lol/match/v5/matches/'+matchListUrlFull1[i]+'?api_key='+API_key             
            const matchDataListFull=await fetch(matchDataList);
            const matchDataListFull1=await matchDataListFull.json(); 
             participantsPicsID=matchDataListFull1.info
             //navigate through all the participants
             for(let j=0;j<10;j++){
             
              championName.push(participantsPicsID['participants'][j]['championName'])
              champPicsUrl.push('http://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/'+championName[j]+'.png')
           

              //console.log(participantsPicsID['participants'][j]['championName'])
             }          
          }
           return participantsPicsID        
        }
        
       
        
      
            
        res.render("index.ejs", { name:name,SummonerNameurlFull:SummonerNameurlFull,profilePicURL:profilePicURL,
          rankedInfoFull:rankedInfoFull,NameofPlayers:NameofPlayers,champPicsUrl:champPicsUrl});
      } catch (e) {
        console.log(err);
      }
    },
  
};
