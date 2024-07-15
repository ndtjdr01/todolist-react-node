
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://ndtjdrcoder:Ndt161204@ndt.la9q8wo.mongodb.net/?retryWrites=true&w=majority&appName=ndt')
.then(()=>console.log('success'))
.catch(e=>console.log(e))


