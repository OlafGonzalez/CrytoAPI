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

//At minute 0 past every 90th hour.
var GetFundingsJob = new CronJob('00 */90 * * *', async function() {
  var hoy = new Date();
  console.log(chalk.cyan("GET FUNDINGS JOB STARTS AT: "+formatDate(hoy)));
  const fundings = await actions.GetFundings();

  fundings.forEach(funding => {
    query.SaveDepositos(funding.fid,funding.amount,funding.method_name,funding.status,funding.currency,funding.details.sender_name,funding.details.sender_clabe,formatDate(funding.created_at));
  });

}, null, true, 'America/Mexico_City');


GetFundingsJob.start();




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