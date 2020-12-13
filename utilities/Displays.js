const chalk = require("chalk");



exports.preMessage = function(test, ...rest) {
    console.log(chalk.blue(`${test} ENDPOINT`));
    console.log(chalk.blue(`USING PARAMETERS: ${rest}`));
}


exports.displayError = function(Exception) {
    console.log(chalk.red("[FAILED]"));
    if (Exception.response !== undefined) {
        console.log(
            chalk.red(
                `${Exception.response.status} : ${
                    Exception.response.statusText
                } ${JSON.stringify(Exception.response.data)}`
            )
        );
    } else {
        console.log(Exception);
    }
}


exports.checkIfSuccessful = function(test, data) {
    if (data !== undefined && data.success) {
        console.log(chalk.green(`${test} TEST ✓`));
    } else {
        console.log(chalk.red(`${test} TEST X`));
        console.log(chalk.red(JSON.stringify(data)));
    }
    return data;
}