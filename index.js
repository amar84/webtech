var SERVER_NAME = 'patient-api'
var PORT = process.env.PORT;


var restify = require('restify')

  
  , patientsSave = require('save')('patients')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Information about the patients:')
  console.log(' ####  /pateints   ####')
  console.log(' /patients/:id')  
})

server
 
  .use(restify.fullResponse())

  
  .use(restify.bodyParser())

// Get all users in the system
server.get('/patients', function (req, res, next) {

 
  patientsSave.find({}, function (error, patients) {

   
    res.send(patients)
  })
})

// Get a single user by their user id
server.get('/patients/:id', function (req, res, next) {

 
  patientsSave.findOne({ _id: req.params.id }, function (error, patient) {

   
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patient) {
      
      res.send(patient)
    } else {
     
      res.send(404)
    }
  })
})

// Create a new user
server.post('/patients', function (req, res, next) {


  if (req.params.first_name === undefined ) {
    
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.last_name === undefined ) {
    
    return next(new restify.InvalidArgumentError('email must be supplied'))
  }

  
  if (req.params.address === undefined ) {
    
    return next(new restify.InvalidArgumentError('street must be supplied'))
  }
  if (req.params.date_of_birth === undefined ) {
    
    return next(new restify.InvalidArgumentError('city must be supplied'))
  }
  
  if (req.params.department === undefined ) {
    
    return next(new restify.InvalidArgumentError('phone must be supplied'))
  }

  var newPatient = {
		
   name : req.params.last_name,
    email: req.params.address,
    street: req.params.date_of_birth,
    city: req.params.department,
    phone: req.params.doctor
	}

  // Create the user using the persistence engine
  patientsSave.create( newPatient, function (error, patient) {

    
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

  
    res.send(201, patient)
  })
})

//server.get('/patients/:id/records', function (req, res, next) {
 // patientRecordSave.find({ patient_id: req.params - id }, function (error, patientRecord) {
   //   res.send(patientRecord);
  //})
//})

server.post('/patients/:id/records', function (req, res, next) {

if (req.params.bloodgroup == undefined) {
    return next(new restify.InvalidArgumentError('blood group must be supplied'))
}

if (req.params.date_of_birth == undefined) {
    return next(new restify.InvalidArgumentError('date_of_birth must be supplied'))
}

if (req.params.heartrate == undefined) {
    return next(new restify.InvalidArgumentError('heartrate must be supplied'))
}

if (req.params.bloodpressure == undefined) {
    return next(new restify.InvalidArgumentError('bloodpressure must be supplied'))
}

if (req.params.nurse == undefined) {
    return next(new restify.InvalidArgumentError('nurse must be supplied'))
}


// input of patients record
var newPatientRecord = {
    Patient_id: req.params.id,
    bloodgroup: req.params.bloodgroup,
    date_of_birth: req.params.date_of_birth,
    heartrate: req.params.heartrate,
    bloodpressure: req.params.bloodpressure,
    nurse: req.params.nurse
}
patientRecordSave.create( newPatientRecord,function(error, patientRecord) {

    if  (error) return next(new errors.BadRequestError(JSON.stringify(error.errors)))

 res.send(201,newPatientRecord)   
})

})
// Update a user by their id
server.put('/patients/:id', function (req, res, next) {

  if (req.params.first_name === undefined ) {
    
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.last_name === undefined ) {
    
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }

  
  if (req.params.address === undefined ) {
    
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.date_of_birth === undefined ) {
    
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }
  
  if (req.params.department === undefined ) {
    
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.doctor === undefined ) {
    
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }
  var newPatient = {
		first_name: req.params.first_name, 
    last_name: req.params.last_name,
    address: req.params.address,
    date_of_birth: req.params.date_of_birth,
    department: req.params.department,
    doctor: req.params.doctor
	}
 
  
  usersSave.update(newPatient, function (error, patient) {

    
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    
    res.send(200)
  })
})

// Delete user with the given id
server.del('/patients/:id', function (req, res, next) {

  
  usersSave.delete(req.params.id, function (error, patient) {

    
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    
    res.send()
  })
})


