var ccxt = require ('ccxt')
require('dotenv').config()
var CronJob = require('cron').CronJob;
const chalk = require("chalk");
const query = require('./utilities/Query')
const actions = require('./utilities/Actions');
const various = require('./utilities/Various')

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
var SaveTickerJob = new CronJob('*/10 * * * * *', async function() {
  var hoy = new Date();
  console.log(chalk.cyan("GET TIKERS JOB STARTS AT: "+various.formatDate(hoy)));
  const tickerBTCMXN = await actions.GetTicker("btc_mxn");

  console.log(tickerBTCMXN)

  await query.InsertTicker(
    tickerBTCMXN.book,
    Number(tickerBTCMXN.volume),
    Number(tickerBTCMXN.high),
    Number(tickerBTCMXN.last),
    Number(tickerBTCMXN.low),
    Number(tickerBTCMXN.vwap),
    Number(tickerBTCMXN.ask),
    Number(tickerBTCMXN.bid),
    various.formatDate(hoy)
  );

}, null, true, 'America/Mexico_City');


SaveTickerJob.start();


//}

//main();


