const request = require("request");


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmxvaGFyIiwiYSI6ImNrczVzZmloOTA1OGsyd3MwYjA3OXZ5am8ifQ.efjcC1pnxygPfOYna5NQSw&limit=1`;
  
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to msg services',undefined)
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].geometry.coordinates[0],
                latitude:body.features[0].geometry.coordinates[1],
                loaction:body.features[0].place_name
            })
        }
    })
  };
  
 

  module.exports=geocode