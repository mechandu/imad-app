var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
'aricle-three':{
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
					${date}
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
var counter=0;
app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/:articleName', function (req, res) {
  var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
