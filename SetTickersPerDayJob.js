var ccxt = require ('ccxt')
require('dotenv').config()
var CronJob = require('cron').CronJob;
const chalk = require("chalk");
const query = require('./utilities/Query')
const actions = require('./utilities/Actions');
const various = require('./utilities/Various')
var strtotime = require('strtotime');


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


var SetTickersPerDayJob = new CronJob('00 00 * * *', async function() {
//async function main (){
    var hoy = new Date();
    let ayer =various.formatDateOnlyDate(new Date(strtotime("-1 day")));
    console.log(chalk.cyan("GET INFO TICKER PER DAY JOB STARTS AT: "+various.formatDate(hoy)));
    query.GetTickerPerDay(ayer,various.formatDate(hoy),async function(tickers){
        //console.log(tickers)
        let volumen_med = 0 
        let high_med = 0 
        let last_med = 0
        let low_med = 0
        let vwap_med = 0
        let ask_med = 0
        let bid_med = 0
        //MAXIMOS - MINIMOS
        let volumen_max_min = []
        let high_max_min = []
        let last_max_min = []
        let low_max_min = []
        let vwap_max_min = []
        let ask_max_min = []
        let bid_max_min = []
        
        tickers.forEach(async ticker => {
            volumen_max_min.push(ticker.volumen)
            high_max_min.push(ticker.high)
            last_max_min.push(ticker.last)
            low_max_min.push(ticker.low)
            vwap_max_min.push(ticker.vwap)
            ask_max_min.push(ticker.ask)
            bid_max_min.push(ticker.bid)
            
            volumen_med = (volumen_med + ticker.volumen)
            high_med = (high_med + ticker.high) 
            last_med = (last_med + ticker.last) 
            low_med = (low_med + ticker.low) 
            vwap_med = (vwap_med + ticker.vwap) 
            ask_med = (ask_med + ticker.ask) 
            bid_med = (bid_med + ticker.bid) 
        });
        
        await query.InsertTickerPerDay(
            tickers[0].book,
            volumen_med/tickers.length,
            high_med/tickers.length,
            last_med / tickers.length,
            low_med / tickers.length,
            vwap_med / tickers.length,
            ask_med / tickers.length,
            bid_med/ tickers.length,
            "MED",
            various.formatDateOnlyDate(new Date()))
        
        await query.InsertTickerPerDay(
            tickers[0].book,
            Math.min(...volumen_max_min),
            Math.min(...high_max_min),
            Math.min(...last_max_min),
            Math.min(...low_max_min),
            Math.min(...vwap_max_min),
            Math.min(...ask_max_min),
            Math.min(...bid_max_min),
            "MIN",
            various.formatDateOnlyDate(new Date()))
        
        await query.InsertTickerPerDay(
            tickers[0].book,
            Math.max(...volumen_max_min),
            Math.max(...high_max_min),
            Math.max(...last_max_min),
            Math.max(...low_max_min),
            Math.max(...vwap_max_min),
            Math.max(...ask_max_min),
            Math.max(...bid_max_min),
            "MAX",
            various.formatDateOnlyDate(new Date()))

    });
})

//main();