/**
 * Created by lxbin on 2016/6/14  0014.
 */
var db = require('mongoskin').db('localhost:27017/animals');

db.collection('mamals').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});