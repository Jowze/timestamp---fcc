let http = require("http");
let url = require("url");
let moment = require("moment");



function formatFromNumber(path){
  let unixFormat = moment.unix(path).format("X");
    if(unixFormat.includes("Invalid date")){
      unixFormat = null;
    }
  let naturalFormat = moment.unix(path).format("MMMM D, YYYY");
  if(naturalFormat.includes("Invalid date")){
    naturalFormat = null;
  }
  let result = formatResponse(unixFormat, naturalFormat);
  return result;
}

function formatFromNatural(path){
  const naturalPath = path.split("%").join(" "); 
  let unixFormat = moment(naturalPath).format("X");
  console.log(unixFormat);
    if(unixFormat.includes("Invalid date")){
      unixFormat = null;
    }
  let naturalFormat = moment(naturalPath).format("MMMM D, YYYY");
 console.log(naturalFormat);
  if(naturalFormat.includes("Invalid date")){
    naturalFormat = null;
  }
  let result = formatResponse(unixFormat, naturalFormat);
  return result;
}

function formatResponse(unix, natural){
  const result = {
  unix: unix,
  natural: natural
  }
  return result;
}



http.createServer((req,res) => {
  const path = url.parse(req.url).path.substr(1);
  let result;
    if (isNaN(parseInt(path))){
    result = formatFromNatural(path);
    } else {
    result = formatFromNumber(path)
       
    }
 
 let data = JSON.stringify(result); 
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(data);
}). listen(3000);