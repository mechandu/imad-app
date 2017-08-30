var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'printfchandu',
    database:'printfchandu',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
var articles={
'article-one':{
	title:'article one | Cad',
	heading :'Article One',
	date:'May 06 2017',
	content:`
	<p>
			Bheemineni Chandrika D/o Bheemineni Lokanadha Naidu
			Lankipalle (V)
			C R Kandriga (P)			
			Penumur (M)
			Chittoor (D)
			Andhra Pradesh
			517 126
</p>`},
'article-two':{
	title:'article two | Cad',
	heading :'Article two',
	date:'May 23 2017',
	content:`
	<p>
			Bheemineni Chandrika D/o Bheemineni Lokanadha Naidu
			Lankipalle (V)
			C R Kandriga (P)			
			Penumur (M)
			Chittoor (D)
			Andhra Pradesh
			517 126
</p>`},
'article-three':{
	title:'article three | Cad',
	heading :'Article three',
	date:'May 31 2017',
	content:`
	<p>
			Bheemineni Chandrika D/o Bheemineni Lokanadha Naidu
			Lankipalle (V)
			C R Kandriga (P)			
			Penumur (M)
			Chittoor (D)
			Andhra Pradesh
			517 126
</p>`}
};
function createTemplate(data)
{
	var title=data.title;
	var date=data.date;
	var heading=data.heading;
	var content=data.content;
	var htmlTemplate=`
		 <html>
			 <head>
				<title>
				 Article-one|Chandhu
				 </title>
				 <link href="/ui/style.css" rel="stylesheet" />
			 </head>
			 <body>
			 <div class="container">
				<div>
					<a href="/">Home</a>
				</div>
				<h3>
					${heading}
				</h3>
				<div> 
					${date.toDateString()}
				</div>
				<div>
					${content}
				</div>
			</div>
			 </body>
		 </html>
		 `;
		 return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new Pool(config);
 app.get('/test-db',function(req,res){
     //make a select request and returna response with the results
     pool.query('SELECT * FROM test', function(err,result){
         if(err){
             res.status(500).send(err.toString());
         }
         else{
             res.send(JSON.stringify(result.rows));
         }
     });
 });

var counter=0;
app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('submit-name', function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
 // var articleName=req.params.articleName;
 pool.query("SELECT * FROM Article WHERE title='"+req.params.articleName+"'" , function(err,result)
{
    if(err)
	{
        res.status(500).send(err.toString());
    }
    else{
			if(result.rows.length===0)
			{
				res.status(404).send('Article not found');
			}
			else
			{
			var articleData=result.rows[0];
			res.send(createTemplate(articleData));
			}
		}
});
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
