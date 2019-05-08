import mongoose from 'mongoose';
const dbUrl = 'mongodb://lockround:sam9457049664@ds011810.mlab.com:11810/hybridestate',
      dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false
      }
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log('Mongo connection invoked')
export default db