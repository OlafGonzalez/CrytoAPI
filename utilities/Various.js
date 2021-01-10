


exports.formatDate = function(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds();
  
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hour.length < 2)
      hour = '0' + hour;
    if(minutes < 10)
      minutes = '0' + minutes;
    if(seconds < 10)
      seconds = '0' + seconds;
    
    var fecha = year +'-'+ month +'-'+ day +' '+ hour +':'+ minutes +':'+ seconds;
    return fecha;
}

exports.formatDateSinceMinutes = function(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;
  if(minutes < 10)
    minutes = '0' + minutes;
  if(seconds < 10)
    seconds = '0' + seconds;
  
  var fecha = year +'-'+ month +'-'+ day +' '+ hour +':'+ minutes;
  return fecha;
}


exports.formatDateOnlyDate = function(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;
  if(minutes < 10)
    minutes = '0' + minutes;
  if(seconds < 10)
    seconds = '0' + seconds;
  
  var fecha = year +'-'+ month +'-'+ day;
  return fecha;
}