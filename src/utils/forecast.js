const request=require('request')
const geoCode= require('./geocode')

const forecast=(unit,latitude,longitude,callback)=>{
   const url= 'http://api.weatherstack.com/current?access_key=26dd651d326033fac1e587411003d954&query=' + latitude + ',' + longitude + '&units='+unit
   request({url:url,json: true},(error,response)=>{
       if(error){
        callback('Unable to connect to the API')
       }else if (response.body.error){
           callback('Unable to find location')
       }else{
           callback(undefined,
            response.body.current.weather_descriptions[0]+ ". It is currently"+ " "+ response.body.current.temperature+" "+ "degress out. It feels like"+" "+ response.body.current.feelslike+" "+
            "degress out. The humidity is "+ response.body.current.humidity + "%. "
            
            
            )
       }
   })
}

module.exports= forecast