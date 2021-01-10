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
var GetTradesJob = new CronJob('*/10 * * * * *', async function() {
    var hoy = new Date();
    console.log(chalk.cyan("GET TRADES JOB STARTS AT: "+various.formatDate(hoy)));
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

