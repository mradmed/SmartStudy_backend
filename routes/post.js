const verify= require("./verifyToken");
const Post = require('../model/Post');
const path =require("path");

const multer= require("multer");
const crypto = require('crypto');

module.exports = (app,jwt_decode) => {

    // IMAGE Upload test
    
    storage = multer.diskStorage({
        destination: './upload/images',
        filename: function(req, file, cb) {
          return crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) {
              return cb(err);
            }
            return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
          });
        }
      });

      const upload = multer({
        storage: storage
      })
    
      app.post(
        "/upload",
        upload.single('upload'), function(req, res) {
          
          return res.status(200).send(req.file.filename);
        });




    // Get all forms
    app.get('/posts', async (req, res) => {
        let posts = await Form.find();
        res.send({
          posts
        });
      });
      
      app.post('/post/add',verify, async (req, res, next) => {
        var token = req.header('auth-token');
        var decoded = jwt_decode(token);
 
        console.log(decoded);
        const post = new Post(req.body);
        await post.save();
        console.log("done");
        res.status(200).send(' POST Added');
      });
      
      app.get('/post/:id',verify, async (req, res, next) => {
        let { id } = req.params;
        const post = await Post.findById(id);
        
        res.send({
          post
        });
      });
      
      
      
      app.post('/post/edit/:id',verify, async (req, res, next) => {
        const { id } = req.params;
        await Post.updateOne({_id: id}, req.body);
        res.status(200).send('Post Updated');
      });
      
      app.get('/post/delete/:id',verify, async (req, res, next) => {
        let { id } = req.params;
        await Post.remove({_id: id});
        res.status(200).send('Post Removed');
      });

}