module.exports = {
	plugins: [
		'cypress'
	],
	env: {
		mocha: true,
		'cypress/globals': true
	},
	rules: {
		strict: 'off',
		indent: [2, 'tab'],
		'no-tabs': 0
	}
}
