require('dotenv').config()
const pg = require('pg')

let pools = new Map()

const dbConnect = (conf) => {
	const dbConfig = {
		user: (conf.user) ? conf.user : process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT,
		max: 25
	}
	const pool = new pg.Pool(dbConfig)
	pool.on('error', function (err) {
		console.error('IDLE client error', err.message, err.stack)
		process.exit(-1)
	})
	return pool
}

const getPool = (user) => {
	let defaultUser
	if (!user) {
		defaultUser = 'froger'
	} else {
		if (pools.has('froger')) {
			pools.delete('froger')
		}
		defaultUser = user
	}
	if (!pools.has(defaultUser)) {
		pools.set(defaultUser, dbConnect({ "user": defaultUser }))
	} 
	return pools.get(defaultUser)
}

const getAllPools = () => {
	return pools
}

module.exports = {
	getPool,
	getAllPools
}