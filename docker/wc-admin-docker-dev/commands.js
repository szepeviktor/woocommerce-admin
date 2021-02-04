module.exports = {
	ssh: {
		describe: 'SSH into the container',
		commands: [],
	},
	install: {
		describe: 'Install node, composer, and git',
		commands: [
			'cd ~',
			'curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh',
			'bash nodesource_setup.sh',
			'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - ',
			'echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list',
			'apt-get update -y',
			'apt-get install -y nodejs git',
			"php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\"",
			'php composer-setup.php --version=1.10.16 --install-dir=/usr/local/bin --filename=composer',
		],
	},
	setup: {
		describe: 'Run npm install, composer install, and npm run dev',
		commands: [
			'cd /var/www/html/wp-content/plugins/woocommerce-admin',
			'npm install',
			'composer install',
			'npm run dev',
		],
	},
	'npm-start': {
		describe: 'Run npm start',
		commands: [
			'cd /var/www/html/wp-content/plugins/woocommerce-admin',
			'npm start',
		],
	},
};
