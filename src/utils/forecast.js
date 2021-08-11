const request = require("request");

const forecast=(lat,lon,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=8a9a5b25aaef9723438829ae3d14a364&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(body.error){
            callback('try different coordinates',undefined)
        }else{
            callback(undefined,{
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like:body.current.feelslike,
                location:body.location.region
            })
        }
    })

}




module.exports=forecast