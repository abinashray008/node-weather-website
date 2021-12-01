const path= require('path')
const express= require('express');
const hbs= require('hbs')
const geoCode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express();
const port= process.env.PORT || 3000

const appDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'/templates/views')
const partialsPath= path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(appDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Abinash S Ray'
    });
})

app.get('/about',(req,res)=>{
    res.send('About!');
})

app.get('/help',(req,res)=>{
    res.render('help',{
         title:'Help',
         name: 'Abinash Ray'
    })
})

app.get('/weather',(req,res)=>{
     if(!req.query.address){
         return res.send({
             error: 'Address must be provided'
         })
     }
     geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){
             return res.send({
                 error: 'Address not found'
             })
         }
         forecast(req.query.unit,latitude,longitude,(error,forecastData)=>{
             if(error){
                 return res.send({
                     error:'Unable to find location'
                 })
             }
             res.send({
                forecast: forecastData,
                location,
               address: req.query.address
            })  
         })
     })
     
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help article not found'
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        message: 'Page not found'
    })
})
app.listen(port, ()=>{
    console.log('server is up on port' + port)
})