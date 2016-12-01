
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session')

mongoose.connect('mongodb://localhost:27017/test') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Mongo On");
});
app.use(session({
  secret:'@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized:true
}));

var user = mongoose.Schema({
  name:String,
  id:String,
  ps:String,
});

var sc = mongoose.Schema({
	id:String,
	header:String,
	date:String,
	content:String,
	setPlace:String,
	setNum:String
});

var userModel =mongoose.model('userModel',user);
// userModel.find({"id":"1","ps":"1"},function(err,models){
//   console.log(models)
// });

var scrumModel = mongoose.model('scrumModel',sc);
scrumModel.find({"id":"7"},function(err,models){
  console.log(models)
})

app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.static('views'));

app.use(bodyParser.urlencoded({extended:false}));


//setHeaders
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post('/returnFixScrum',function(req,res){
	var id = req.session.userId
	var setNum = req.session.userFixSetNum

	var header = req.body.header
	var date = req.body.date
	var content = req.body.content


	scrumModel.update({"id":id,"setNum":setNum},{$set:{"header":header,"date":date,"content":content}},function(err, models){
		if(err){
			return console.error(err)
		}
		if(models != ''){
			res.send("0")
		}
		else{
			res.send("1")
		}
	})
});

app.post('/fixSetValue',function(req,res){
	var setNum = req.session.userFixSetNum
	var id = req.session.userId
	console.log(setNum)
	scrumModel.find({"id":id,"setNum":setNum},function(err,models){
		if(err){
			return console.error(err)
		}

		if(models != null){
			res.send(models)
		}
		else{
			res.send("1")
		}
	});
});

app.post('/scrumFix',function(req,res){
	req.session.userFixSetNum = req.body.setNum

	res.send("0")
});

app.post('/changeSetPlace',function(req, res){
	var check = req.body.check;
	var value = req.body.value;
	console.log(check+"-----------"+value)
	scrumModel.update({"setNum":check,"id":req.session.userId},{$set:{"setPlace":value}},function(err, models){
		if(err){
			console.error(err);
		}
		console.log("change SetPlace");
	});

	scrumModel.find({"setNum":check},function(err,models){
		console.log(models)
	});

	res.send("0");

});

app.post('/scrumList',function(req,res){
	var id = req.session.userId;
	scrumModel.find({"id":id},function(err,models){
		if(err){
			return console.error(err)
		}
		if(models != ''){
			res.send(models)
			console.log(models)
		}
		else{
			res.send("a")
		}
	});
});

app.post('/sessionIdCheck',function(req, res){
	var id = req.session.userId;
	console.log(id)
	if(id != null){

		req.session.userId = id;
		res.send("0")
	}
	else{
		res.send("1")
	}
});

app.post('/addScrum',function(req, res){
	var id = req.session.userId;

	var header = req.body.header;
	var date = req.body.date;
	var content = req.body.content;
	var setPlace = "todo"
	var setNum = req.body.setNum;

	var addScrum = new scrumModel({"id":id,"header":header,"date":date,"content":content,"setPlace":setPlace,"setNum":setNum});
	addScrum.save(function(err,models){
		if(err){
			return console.error(err)
		}
		if(models != ''){
			req.session.userId = id;
			res.send("0")
		}
		else{
			res.send("1")
		}

	});
});


app.post('/login',function(req, res){
	var id = req.body.id;
  var ps = req.body.ps;

	userModel.find({"id":id,"ps":ps},function(err,models){
		if(err){
			return console.error(err)
		}

		if(models != ''){
			req.session.userId = id;
			res.send("0")
		}
		else{
			res.send("1")
		}
	});
});

app.post('/logout',function(req,res){
	req.session.userId = null

	res.send("1");
});

app.post('/addId',function(req, res){
  var id = req.body.id;
  var ps = req.body.ps;
  var name = req.body.name;

  var regi = new userModel({"name":name,"id":id,"ps":ps});
	userModel.find({"id":id},function(err,model){
		if(err){
			return console.error(err)
		}
		if(model == ''){
			regi.save(function(err,models){

				if(err){
					return console.error(err);
				}
				if(models != ''){
					req.session.userId = id;
					res.send("0");
				}

			});
		}
		else{
			res.send("1")
		}
	});
});

app.get('/scrum',function(req, res){
  res.render('scrum.html')
});

app.get('/register',function(req,res){
  res.render('register.html');
});

app.get('/',function(req, res){
    res.render('login.html');
});

app.get("/scrumAdd",function(req, res){
	res.render("scrumAdd.html")

});

app.get('/fix',function(req,res){
	res.render('scrumfix.html')
})

app.listen(3000,function(){
  console.log("Port 3000 Connection");
})
