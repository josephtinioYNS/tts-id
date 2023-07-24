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
console.log(chalk.cyan(text.LOGIN_PRETEST_NOTE));
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
 	    		let refreshToken =  res.data.body.response.RefreshToken;
			    passed(text.LOGIN_POST_PASSED);
			    sourceUserGet(accessToken, refreshToken);
			})()
 	    	: (() => {
			    failed(text.LOGIN_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 	    failed(text.LOGIN_POST_FAILED, err);
 	});
});

const sourceUserGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_get',
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
			    passed(text.USER_GET_PASSED)
			    sourceCognitoGet(accessToken, refreshToken)
			})()
 	    	: (() => {
			    failed(text.USER_GET_FAILED, res.data)
			})();
 	})
 	.catch(err => {
 	    failed(text.USER_GET_FAILED, err)
 	});
}

const sourceCognitoGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_get',
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
			    passed(text.COGNITO_GET_PASSED);
			    sourceCognitoTokenGet(accessToken, refreshToken);
			})()
 	    	: (() => {
			    failed(text.COGNITO_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 	    failed(text.COGNITO_GET_FAILED, err)
 	});
}

const sourceCognitoTokenGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_token_get',
  				RefreshToken: refreshToken,	
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.COGNITO_TOKEN_GET_PASSED);
			    sourceSnsCcodeGet(accessToken, refreshToken);
			})()
 	    	: (() => {
			    failed(text.COGNITO_TOKEN_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 	    failed(text.COGNITO_TOKEN_GET_FAILED, err);
 	});
}

const sourceSnsCcodeGet = (accessToken, refreshToken) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_sns_ccode_get',
  				snsType: 'gcode',
  				snsId: '123456789'
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 	    res.data.body.status === 200
 	    	? (() => {
			    passed(text.SNS_CCODE_GET_PASSED, text.LOGIN_COMPLETE_NOTE)
			    process.exit();
			})()
 	    	: (() => {
			    failed(text.SNS_CCODE_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 	    failed(text.SNS_CCODE_GET_FAILED, err);
 	});
}
