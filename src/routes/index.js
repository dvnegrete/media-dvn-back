const { Router } = require('express');

const router = Router();

router.use('/api/users', require('./user.route'));
router.use('/api/categories', require('./category.route'));
router.use('/api/themes', require('./theme.route'));
router.use('/api/content', require('./content.route'));
router.use('/api-doc', require('./api-doc'));

module.exports = router;