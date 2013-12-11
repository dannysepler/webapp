# **Eatable Webapp**

### We eat in style

[The website](http://app.eatable.at)

Table of contents:

* [Before running the app](#before-running-the-app)
* [The app.js file](#the-appjs-file)
* [Views](#views)
* [Stylesheets](#stylesheets)
* [Javascripts](#javascripts)

---

### Before running the app

Here's what you need to do:

1. [NodeJS](http://nodejs.org/download/) installed. 
2. Now clone the source code in the terminal.
3. Go into the source code folder on terminal, and type in the following commands.
..* "npm install express"
..* "npm install nodemon"
..* (this tells the [node package manager](https://npmjs.org/) to get these packages. Express is the Node framework this app is built in. Nodemon allows the server to update instantaneously, so you don't have to keep restarting your local server. It's pretty great.)
4. Run the app with "nodemon app.js". It should read "Express server listening on port {{Port #}}"
5. Please let me know if I missed any steps. Thanks!

---

Let's get started.

---

### The app.js file

[Requiring Packages](#requiring-packages)
[Requiring Routes](#requiring-routes)
[Rendering](#rendering)
[Redirecting](#redirecting)
[Posting Forms](#posting-forms)
[Getting with Request](#getting-with-request)
[Posting with Request](#posting-with-request)

##### Requiring Packages

The packages I use are [express](http://expressjs.com/), [request](https://github.com/mikeal/request), [nodemon](https://github.com/remy/nodemon). In the future, I might add [passport](http://passportjs.org/) for social network authentications.

Requring a package is pretty straightforward.

```var express = require('express');```

Easy!

##### Requiring Routes

Although I don't use this now, routes will become very helpful for when we start adding a lot of pages.

```var routes = require('./routes');```

##### Rendering (aka "getting")

A typical render screen looks like this:

```
app.get('/login', function(req, res){
  	/* whenever the user goes to "http://app.eatable.at/login" */

	res.render('login'); /* if jade */

  			/* OR */
	
	res.render('login.html'); /* if html */
});
```

Note that it already looks inside the 'views' folder, so you don't have to worry about specifying that.

You can also write some code in between getting the page and rendering it. I do this most often to check if the user is logged in.

```
app.get('/am_i_logged_in', function(req, res){
	checkLoginStatus();
	res.render('yup!');
});
```


##### Redirecting

Node also has a useful manner of redirecting a page. It looks like this:

```
app.get('/redirect', function(req, res) {
	res.redirect('/newpage');
});
```

##### Posting forms

Say you have this html form:

```
<form method="post" action="/form">
	<input type="text" name="input1"></input>
</form>
```

When this form submits, you do the server-side action on the app.js page.

```
app.post('/form', function(req, res) {
	var input = req.body.input1; /* this is the form info */

	/* ....other stuff..... */
});
```

When you post a form, most of the time you'll be using request to [submit this info to the server](#posting-with-request).

##### Getting with Request

This is very easy. I suggest copying and pasting any necessary code out the [apiary](http://apiary.io/).

##### Posting with Request

A typical post request looks like this:

```
app.post('/link', function(req, res) {
	request({
		url: "http://url.com/",
		body: "{ \"info\": \""+req.body.form_info+"\" }",
		headers: {"Content-Type": "application/json"},
		method: "POST"
	}, function (error, response, body) {
		/* anthing else you want to do goes here. information that bounces back to you is accessible through a json object called 'body' */

		console.log( JSON.parse(body) );
	});
});

```

---

### Views

---

### Stylesheets

---

### Javascripts

---