var MONGO_PROPERTIES = {
	database : 'merces',
	collections : {
		categories : {
			name 	: 'categories',
			schema : {
				name 		: true,
				url 		: true
			},
			primaryKey 	: 'name'
		},
		places : {
			name 	: 'places',
			schema : {
				name 			: true,
				url 			: true,
				address 		: true,
				province 		: true,
				phone_number 	: true,
				image 			: true,
				category 		: true
			},
			primaryKey 	: 'name'
		},
		users : {
			username 	: true,
			email 		: true
		}
	}
};

exports.MONGO_PROPERTIES = MONGO_PROPERTIES;