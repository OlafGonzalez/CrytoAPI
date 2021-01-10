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

//At minute 0 past every 90th hour.
var GetFundingsJob = new CronJob('00 */90 * * *', async function() {
  var hoy = new Date();
  console.log(chalk.cyan("GET FUNDINGS JOB STARTS AT: "+various.formatDate(hoy)));
  const fundings = await actions.GetFundings();

  fundings.forEach(funding => {
    query.SaveDepositos(
      funding.fid,
      funding.amount,
      funding.method_name,
      funding.status,
      funding.currency,
      funding.details.sender_name,
      funding.details.sender_clabe,
      formatDate(funding.created_at));
  });

}, null, true, 'America/Mexico_City');


GetFundingsJob.start();


