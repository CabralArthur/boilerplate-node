import chalk from 'chalk';

export function error() {
	console.info(chalk.red(...arguments));
}

export function success() {
	console.info(chalk.green(...arguments));
}

export function message() {
	console.info(chalk.blue(...arguments));
}
