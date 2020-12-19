require('dotenv').config()
const bitso = require("./BitsoAPI");
const chalk = require("chalk");
const BITSO_URL = 'https://api.bitso.com';
const BITSO_API_KEY = process.env.BITSO_API_KEY;
const BITSO_API_SECRET = process.env.BITSO_API_SECRET;
const display = require('./Displays');
var _this = this;

const bitsoAPI = new bitso(
    BITSO_API_KEY,
    BITSO_API_SECRET,
    BITSO_URL,
    "/v3"
);

//Obtiene la cantidad de crypto que tienes
exports.Balances = async function() {
    display.preMessage("BALANCES");
    try {
        let response = await bitsoAPI.getBalances();
        if (display.checkIfSuccessful("BALANCES", response)) 
            return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

//Retiros
//Returns detailed info on a user’s fund withdrawals.

exports.Withdrawals = async function (currency, amount, address) {
    display.preMessage("WITHDRAWALS", currency, amount, address);
    try {
        let response = await bitsoAPI.withdrawCrypto(currency, amount, address);
        if (display.checkIfSuccessful("WITHDRAWALS", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

exports.GetWithdrawals = async function () {
    display.preMessage("WITHDRAWALS");
    try {
        let response = await bitsoAPI.getWithdrawals();
        if (display.checkIfSuccessful("WITHDRAWALS", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

exports.Orders = async function (book, side, amount, type) {
    display.preMessage("ORDERS", book, side, amount, type);
    try {
        let response = await bitsoAPI.placeOrder(book, side, amount, type);
        if (display.checkIfSuccessful("ORDERS", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

/// RETORNA MONEDAS DISPONIBLES
exports.AvailableBooks = async function () {
    display.preMessage("AVAILABLE BOOKS");
    try {
        let response = await bitsoAPI.getAvailableBooks();
        if (display.checkIfSuccessful("AVAILABLE BOOKS", response))return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

exports.GetTicker = async function (book) {
    display.preMessage("TICKER", book);
    try {
        let response = await bitsoAPI.getCurrentTicker(book);
        if (display.checkIfSuccessful("TICKER", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}

exports.GetTrades = async function (book) {
    display.preMessage("GET TRADES", book);
    try {
        let response = await bitsoAPI.getTrades(book);
        if (display.checkIfSuccessful("GET TRADES", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}
exports.GetUserTrades = async function (book) {
    display.preMessage("GET USER TRADES", book);
    try {
        let response = await bitsoAPI.getUserTrades(book);
        if (display.checkIfSuccessful("GET USER TRADES", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}
exports.GetFundings = async function () {
    display.preMessage("GET FUNDINGS");
    try {
        let response = await bitsoAPI.getFundings();
        if (display.checkIfSuccessful("GET FUNDINGS", response)) return response.payload;
    } catch (Exception) {
        display.displayError(Exception);
    }
}


async function basicTesting() {
    console.log(chalk.white("INITIALIZING BASIC TESTING"));
    //const a = await testAvailableBooks();
    //console.log(a)
    const a = await _this.Balances();
    //var a = await testGetTrades("btc_mxn");
    console.log(a)
    //await testOrders("eth_mxn", "buy", "1.0", "market");
    //await testOrders("eth_mxn", "sell", "1.0", "market");
    //await testWithdrawals("btc", "0.001", "15YB8xZ4GhHCHRZXvgmSFAzEiDosbkDyoo");
    //const a = await testBalances();
    //console.log(a)
}

//basicTesting();