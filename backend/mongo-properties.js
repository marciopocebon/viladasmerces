var MONGO_PROPERTIES = {
	database : 'merces',
	collections : {
		category : {
			name 	: 'category',
			schema : {
				name 	: true,
				phone 	: true,
				image 	: true
			},
			primaryKey : 'name'
		}
	}
};

exports.MONGO_PROPERTIES = MONGO_PROPERTIES;