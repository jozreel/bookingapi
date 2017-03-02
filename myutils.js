
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

function dateTimeFromTime(time,mdate)
{
    let datearr=[];
    let date = new Date();
    if(mdate)
     {
      datearr =  mdate.split('-');
       date =  new Date(datearr[0], datearr[1]-1, datearr[2], 0,0,0,0);
     }
     
    let timeArr =time.split(':');

    date.setHours(parseInt(timeArr[0]));
    date.setMinutes(parseInt(timeArr[1]));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;

}

function timeStampFromDateString(date)
{

    let datearr =  date.split('-');
    let dateTime =  new Date(parseInt(datearr[0]), parseInt(datearr[1])-1, parseInt(datearr[2]), 0,0,0,0);
    return dateTime.getTime();
}

module.exports = {arrayFind:searchInArr, dateTimeFromTime:dateTimeFromTime, timeStampFromDateString:timeStampFromDateString};