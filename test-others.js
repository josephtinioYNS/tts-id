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
console.log(chalk.cyan(text.OTHERS_PRETEST_NOTE));
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
			    verifyUserGet(accessToken, email);
			})()
 	    	: (() => {
 	    		failed(text.LOGIN_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
 		failed(text.LOGIN_POST_FAILED, err);
 	});
});

const verifyUserGet = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_verify_user_attribute_get',
  				AccessToken: accessToken,
  				type: 'email'
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.status === 200
	    	? (() => {
			    passed(text.COGNITO_VERIFY_USER_GET_PASSED);
			    cognitoUpdateDateGet(accessToken, email);
			})()
	    	: (() => {
			    failed(text.COGNITO_VERIFY_USER_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.COGNITO_VERIFY_USER_GET_FAILED, err);
 	});
}

const cognitoUpdateDateGet = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_cognito_update_date_get',
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
			    passed(text.COGNITO_UPDATE_DATE_GET_PASSED)
			    loginHistoryPost(accessToken, email);
			})()
	    	: (() => {
			    failed(text.COGNITO_UPDATE_DATE_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.COGNITO_UPDATE_DATE_GET_FAILED, err);
 	});
}

const loginHistoryPost = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_login_history_post',
  				AccessToken: accessToken,
  				devices: 'PC',
  				latlng: '42.9999,142.99999',
  				mid: 1,
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.status === 200
	    	? (() => {
			    passed(text.LOGIN_HISTORY_POST_PASSED);
			    loginHistoryGet(accessToken, email);
			})()
	    	: (() => {
			    failed(text.LOGIN_HISTORY_POST_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.LOGIN_HISTORY_POST_FAILED, err);
 	});
}

const loginHistoryGet = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_login_history_get',
  				AccessToken: accessToken,
  				past_date: 1
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.status === 200
	    	? (() => {
			    passed(text.LOGIN_HISTORY_GET_PASSED);
			    loginHistoryCheck(accessToken, email);
			})()
	    	: (() => {
			    failed(text.LOGIN_HISTORY_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.LOGIN_HISTORY_GET_FAILED, err);
 	});
}

const loginHistoryCheck = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_user_login_history_check',
  				AccessToken: accessToken,
  				type: 'latlng',
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.status === 200
	    	? (() => {
			    passed(text.LOGIN_HISTORY_CHECK_PASSED);
			    rssArticleGet(accessToken, email);
			})()
	    	: (() => {
	    		failed(text.LOGIN_HISTORY_CHECK_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.LOGIN_HISTORY_CHECK_FAILED, err);
 	});
}

const rssArticleGet = (accessToken, email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_rss_article_get',
  				AccessToken: accessToken,
  				type: 'new_article',
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.status === 200
	    	? (() => {
			    passed(text.RSS_ARTICLE_GET_PASSED);
			    sourceMailInquiry(email);
			})()
	    	: (() => {
	    		failed(text.RSS_ARTICLE_GET_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.RSS_ARTICLE_GET_FAILED, err);
 	});
}

const sourceMailInquiry = (email) => {
 	axios.post(
 	    devAPIURL,
 	    {
 	        params: {
  				apiname: 'source_mail_inquiry',
  				name: 'family_name',
  				email: email,
  				category: 'random',
  				inquiry: 'random',
  			}
 	    },
 	    {
 	        headers: headers
 	    }
 	)
 	.then(res => {
 		res.data.body.statusCode === 200
	    	? (() => {
			    passed(text.MAIL_INQUIRY_PASSED, text.OTHERS_COMPLETE_NOTE);
			    process.exit();
			})()
	    	: (() => {
	    		failed(text.MAIL_INQUIRY_FAILED, res.data);
			})();
 	})
 	.catch(err => {
	    failed(text.MAIL_INQUIRY_FAILED, err);
 	});
}