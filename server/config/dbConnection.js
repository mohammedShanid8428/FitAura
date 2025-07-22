const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then((response) => {
    console.log('Server connnected with MongoDb-Atlas');
}).catch((error) => console.log(error))

