var db = require('../dbconnection');
var fs = require('fs');
var Employee ={
    getAllEmployee:function(callback){
        return db.query("select * from t_employee",callback);
    },
    deleteEmployee: function(Employee, callback){
        if(Employee.img_employee!=''){
            var path = './public'+Employee.img_employee;
            fs.unlink(path, function(err){
                if(err){
                    console.log(err);
                }
                console.log('Deleted Employee Sucessfully')
            });
        }
        return db.query("delete from t_employee where eno=?", [Employee.epno],callback);
    },
    addEmployee:function(Employee,callback){
        var dt = new Date(); //current date of server
        var text="";//random text
        var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i=0;i<5;i++) text +=possible.charAt(Math.floor(Math.random()*possible.length));
        var base64d=Employee.img_employee.replace(/^data:image\/png;base64,/,"");
        var path ="./public/images/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
        fs.writeFile(path, base64d,'base64',function(err){
            if(err){
                return console.log(err);
            }
            console.log("employee was added");
        });
    }
}