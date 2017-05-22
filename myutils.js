
function searchInArr(array, val, key) {


    var start = 0;
    var end = array.length;

    while (start <= end) {
        var mid = Math.floor((start + end) / 2);

        if (typeof array[mid] === 'object' && key !== undefined) {

            var curr = array[mid];

            if (curr[key] == val) {

                return curr;
            }
            else if (curr[key] > val) {
                end = mid - 1;

            }
            else {
                start = mid + 1;
            }
        }
        else {
            if (array[mid] == val)
                return array[mid];
            else if (array[mid] > val) {
                end = mid - 1;
            }
            else {
                start = mid + 1
            }
        }
    }


}

function dateTimeFromTime(time, mdate) {
    let datearr = [];
    let date = new Date();
    if (mdate) {
        datearr = mdate.split('-');
        date = new Date(datearr[0], datearr[1] - 1, datearr[2], 0, 0, 0, 0);
    }

    let timeArr = time.split(':');

    date.setHours(parseInt(timeArr[0]));
    date.setMinutes(parseInt(timeArr[1]));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;

}

function timeStampFromDateString(date) {

    let datearr = date.split('-');
    let dateTime = new Date(parseInt(datearr[0]), parseInt(datearr[1]) - 1, parseInt(datearr[2]), 0, 0, 0, 0);
    return dateTime.getTime();
}
function dateFromDateString(date) {
    let datearr = date.split('-');
    let dateTime = new Date(parseInt(datearr[0]), parseInt(datearr[1]) - 1, parseInt(datearr[2]), 0, 0, 0, 0);
    return dateTime;
}

function jwt(payload,  secret)
{
    const header = {
        alg:"HS256",
        typ:"JWT"
    };
 
    


 console.log(payload);
    
    let crypto = require('crypto');
    let  encodedHeader =  encodeURIComponent(Buffer.from(JSON.stringify(header)).toString('base64'));
    
    let encodedPayload = encodeURIComponent(Buffer.from(JSON.stringify(payload)).toString("base64"));
  
    let data = encodedHeader +"." +encodedPayload;
    
    let hmac = crypto.createHmac('sha256', secret);
    
  
    hmac.update(data);
    let sig = encodeURIComponent(hmac.digest('base64'));
    return data+'.'+sig;
    

}

function strFromBs64(str)
{
    return str
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function toBase64(padString)
{
     return padString(base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

}


function verifyToken(secret, token)
{
   

 let crypto = require('crypto');
  let ta = token.split('.');
  let header = ta[0];
  let payload = ta[1];
  let sig = ta[2];
   let data = header +"." +payload;
    
    let hmac = crypto.createHmac('sha256', secret);
    
  
    hmac.update(data);
    let sigCalc= encodeURIComponent(hmac.digest('base64'));

    if(sigCalc !== sig)
      return {error: 'invalid access token signature'};
    
    

  let headobj =  JSON.parse(Buffer.from(decodeURIComponent(header), "base64").toString('ascii'));
  let payloadObj = JSON.parse(Buffer.from(decodeURIComponent(payload),"base64").toString('ascii'));
  let signature  = sig;
  return{header:headobj, payload:payloadObj, signature:signature};
}



const secret = '2a6106335a3535c0b87ff3b64ad7b762fd2251975221d22c76b32feffa3b814c1fb7771b2d9dda227bb8a5897d67e2a71c90926d36de7ef80e7496caed844cb4f381dbf30b8b5f72bb1559212c9c30a44dd3eb3c4991a69cd2841c76d6dcde2d982cac69b5ce5b5f05bc6cbe26377dc1f713b3dfa05a84afe6f6769354d53e8c';



module.exports = {secret:secret,verifyToken:verifyToken, arrayFind: searchInArr, dateTimeFromTime: dateTimeFromTime, timeStampFromDateString: timeStampFromDateString, dateFromDateString:dateFromDateString , jwt:jwt};