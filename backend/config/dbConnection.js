const mongoose = require('mongoose');

  function dbConnection(){
    mongoose.connect('mongodb+srv://rasedev32:Am7693Ru@cluster0.g6njr.mongodb.net/ideal?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));

  }

  module.exports = dbConnection;




// const mongoose = require('mongoose');

// const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association_db', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected Successfully');
//   } catch (error) {
//     console.error('MongoDB Connection Error:', error);
//     process.exit(1);
//   }
// };

// module.exports = dbConnection;





