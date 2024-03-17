import chalk from "chalk";

const LOG_STYLES = Object.freeze({
    SERVER_ON: chalk.italic.magentaBright,
    SERVER_OFF: chalk.rgb(230, 14, 43),
    REQ_RECEIVED: chalk.italic.rgb(35, 222, 167),
    NEW_USER: chalk.rgb(199, 106, 56),
    LOGIN_USER: chalk.rgb(148, 16, 73),
    VALID_TOKEN: chalk.rgb(100, 204, 166)
});

export default LOG_STYLES;