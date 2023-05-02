
const fs = require('fs');
const formidable = require('formidable');



const cors=require('cors');
const directoryPath = './uploads';

var express = require('express');
var app =express();
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('uploads'));
app.post('/upload', (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.image.filepath;
    console.log(oldpath);
    var newpath = __dirname+'/uploads/' + files.image.originalFilename;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });

});

app.get('/images', (req, res) => {
    console.log(directoryPath);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        console.error('Unable to scan directory: ' + err);
        return res.status(500).send('Unable to read directory');
      }

      const images =files;

      const validExtensions = ['.png', '.jpg', '.jpeg'];

      const validImages = images.filter((image) => {
        return validExtensions.some((extension) => image.endsWith(extension));
      });


      const imageUrls = validImages.map(file => {
        return `http://localhost:8080/images/${file}`;
      });


      return res.status(200).json(imageUrls);
    });





});





var server =app.listen(8080,function()
{

  console.log("server is created ");

});
