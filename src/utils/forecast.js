const request=require('request')
const geoCode= require('./geocode')

const forecast=(latitude,longitude,callback)=>{
   const url= 'http://api.weatherstack.com/current?access_key=26dd651d326033fac1e587411003d954&query=' + latitude + ',' + longitude + '&units=f'
   request({url:url,json: true},(error,response)=>{
       if(error){
        callback('Unable to connect to the API')
       }else if (response.body.error){
           callback('Unable to find location')
       }else{
           callback(undefined,"it is currently"+ " "+ response.body.current.temperature+" "+ "degress out. It feels like"+" "+ response.body.current.feelslike+" "+"degress out")
       }
   })
}

module.exports= forecast