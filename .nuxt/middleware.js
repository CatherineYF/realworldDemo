const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['notAuthenticate'] = require('../middleware/notAuthenticate.js')
middleware['notAuthenticate'] = middleware['notAuthenticate'].default || middleware['notAuthenticate']

export default middleware
