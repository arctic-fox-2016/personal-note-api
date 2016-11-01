const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = {
  token:verifyToken
}

function verifyToken(req, res, next){
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
        const userModel = require('../models/users')
        userModel.findOne({
          username:req.decoded.username
        },(err, record) => {
          if(err) throw err
          if(!_.isEmpty(record)){
            req.decoded.id = record._id
            next()
          } else {
            res.status(400).json({error:"Username already exists"})
          }
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
