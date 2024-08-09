import express from "express";
import bodyParser from "body-parser";
import https from "https";
const app=express();
app.set('view engine','ejs');
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    const city=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f237077b74c3cdfad63b03ec58f6785c&units=metric";
    https.get(url,function(respond){
        console.log(respond.statusCode);    //this thing is fo sending status code
        respond.on("data",function(data){
            const weatherData=JSON.parse(data);
            const tem=weatherData.main.temp;
            
            const icon=weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.render('weather',{name:city,temp:tem,img:imgUrl})
            // res.write("<h1>The temperature of " + city +  " is " +tem + "degree celcius" + "</h1>");
            // res.write("<img src=" +imgUrl+">");
            res.send()
            
        });
    });

});

app.listen(3000,function(){
    console.log("server is running in 3000");
})