const {format} =require('date-fns');
const {v4:uuid} =require('uuid');
const fs=require('fs')
const fsPromises=require('fs').promises;
const path=require('path');

const logEvent=async (logName,message)=>{
    const dateTime=`${format(new Date(),"yyyyMMdd\tHH:MM:SS")}`
    const logItem=`${dateTime}\t${uuid()}\t${message}\n`;
    logName=logName+".txt"
    try{
        if(!fs.existsSync(path.join(__dirname,'..','errors'))){
            fsPromises.mkdir(path.join(__dirname,'..','errors'));
        }
        if(!fs.existsSync(path.join(__dirname,'..','errors',logName))){
            fs.writeFileSync(path.join(__dirname,'..','errors',logName),"");
        }
        await fsPromises.appendFile(path.join(__dirname,'..','errors',logName),logItem);
    }catch(error){
        console.error(error);
    }

}

module.exports=logEvent;