import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';
import { config } from 'dotenv';
import { text, headers } from './constants.js';
config();

const devAPIURL = process.env.DEV_API_URL;
const rl = readline.createInterface({
 	input: process.stdin,
 	output: process.stdout
});

console.log(chalk.cyan(text.ASTERISK_NOTE));
console.log(chalk.cyan(text.USER_DELETE_NOTE));
console.log(chalk.yellow(text.WARNING_NOTE));
console.log(chalk.cyan(text.ASTERISK_NOTE));

rl.question('> Enter email registered using this program: ', email => {
 	axios.post(
 	    devAPIURL,
 	    {
			params: {
				apiname: 'source_login_post',
				user_name: email,
				password: 'abcABC123',
			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
 	    		let accessToken =  res.data.body.response.AccessToken;
			    console.log(chalk.bgGreen.bold(text.LOGIN_POST_PASSED));
			    sourceUserDelete(accessToken);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.LOGIN_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.LOGIN_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
});

const sourceUserDelete = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_delete',
  				AccessToken: accessToken,
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.USER_DELETE_PASSED));
			    console.log(chalk.magenta(text.USER_DELETE_COMPLETE_NOTE));
			    process.exit();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_DELETE_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_DELETE_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}