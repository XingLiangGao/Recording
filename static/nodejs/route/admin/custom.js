const express = require('express');
const mysql = require('mysql');
const pathLib = require('path');
const fs = require('fs');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'blog'
});

module.exports = function() {
  var router = express.Router();

  router.get('/', (req, res) => {
    switch (req.query.act) {
      case 'mod':
        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send('databse error').end();
          } else {
            if (data.length==0) {
              res.status(404).send('no found').end();
            } else {
              db.query(`SELECT * FROM custom_evaluation_table`, (err, evaluations) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('database error').end();
                } else {
                  res.render('admin/custom.ejs', {evaluations, mod_data: data[0]});
                }
              })
            }
          }
        })
        break;
      case 'del':
        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send('database error').end();
          } else {
            if (data.length==0) {
              res.status(404).send('no found custom').end();
            } else {
              fs.unlink('static/upload/'+data[0].src, (err) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('file opration error').end();
                } else {
                  db.query(`DELETE FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                      console.log(err);
                      res.status(500).send('database error').end();
                    } else {
                      res.redirect('/admin/custom');
                    }
                  })
                }
              })
            }
          }
        })
        break;
      default:
        db.query(`SELECT * FROM custom_evaluation_table`, (err, evaluations) => {
          if (err) {
            console.log(err);
            res.status(500).send('database err').end();
          } else {
            res.render('admin/custom.ejs', {evaluations})
          }
        })
        break;
    }
  })
  router.post('/', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    if (req.files[0]) {
      var ext = pathLib.parse(req.files[0].originalname).ext;
      var oldPath = req.files[0].path;
      var newPath = req.files[0].path+ext;
      var newFileName = req.files[0].filename+ext;
    } else {
      var newFileName = null;
    }

    if (newFileName) {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('file opration error').end();
        } else {
          if (req.body.mod_id) {  //修改
            //先删除老数据
            db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.body.mod_id}`, (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).send('database error').end();
              } else if (data.length==0) {
                res.status(404).send('old file not found').end();
              } else {
                fs.unlink('static/upload/'+data[0].src, (err) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send('file opration error').end();
                  } else {
                    var modSql = 'UPDATE custom_evaluation_table SET title = ?,description = ?,src = ? WHERE ID = ?';
                    var modSqlParams = [title, description, newFileName, req.body.mod_id];
                    db.query(modSql, modSqlParams, (err, data) => {
                      if (err) {
                        console.log(err);
                        res.status(500).send('database error').end();
                      } else {
                        res.redirect('/admin/custom');
                      }
                    })
                  }
                })
              }
            })
          } else {  //添加
            var  addSql = 'INSERT INTO custom_evaluation_table(ID,title,description,src) VALUES(0,?,?,?)';
            var  addSqlParams = [title, description, newFileName];
            db.query(addSql, addSqlParams, (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).send('database err').end();
              } else {
                res.redirect('/admin/custom');
              }
            })
          }
        }
      })
    } else {
      if (req.body.mod_id) {  //修改
        //直接改
        var modSql = 'UPDATE custom_evaluation_table SET title = ?,description = ? WHERE ID = ?';
        var modSqlParams = [title, description, req.body.mod_id];
        db.query(modSql, modSqlParams, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send('database error').end();
          } else {
            res.redirect('/admin/custom');
          }
        })
      } else {
        var  addSql = 'INSERT INTO custom_evaluation_table(ID,title,description,src) VALUES(0,?,?,?)';
        var  addSqlParams = [title, description, newFileName];
        db.query(addSql, addSqlParams, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send('database err').end();
          } else {
            res.redirect('/admin/custom');
          }
        })
      }
    }
  })
  return router;
}