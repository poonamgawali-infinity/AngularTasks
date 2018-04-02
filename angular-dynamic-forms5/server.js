var express=require('express');
var cors = require('cors')
var mc = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require("fs")
var multer  = require('multer');
var upload = multer({ dest: '.uploads/' });
app=express();
app.use(cors());
var result1=[];
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/src'))

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});


app.post('/sortData',function(req,res){
	//console.log("sortData :",req.body)
	var data=req.body.data;
	//var mysort = { req.body.colName: req.body.direction };
	//var result=data.sort(req.body.colName,req.body.direction);
//	console.log("s",result)
var col=req.body.colName;
var dir=(req.body.direction=='asc')?1:-1;
console.log("direction :",dir," col ",col)
var mysort = {[col]:dir };
var r=data.sort(mysort);
console.log("cxhcb",r);
console.log("sort :",mysort);
	 mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
    	console.log("mongodb connection established");
    	var dbc=conn.db('userDetails');
	var result = dbc.collection("userDetails").find().sort(mysort);//display data
	result.toArray(function(err,data){
		 if (err) throw err;
		//console.log(data);
		res.send(data);
	});
	});
	
});


//filter
app.get('/getData2/:pageIndex/:pagesize/:filterValue',function(req,res){
	console.log("get data2",req.params.pageIndex,req.params.pagesize,req.params.filterValue);
	var str2=req.params.filterValue;
	
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
    	console.log("mongodb connection established");
    	var result2=[];
	var dbc=conn.db('userDetails');
	var start=((parseInt(req.params.pageIndex))-1)*parseInt(req.params.pagesize);
	var size=parseInt(req.params.pagesize);
	var result = dbc.collection("userDetails").find().skip(start).limit(size);
	result.toArray(function(err,data){
		 if (err) throw err;
		if(data){result1=data;
		for(var i=0;i<size;i++)
		{
			var str1=result1[i].first_name.toLowerCase();
			if(str1.includes(str2))
			{
				result2.push(result1[i]);//console.log("result array :",result2);
			}
		}
		}//if
		console.log("data :",result2);
		res.send(result2);
	});//toArray
	});
});


//load data
app.get('/getData1/:pageIndex/:pagesize',function(req,res){
	console.log("PageIndex :",req.params.pageIndex,"PageSize :",req.params.pagesize);
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
    	//console.log("mongodb connection established");
	var dbc=conn.db('userDetails');
	var start=((parseInt(req.params.pageIndex)+1)-1)*parseInt(req.params.pagesize);
	var size=parseInt(req.params.pagesize);

	var pageSize=parseInt(req.params.pagesize);
	var pageIndex=parseInt(req.params.pageIndex)+1;
	
	dbc.collection("userDetails").find().count().then(function(numItems) {
		console.log("count :",numItems);
		var result = dbc.collection("userDetails").find().skip(start).limit(size);
		result.toArray(function(err,data){
		 if (err) throw err;
		console.log(data);
		res.send({'data':data,'pageIndex':pageIndex,'pageSize':pageSize,'length':numItems});
		});
	});	
	});
});

//add
app.post('/saveData',function(req,res){
	console.log("save data",req.body);
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
		var dbc=conn.db('userDetails');
		dbc.collection('userDetails').find().count()
		.then(function(numItems) {
		console.log("count :",numItems);
		var myobj={'id':numItems+1,'first_name':req.body.first_name,'last_name':req.body.last_name,'avatar':req.body.avatar};
		//console.log("myobj :",myobj);
		dbc.collection("userDetails").insertOne(myobj, function(err, response) {
			if(err) throw err;
			console.log("record inserted");
			if(response){
				dbc.collection("userDetails").find({'id':numItems+1}).toArray(function(err,data){
				   if (err) throw err;
				   console.log("result :",data);
				   res.send({'status':'success','data':data});
				});
			}});
			
		});
	});//mongo
});

//delete
 app.get('/deleteDaTa/:userId', function(req, res){
    console.log("delete data",req.params.userId);
    mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
	var dbc=conn.db('userDetails');
	dbc.collection("userDetails").remove({'_id':ObjectID(req.params.userId)}, function(err, response) {
	    if (err) throw err;
	    if(response){
		console.log("1 document deleted");
		res.send({'status':'deleted'});
	     }
	});
    });

 });

//update
app.put('/updateData/:userId', function(req, res){
    console.log("update data: ObjectID :",req.params.userId," New Data :",req.body);
	var id = { '_id': ObjectID(req.params.userId)};
	var newvalues = { $set: {first_name:req.body.first_name,last_name:req.body.last_name,avatar:req.body.avatar } };
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
	var dbc=conn.db('userDetails');
	  dbc.collection("userDetails").updateOne(id, newvalues, function(err, response) {
	    if (err) throw err;
	    if(response){
		console.log("1 document updated");
		res.send({'status':'success'});
	    }
	  });
     });
 });

//fileupload
var type=upload.single('avatar');//keep the same name 'avatar' in the fileupload_interface.html for file input name
app.post("/uploading",type,function(req,res,next){

	/** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;
console.log("tmp path:",tmp_path);
  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path ='/home/infinity/git3/angular-dynamic-forms5/uploads/'+req.file.originalname;
//console.log("target path :",target_path);

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
//console.log("destination :",dest)
  src.pipe(dest,function(e,d){console.log(e)});
  fs.unlink(tmp_path,function(e,d){console.log(e)}); //deleting the tmp_path
  src.on('end', function() { 
//console.log("hiiii",typeof(dest.path));
res.send({'data':dest.path});});
 // src.on('error', function(err) { res.end("ER") });
});

app.listen(4000);
