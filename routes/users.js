var express = require('express');
var router = express.Router();
const movieuser = require('../models/movieuser.js');

router.post('/add', async (req, res) => {

    const data = {
        "movieID": req.body.movieID,
        "userID": req.body.userID,
    };
  const new_movie = new movieuser(data);

  try {
    await new_movie.save();
const user = await movieuser.find({});

  try {
    res.send('Movie Nominated');
  } catch (err) {
    res.status(500).send(err);
  }
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/list', async (req, res) => {
    var user = req.query.email;
    let data = await movieuser.find(
     {'userID': user}
     );
     res.send(data);
})

router.get('/find', async (req, res) => {
    var user = req.query.email;
    var movie = req.query.id;
    let data = await movieuser.find(
     {'userID': user , 'movieID': movie}
     );
     if(data.length>0)
     res.send(true);
     else
     res.send(false);
})



router.get('/remove', (req, res) => {
		var rem = req.query.idm;
		var rem2 = req.query.idu;
		movieuser.findOneAndDelete({'movieID':rem , 'userID': rem2},
  function(err,data){if(!err)
	      res.status(200);
    res.send(data);});
});



module.exports = router;