var SERVER_NAME = 'patient-api'
var PORT = (process.env.PORT || 5000);
var HOST = '127.0.0.1';

var counterGetRequest = 0;
var errors = require('restify-errors');
var restify = require('restify')

  
  , usersSave = require('save')('patients')

  
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('information of the patients:')
  console.log(' ####  /patinets #####')
  console.log(' /patients/:id')  
})

server
  
  .use(restify.plugins.fullResponse())

  
  .use(restify.plugins.bodyParser())


server.get('/patients', function (req, res, next) {

  
  usersSave.find({}, function (error, users) {

    
    res.send(users)
  })
})

// Get a single user by their user id
server.get('/patients/:id', function (req, res, next) {
  console.log('GET request: /patients req.params=>' + JSON.stringify(req.params));
  console.log('GET request: /patients req.body=>' + JSON.stringify(req.body));
  
  usersSave.findOne({ _id: req.params.id }, function (error, user) {

    
    if (error) return next(new Error(JSON.stringify(error.errors)))

    if (user) {
     
      res.send(user)
    } else {
    
      res.send(404)
    }
  })
})

// Create a new user
server.post('/patients', function (req, res, next) {
  console.log('POST request: /patients req.params=>' + JSON.stringify(req.params));
  console.log('POST request: /patients req.body=>' + JSON.stringify(req.body));
  
  if (req.body.first_name == undefined) {
    return next(new errors.BadRequestError('first_name must be supplied'))
}

if (req.body.last_name == undefined) {
    return next(new errors.BadRequestError('last_name must be supplied'))
}

if (req.body.address == undefined) {
    return next(new errors.BadRequestError('address must be supplied'))
}

    if (req.body.date_of_birth == undefined) {
        return next(new errors.BadRequestError('date_of_birth must be supplied'))
    }

    if (req.body.department == undefined) {
        return next(new errors.BadRequestError('department must be supplied'))
    }

    if (req.body.doctor == undefined) {
        return next(new errors.BadRequestError('doctor must be supplied'))

}
  var newPatient = {

    first_name:  req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    department: req.body.department,
    doctor: req.body.doctor

	}

 
  usersSave.create( newPatient, function (error, patient) {

    
    if (error) return next(new Error(JSON.stringify(error.errors)))

  
    res.send(201, patient)
  })
})




// Update a user by their id
server.put('/patients/:id', function (req, res, next) {
  console.log('PUT request: /patients req.params=>' + JSON.stringify(req.params));
  console.log('PUT request: /patients req.body=>' + JSON.stringify(req.body));
 
  if (req.body.name === undefined ) {
   
    return next(new errors.BadRequestError('name must be supplied'))
  }
  if (req.body.age === undefined ) {
    
    return next(new errors.BadRequestError('age must be supplied'))
  }
  
  var newPatient = {
		_id: req.params.id,
        first_name:  req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        date_of_birth: req.body.date_of_birth,
        department: req.body.department,
        doctor: req.body.doctor
    
	}
  
 
  usersSave.update(newPatient, function (error, patient) {

    
    if (error) return next(new Error(JSON.stringify(error.errors)))

    
    res.send(200, patient)
  })
})


server.get('/patients/:id/records', function (req, res, next) {
    patientRecordSave.find({ patient_id: req.params - id }, function (error, patientRecord) {
        res.send(patientRecord);
    })
})



server.post('/patients/:id/records', function (req, res, next){

if (req.params.bloodgroup == undefined) {
    return next(new errors.BadRequestError('blood group must be supplied'))
}

if (req.params.date_of_birth == undefined) {
    return next(new errors.BadRequestError('date_of_birth must be supplied'))
}

if (req.params.heartrate == undefined) {
    return next(new errors.BadRequestError('heartrate must be supplied'))
}

if (req.params.bloodpressure == undefined) {
    return next(new errors.BadRequestError('bloodpressure must be supplied'))
}

if (req.params.nurse == undefined) {
    return next(new errors.BadRequestError('nurse must be supplied'))
}


// input of patients record
var newPatientRecord = {
    Patient_id: req.body.id,
    bloodgroup: req.body.bloodgroup,
    date_of_birth: req.body.date_of_birth,
    heartrate: req.body.heartrate,
    bloodpressure: req.body.bloodpressure,
    nurse: req.body.nurse
}
patientRecordSave.create( newPatientRecord,function(error, patientRecord) {

    if  (error) return next(new errors.BadRequestError(JSON.stringify(error.errors)))

 res.send(201,newPatientRecord)   
})
})

// Delete user with the given id
server.del('/patients/:id', function (req, res, next) {

  
  usersSave.delete(req.params.id, function (error, patient) {

    
    if (error) return next(new Error(JSON.stringify(error.errors)))

    
    res.send(patient)
  })
})


