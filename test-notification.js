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
console.log(chalk.cyan(text.NOTIFICATION_PRETEST_NOTE_1));
console.log(chalk.cyan(text.NOTIFICATION_PRETEST_NOTE_2));
console.log(chalk.cyan(text.NOTIFICATION_PRETEST_NOTE_3));
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
			    sourceUserNotifPost(accessToken);
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

const sourceUserNotifPost = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_notification_post',
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
			    console.log(chalk.bgGreen.bold(text.USER_NOTIF_POST_PASSED));
			    sourceUserNotifPut(accessToken);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_NOTIF_POST_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_NOTIF_POST_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceUserNotifPut = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_notification_put',
  				AccessToken: accessToken,
  				mid_mail: '1,2,3',
  				mid_browser: '1',
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    console.log(chalk.bgGreen.bold(text.USER_NOTIF_PUT_PASSED));
			    sourceUserNotifGet(accessToken);
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_NOTIF_PUT_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_NOTIF_PUT_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}

const sourceUserNotifGet = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_notification_get',
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
			    console.log(chalk.bgGreen.bold(text.USER_NOTIF_GET_PASSED));
			    console.log(chalk.magenta(text.NOTIFICATION_COMPLETE_NOTE));
			    process.exit();
			})()
 	    	: (() => {
 	    		console.log(chalk.bgRed.bold(text.USER_NOTIF_GET_FAILED));
			    console.log(res.data);
			    process.exit(1);
			})();
 	})
 	.catch(err => {
 		console.log(chalk.bgRed.bold(text.USER_NOTIF_GET_FAILED));
 	    console.error(err);
 	    process.exit(1);
 	});
}
