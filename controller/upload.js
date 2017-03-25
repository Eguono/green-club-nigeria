const formidable = require('formidable');
const fs = require('fs');

module.exports.uploadFile = (req, res)=>{
      // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = process.cwd() + '/uploads';

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, form.uploadDir + "/" + file.name);
  },(err)=>{
     console.log('An error has occured: \n' + err);
  });

//   // log any errors that occur
//   form.on('error', function(err) {
   
//   });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
}