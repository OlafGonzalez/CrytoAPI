var ccxt = require ('ccxt')
require('dotenv').config()
var CronJob = require('cron').CronJob;
const chalk = require("chalk");
const query = require('./utilities/Query')
const actions = require('./utilities/Actions');
/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/


//async function main (){
var GetTradesJob = new CronJob('*/10 * * * * *', async function() {
    var hoy = new Date();
    console.log(chalk.cyan("GET TRADES JOB STARTS AT: "+formatDate(hoy)));
    const trades = await actions.GetUserTrades("btc_mxn");
    //console.log(trades)

    trades.forEach(trade => {
        query.SaveTrades(
            trade.book,
            trade.minor,
            trade.major,
            formatDate(trade.created_at),
            trade.fees_amount,
            trade.fees_currency,
            trade.minor_currency,
            trade.major_currency,
            trade.oid,
            trade.tid,
            trade.price,
            trade.side,
            trade.maker_side);
    });
}, null, true, 'America/Mexico_City');

//}

//main();


function formatDate(date) {
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
    if(minutes < 9)
      minutes = '0' + minutes;
    if(seconds < 9)
      seconds = '0' + seconds;
    
    var fecha = year +'-'+ month +'-'+ day +' '+ hour +':'+ minutes +':'+ seconds;
    return fecha;
  }