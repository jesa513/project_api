const conn = require('../database');
var fs = require('fs');
var { uploader } = require('../helpers/uploader');



module.exports = {

    listproduct: (req,res) => {
    var sql = 'SELECT * from product;';
    conn.query(sql, (err, results) => {
        if(err) throw err;
        // console.log(results);
        
        res.send(results);
    })   
},

   addproduct: (req,res) => {
    try {
        const path = '/product/images'; //file save path
        const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
            }

            const { image } = req.files;
            console.log(image)
            const imagePath = image ? path + '/' + image[0].filename : null;
            console.log(imagePath)

            console.log(req.body.data)
            const data = JSON.parse(req.body.data);
            console.log(data)
            data.image = imagePath;
            
            var sql = 'INSERT INTO product SET ?';
            conn.query(sql, data, (err, results) => {
                if(err) {
                    console.log(err.message)
                    fs.unlinkSync('./public' + imagePath);
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                }
               
                console.log(results);
                sql = 'SELECT * from product;';
                conn.query(sql, (err, results) => {
                    if(err) {
                        console.log(err.message);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                    console.log(results);
                    
                    res.send(results);
                })   
            })    
        })
    } catch(err) {
        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
    }
},


editproduct:(req,res) => {
    var productId = req.params.id;
    var sql = `SELECT * from product where id = ${productId};`;
    conn.query(sql, (err, results) => {
        if(err)
         console.log(`error pertama ${err}`)

        if(results.length > 0) {
            console.log('ada data')
            const path = '/product/images'; //file save path
            const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

            upload(req, res, (err) => {
                if(err){
                    console.log(`error kedua ${err1}`)
                    return res.status(500).json({ message: 'Upload product picture failed !', error: err.message });
                }

                const { image } = req.files;
                // console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                try {
                    if(imagePath) {
                        sql = `Update product set ? where id = ${productId};`
                        conn.query(sql,data, (err3,results1) => {
                            if(err1) {
                                console.log(`error ketiga ${err3}`)
                                fs.unlinkSync('./public' + imagePath);
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                            }
                            fs.unlinkSync('./public' + results[0].image);
                            sql = `Select * from product;`;
                            conn.query(sql, (err2,results2) => {
                                if(err2) {
                                    console.log(`error keempat ${err2}`)
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }

                                res.send(results2);
                            })
                        })
                    }
                    else {
                        //sql = `Update product set productname='${data.productname}' where id = ${productId};`
                        sql = `Update product set productname = '${data.productname}', price = ${data.price}, category = '${data.category}', deskripsi = '${data.deskripsi}' where id = ${productId};`
                        conn.query(sql, (err1,results1) => {
                            if(err1) {
                                console.log(`error kelima ${err1}`)
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                            }
                            sql = `Select * from product;`;
                            conn.query(sql, (err2,results2) => {
                                if(err2) {
                                    console.log(`error keenam ${err2}`)
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }

                                res.send(results2);
                            })
                        })
                    }
                }
                catch(err){
                    console.log(`error ketujuh`)
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                }
            })
        }
    })
},

deleteproduct:(req,res) => {
    var productId = req.params.id;
    var sql = `SELECT * from product where id = ${productId};`;
    conn.query(sql, (err, results) => {
        if(err) {
            console.log(err)
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
        
        if(results.length > 0) {
            console.log(`${productId}`)
            sql = `DELETE from product where id = ${productId};`
            conn.query(sql, (err1,results1) => {
                if(err1) {
                    console.log(`error kedua ${err1}`)
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                }

                fs.unlinkSync('./public' + results[0].image);
                sql = `SELECT * from product;`;
                conn.query(sql, (err2,results2) => {
                    if(err2) {
                        console.log(`error ketiga ${err2}`)
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err2.message });
                    }

                    res.send(results2);
                })
            })
        }
    })   

},

productdetail: (req,res) => {
    var productId = req.params.productId;
    var sql = `SELECT * from product where id = ${productId};`;
    conn.query(sql, (err, results) => {
        if(err) throw err;
        // console.log(results);
        
        res.send(results);
    })   
},


equipment: (req,res) => {
    var sql = `SELECT * from product where category='Equipment'`;
    conn.query(sql, (err, results) => {
       if(err) throw err;
       // console.log(results);
       
       res.send(results);
   })   
},

equipmentdetail: (req,res) => {
    var productId = req.params.productId;
    var sql = `SELECT * from product where category='Equipment' and id = ${productId};`;
    conn.query(sql, (err, results) => {
       if(err) 
       console.log(err);
       // console.log(results);
       
       res.send(results);
   })   
}



}