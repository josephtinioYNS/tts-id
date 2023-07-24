import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';
import { config } from 'dotenv';
import { passed, failed } from './common.js';
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
			    passed(text.LOGIN_POST_PASSED);
			    sourceUserNotifPost(accessToken);
			})()
 	    	: (() => {
 	    		failed(text.LOGIN_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.LOGIN_POST_FAILED, err);
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
			    passed(text.USER_NOTIF_POST_PASSED)
			    sourceUserNotifPut(accessToken);
			})()
 	    	: (() => {
 	    		failed(text.USER_NOTIF_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_NOTIF_POST_FAILED, err);
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
			    passed(text.USER_NOTIF_PUT_PASSED);
			    sourceUserNotifGet(accessToken);
			})()
 	    	: (() => {
 	    		failed(text.USER_NOTIF_PUT_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_NOTIF_PUT_FAILED, err);
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
			    passed(text.USER_NOTIF_GET_PASSED, text.NOTIFICATION_COMPLETE_NOTE);
			    process.exit();
			})()
 	    	: (() => {
 	    		failed(text.USER_NOTIF_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_NOTIF_GET_FAILED, err);
 	});
}
