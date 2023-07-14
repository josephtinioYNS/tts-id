import axios from 'axios';
import { config } from 'dotenv';
import readline from 'readline';
import chalk from 'chalk';
// import MockAdapter from 'axios-mock-adapter';

// const mock = new MockAdapter(axios);

config();

const devAPIURL = process.env.DEV_API_URL;
const twitterApiUrl = process.env.TWITTER_API_URL;
const twitterAccessToken = process.env.TWITTER_API_URL;

// console.log(chalk.red.bold('red'));
// console.log(chalk.red('red'));


// function sendConfirmPutRequest(ccode) {
//   axios.post(
//     devAPIURL,
//     {
//       params: {
//         apiname: 'source_cognito_confirm_put',
//         user_name: 'abcde@mail.com',
//         confirmation_code: ccode,
//       }
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   )
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

// // master_code_get
// axios.post(
// 	devAPIURL, 
// 	{params: {
// 		apiname: 'master_code_get'
// 	}}, 
// 	{headers: {
// 		'Content-Type': 'application/json'
// 	}}
// )
// 	.then(response => {
//     	console.log(response.data);
//   	})
//   	.catch(error => {
//     	console.error(error);
//   	});

// // source_cognito_post
// axios.post(
// 	devAPIURL, 
// 	{params: {
// 		apiname: 'source_cognito_post',
// 		user_name: 'jcetinio@gmail.com',
// 		password: 'abcABC123!@#',

// 	}}, 
// 	{headers: {
// 		'Content-Type': 'application/json'
// 	}}
// )
// 	.then(response => {
// 		let ccode = response.data.body.response.ccode;
//     	console.log(response.data);
//     	console.log(ccode);
//     	console.log(typeof(ccode));
//   	})
//   	.catch(error => {
//     	console.error(error);
//   	});

// // source_cognito_confirm_put
// axios.post(
// 	devAPIURL, 
// 	{params: {
// 		apiname: 'source_cognito_confirm_put',
// 		user_name: 'jcetinio@gmail.com',
// 		confirmation_code: '306499',

// 	}}, 
// 	{headers: {
// 		'Content-Type': 'application/json'
// 	}}
// )
// 	.then(response => {
//     	console.log(response.data);
//   	})
//   	.catch(error => {
//     	console.error(error);
//   	});

// // source_login_post
// axios.post(
// 	devAPIURL, 
// 	{params: {
// 		apiname: ' source_login_post',
// 		user_name: 'jcetinio@gmail.com',
// 		password: 'abcABC123!@#',

// 	}}, 
// 	{headers: {
// 		'Content-Type': 'application/json'
// 	}}
// )
// 	.then(response => {
//     	console.log(response.data);
//   	})
//   	.catch(error => {
//     	console.error(error);
//   	});

// // Create a readline interface
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Prompt the user for the parameter value
// rl.question('Enter the parameter value: ', userInput => {
//   // Close the readline interface
//   rl.close();

//  console.log(userInput)
//  console.log(typeof userInput)

// });

// // login
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(response => {
// 	let accessToken =  response.data.body.response.AccessToken;
//   	axios.post(
//   		devAPIURL, 
//   		{
//   			params: {
//   				apiname: ' source_cognito_get',
//   				AccessToken: accessToken,
//   			}
//   		}, 
//   		{
//   			headers: {
//   				'Content-Type': 'application/json'
//   			}
//   		}
//   	)
//   		.then(res => {
// 	      console.log(res.data);
// 	    })
// 	    .catch(err => {
// 	      console.error(err);
// 	    });
// 	})
// 	.catch(error => {
//   	console.error(error);
// 	});

// // source_cognito_put
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(response => {
// 	let accessToken =  response.data.body.response.AccessToken;
//   	axios.post(
//   		devAPIURL, 
//   		{
//   			params: {
//   				apiname: ' source_cognito_put',
//   				AccessToken: accessToken,
//   				type: 'email',
//   			}
//   		}, 
//   		{
//   			headers: {
//   				'Content-Type': 'application/json'
//   			}
//   		}
//   	)
//   		.then(res => {
// 	      console.log(res.data);
// 	    })
// 	    .catch(err => {
// 	      console.error(err);
// 	    });
// 	})
// 	.catch(error => {
//   	console.error(error);
// 	});


// //  source_cognito_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_cognito_get',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_cognito_token_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let refreshToken =  res.data.body.response.RefreshToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_cognito_token_get',
// 	  				RefreshToken: refreshToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// //  source_user_put
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_user_put',
// 	  				AccessToken: accessToken,
// 	  				nickname: 'jcetinio',
// 	  				icon: '',
// 	  				gender: 0,
// 	  				birthday: '19800303',
// 	  				uid: 275
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_user_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_user_get',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// //  source_user_delete
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: ' source_user_delete',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data.body.response);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_user_post
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: ' source_user_post',
// 			ccode: 'eb83ce21-c12c-4fe1-aa06-77ff7a84d536',
// 			nickname: 'jcetinio',
// 			gender: 0,
// 			birthday: '19800101',
// 			mid: [1, 43, 112],
// 			email: 'jcetinio@gmail.com'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res.data);
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_user_notification_post
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_user_notification_post',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_user_notification_put
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_user_notification_put',
// 	  				AccessToken: accessToken,
// 	  				mid_mail: '1,2,3',
// 	  				mid_browser: '1',
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_user_notification_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_user_notification_get',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data.body.response);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_cognito_verify_user_attribute_put
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'josephchristiantinio.yns@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_cognito_verify_user_attribute_put',
// 	  				AccessToken: accessToken,
// 	  				confirmation_code: '637757',
// 	  				type: 'email'
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_cognito_resend_confirmation_code_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'josephchristiantinio.yns@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_cognito_resend_confirmation_code_get',
// 	  				AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_cognito_forgot_password_post
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_cognito_forgot_password_post',
// 			user_name: 'jcetinio@gmail.com',
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res.data);
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // source_cognito_confirm_forgot_password_put
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_cognito_confirm_forgot_password_put',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',
// 			confirmation_code: '707729'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res.data);
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // twitter_verification_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'twitter_verification_get',
// 			callbackURL: 'https://develop.d3rkml4cd1bavz.amplifyapp.com/newRegistration'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res.data);
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // twitter_access_token_get
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'twitter_verification_get',
// 			callbackURL: 'https://develop.d3rkml4cd1bavz.amplifyapp.com/newRegistration'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let oauthToken =  res.data.body.response.request_token.oauth_token;
// 		let oauthVerifier =  res.data.body.response.request_token.oauth_token_secret;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'twitter_access_token_get',
// 	  				oauth_token: oauthToken,
// 	  				oauth_verifier: oauthVerifier
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});

// // twitter_access_token_get
//  axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'twitter_access_token_get',
// 			oauth_token: 'EhCskgAAAAABOjOEAAABiU5pXY0',
// 			oauth_verifier: '2KglCfjehlsBnzboxSrXQEp14FfL12E8'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 	    console.log(res.data.body);
// 	})
// 	.catch(err => {
//     	console.error(err);
//     });

// // source_sns_ccode_get
//  axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'twitter_access_token_get',
// 			oauth_token: 'IEc0CQAAAAABOjOEAAABiU6KXg4',
// 			oauth_verifier: '0It2lQhS5TogcqtDwhTFhkrcdZs2ek6l'
// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 	    axios.post(
// 	    	devAPIURL, 
// 	    	{
// 	    		params: {
// 	    			apiname: 'source_sns_ccode_get',
// 	    			snsType: 'twitter_token',
// 	    			snsId: res.data.body.response.access_token.user_id
// 	    		}
// 	    	}, 
// 	    	{
// 	    		headers: {
// 	    			'Content-Type': 'application/json'
// 	    		}
// 	    	}
// 	    )
// 	    	.then(res => {
// 	    	    console.log(res.data);
// 	    	})
// 	    	.catch(err => {
// 	        	console.error(err);
// 	        });
// 	})
// 	.catch(err => {
//     	console.error(err);
//     });

// source_sns_ccode_get
 axios.post(
	devAPIURL, 
	{
		params: {
			apiname: 'source_sns_ccode_get',
			snsType: 'twitter_token',
	    	snsId: '1679363019619590145'
		}
	}, 
	{
		headers: {
			'Content-Type': 'application/json'
		}
	}
)
	.then(res => {
	    console.log(res.data);
	})
	.catch(err => {
    	console.error(err);
    });

// // source_cognito_mfa_post
// axios.post(
// 	devAPIURL, 
// 	{
// 		params: {
// 			apiname: 'source_login_post',
// 			user_name: 'jcetinio@gmail.com',
// 			password: 'abcABC123!@#',

// 		}
// 	}, 
// 	{
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}
// )
// 	.then(res => {
// 		let accessToken =  res.data.body.response.AccessToken;
// 	  	axios.post(
// 	  		devAPIURL, 
// 	  		{
// 	  			params: {
// 	  				apiname: 'source_cognito_mfa_post',
// 	  				type: 'mfa_off',
//             		AccessToken: accessToken,
// 	  			}
// 	  		}, 
// 	  		{
// 	  			headers: {
// 	  				'Content-Type': 'application/json'
// 	  			}
// 	  		}
// 	  	)
// 	  		.then(res => {
// 		      console.log(res.data);
// 		    })
// 		    .catch(err => {
// 		      console.error(err);
// 		    });
// 	})
// 	.catch(err => {
//   		console.error(err);
// 	});



// axios.get(
// 	twitterApiUrl,
// 	{
// 		params: {
// 			callbackURL: 'https://develop.d3rkml4cd1bavz.amplifyapp.com/newRegistration'
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

// axios.get(
// 	twitterAccessToken,
// 	{
// 		params: {
// 			oauth_token: 'aaa',
// 			oauth_verifier: 'bbb',
// 		}
// 	}
// )
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});







