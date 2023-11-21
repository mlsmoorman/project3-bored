const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

// importing the S3 constructor - for use of AWS due to using photos
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

//require unique id function
const { v4: uuidv4 } = require('uuid');

async function signup(req, res) {
  const user = new User(req.body);

  // check to make sure the user submitted a photo:
  if(!req.file) return res.status(400).json({error: 'Please submit a Photo!'});

  // creating location where photos will be stored:
  const filePath = `borednomore/${uuidv4()}-${req.file.originalname}`

  // create params object the s3 object sends to the AWS bucket
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer}

  s3.upload(params, async function(err, data){
    if(err){
      console.log('=========================')
      console.log(err, ' <-- error from aws, probably wrong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?')
      console.log('==========================')
    } 
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  })
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
