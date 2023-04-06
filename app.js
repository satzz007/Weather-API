const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,function(){

  console.log("Website is connected to port 3000");
})

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})



app.post("/",function(req,res){

  var city=req.body.Cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d0d7400bde1278ec2ada8a5a185e6074";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      var wea=JSON.parse(data);
      var cur=wea.weather[0].description;
      var temp=wea.main.temp;
      var icon=wea.weather[0].icon;
      var imgurl="https://openweathermap.org/img/wn/"+icon+"@2px.png";
      console.log(icon);
      res.write("<h1>The temperature is "+temp+" fahrenheits.</h1>");
      res.write("<h3>The current weather decrp is "+cur+".</h3>");
      res.write("<img src="+imgurl+">");
      res.send();
    })
  })
})
