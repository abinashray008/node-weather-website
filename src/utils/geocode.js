const request= require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoiYWJpbmFzaHJheTAwNyIsImEiOiJja3dtZXI0ZmUyYnF6Mm5uc3l6YzB6MTN5In0.qeVBPiXqiYAjzbearpdq5Q'
    request({url:url,json: true},(error,response)=>{
        if(error){
            callback('Unable to connect to the API')
        }
        else if(response.body.features.length===0){
            callback('Unable to find location')
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })

}

module.exports=geoCode