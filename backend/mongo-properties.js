var MONGO_PROPERTIES = {
	database : 'merces',
	collections : {
		categories : {
			name 	: 'categories',
			schema : {
				name 	: true,
				phone 	: true,
				image 	: true
			},
			primaryKey 	: 'name'
		}
	}
};

exports.MONGO_PROPERTIES = MONGO_PROPERTIES;