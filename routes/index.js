var express = require('express');
var router = express.Router();
var wol = require('node-wol');

/* GET home page. */
router.get('/:mac/:hash', function (req, res, next) {
	debugger;
	let { mac, hash } = req.params;
	try {
		wol.wake(mac, (err) => {
			if(err) {
				next(error);
			}
			if(process.env.wol_passphrase === hash) {
				return res.json({ 'success': true });
			}else {
				let error =  new Error('Incorrect password')
				next(error);
			}
		})
	} catch (e) {
		next(e);
	}

});

module.exports = router;
