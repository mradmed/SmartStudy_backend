const verify= require("./verifyToken");
const Form = require('../model/Form');

module.exports = (app,jwt_decode) => {

  

    // GEt all forms
    app.get('/forms', async (req, res) => {
        const forms = await Form.find();
        res.send({
          forms
        });
      });
      
      app.post('/form/add',verify, async (req, res, next) => {
        var token = req.header('auth-token');
        var decoded = jwt_decode(token);
 
        console.log(decoded);
        const form = new Form(req.body);
        await form.save();
        console.log("done");
        res.status(200).send('Added');
      });
      
      app.get('/form/:id', async (req, res, next) => {
        let { id } = req.params;
        const form = await Form.findById(id);
        
        res.send({
          form
        });
      });
      
      
      
      app.post('/form/edit/:id', async (req, res, next) => {
        const { id } = req.params;
        await Form.updateOne({_id: id}, req.body);
        res.status(200).send('Updated');
      });
      
      app.get('/form/delete/:id', async (req, res, next) => {
        let { id } = req.params;
        await Form.remove({_id: id});
        res.status(200).send('Removed');
      });

}