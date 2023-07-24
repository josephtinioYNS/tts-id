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
console.log(chalk.cyan(text.USER_SERVICE_PRETEST_NOTE_1));
console.log(chalk.cyan(text.USER_SERVICE_PRETEST_NOTE_2));
console.log(chalk.cyan(text.USER_SERVICE_PRETEST_NOTE_3));
console.log(chalk.yellow(text.WARNING_NOTE))
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
			    sourceUserServicePost(accessToken);
			})()
 	    	: (() => {
 	    		failed(text.LOGIN_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.LOGIN_POST_FAILED, res.data);
 	});
});

const sourceUserServicePost = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_service_post',
  				AccessToken: accessToken,
  				mid: 1
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.USER_SERVICE_POST_PASSED);
			    sourceUserServicePut(accessToken);
			})()
 	    	: (() => {
			    failed(text.USER_SERVICE_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_SERVICE_POST_FAILED, err);
 	});
}

const sourceUserServicePut = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_service_put',
  				AccessToken: accessToken,
  				mid: 1,
  				cooperation: true
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.USER_SERVICE_PUT_PASSED);
			    sourceUserServiceGet(accessToken);
			})()
 	    	: (() => {
 	    		failed(text.USER_SERVICE_PUT_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_SERVICE_PUT_FAILED, err);
 	});
}

const sourceUserServiceGet = (accessToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_service_get',
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
			    passed(text.USER_SERVICE_GET_PASSED, text.USER_SERVICE_COMPLETE_NOTE);
			    process.exit();
			})()
 	    	: (() => {
 	    		failed(text.USER_SERVICE_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.USER_SERVICE_GET_FAILED, err);
 	});
}
