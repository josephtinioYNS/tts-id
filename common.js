import chalk from 'chalk';

export const passed = (message, note = null) => {
	console.log(chalk.bgGreen.bold(message));
	note ? console.log(chalk.magenta(note)) : null;
}

export const failed = (message, data) => {
	console.log(chalk.bgRed.bold(message));
	console.log(data);
	process.exit(1);
} 