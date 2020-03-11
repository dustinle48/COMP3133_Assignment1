const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const url = "mongodb+srv://admin:2W2UMMStsYSNZfDB@ez-job-8t0ro.mongodb.net/ez-job?retryWrites=true&w=majority";

const dbconnect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = dbconnect;