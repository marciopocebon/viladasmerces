var MONGO_PROPERTIES = {
	database : 'merces',
	collections : {
		categories : {
			name 	: 'categories',
			schema : {
				name 		: true,
				description : true
			},
			primaryKey 	: 'name'
		},
		places : {
			name 	: 'places',
			schema : {
				name 			: true,
				address 		: true,
				province 		: true,
				phone_number 	: true,
				image 			: true,
				category 		: true
			},
			primaryKey 	: 'name'
		}
	}
};

exports.MONGO_PROPERTIES = MONGO_PROPERTIES;