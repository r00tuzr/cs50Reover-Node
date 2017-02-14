var fs = require('fs');
var readable = fs.createReadStream('card.raw',{highWaterMark:512});

var FileNum = 0;
var writeable; 

var startWritting = false;

readable.on('data',function(chunk){
    if(startWritting){
        writable.write(chunk); 
    }
    
    if (chunk[0]==0xff && chunk[1]==0xd8 && chunk[2]==0xff){
        writable = fs.createWriteStream(`pic${FileNum}.jpg`,{encoding:'hex'});
        writable.write(chunk);
        startWritting=true;
        
        console.log(`Found #${FileNum}`);
        FileNum++;
    }
    
    
});

