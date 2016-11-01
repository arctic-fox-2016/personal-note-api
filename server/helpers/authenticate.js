const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = {
  token:verifyToken
}

function verifyToken(req, res, next){
  return next()
  var token = req.body.token || req.params.token || req.headers['x-access-token']

	if(token){
		jwt.verify(token, req.app.get('secretToken'), function(err, decoded) {
			if (err) {
				return res.status(403).json({
					success: false,
					message: 'Failed to authenticate token.'
				})
			} else {
				req.decoded = decoded
				return res.status(200).json({
					success: true,
					message: 'Success to authenticate token.'
				})
			}
		})
	} else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    })
	}
}
