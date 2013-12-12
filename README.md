# **Eatable Webapp**

### We eat in style

[The website](http://app.eatable.at)

**Table of contents:**

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
  * "npm install express"
  * "npm install nodemon"
  * (this tells the [node package manager](https://npmjs.org/) to get these packages. Express is the Node framework this app is built in. Nodemon allows the server to update instantaneously, so you don't have to keep restarting your local server. It's pretty great.)
4. Run the app with "nodemon app.js". It should read "Express server listening on port {{Port #}}"
5. Please let me know if I missed any steps. Thanks!

---

Let's get started.

---

### The app.js file

[Requiring Packages](#requiring-packages) <br/>
[Requiring Routes](#requiring-routes) <br/>
[Rendering](#rendering) <br/>
[Redirecting](#redirecting) <br/>
[Posting Forms](#posting-forms) <br/>
[Getting with Request](#getting-with-request) <br/>
[Posting with Request](#posting-with-request)

##### Requiring Packages

The packages I use are [express](http://expressjs.com/), [request](https://github.com/mikeal/request), [nodemon](https://github.com/remy/nodemon). In the future, I might add [passport](http://passportjs.org/) for social network authentications.

Requring a package is pretty straightforward.

```var express = require('express');```

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
	if ( loggedIn() )
		res.render('yup!');
	else 
		res.render('nope!');
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

This is very easy. I suggest copying and pasting any necessary code from the [apiary](http://apiary.io/).

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
		/* anthing else you want to do goes here. information that bounces 
		back to you is accessible through a json object called 'body' */

		console.log( JSON.parse(body) );
	});
});

```

---

### Views

This is where the HTML and Jade is stored.

[Jade Essentials](#jade-essentials) <br/>
[Jade Templates](#jade-templates) <br/>
[Routing](#routing-with-views) <br/>
[Fallbacks](#fallbacks)

##### Jade Essentials

Jade is like a super minimalist HTML. The best resources I found for it are its [documentation](http://jade-lang.com/) and this [html-jade converter](http://html2jade.aaron-powell.com/).

Jade helps you to write HTML as cleanly and quickly as possible. It's a great product. Here's a side-by-side comparison of HTML and Jade.

HTML:
```
<!DOCTYPE html>
<html>
	<head>
		<title>Beatz</title>
		<script src="/dropthebass.js"></script>
	</head>
	<body>
		<div class="hey" id="jude">
			<button class="dont" value="let" name="me">Down!</button>
		</div>
	</body>
</html>
```

JADE:
```
!!! 5
html
	head
		title Beatz
		script(src="/dropthebass.js")
	body
		.hey#jude
			button.dont(value="let" name="me") Down!
```

As you can see, classes are turned into dots and IDs are turned into hashtags. If a div has an ID or class, you can omit the word "div" from the declaration. Also, instead of < > brackets, Jade uses parentheses to give HTML objects their values.

Because it's still new, Jade can be a little hard to understand and find good documentation fod sometimes. Even though this can be annoying, I suggest sticking through the ruts because it's a good language that's really helped me write quickly and effectively.

##### Jade Templates

This is an awesome benefit of using Jade. You won't have to link all of the same stylesheets or scripts in each page of the app. Instead, you can do something like this:

layout.jade
```
html
	head
		link(type="text/css" rel="stylesheet" href="/stylesheets/bootstrap.css")
		script(src="/javascripts/bootstrap.js")
```
and inherit all of these attributes with this command on any page: `extends layout`

In actual practice, it looks like this:

layout.jade
```
html
	head
		block prepend-head

		link(type="text/css" rel="stylesheet" href="/stylesheets/bootstrap.css")
		link(type="text/css" rel="stylesheet" href="/stylesheets/ui.css")
		link(type="text/css" rel="stylesheet" href="/stylesheets/corrections.css")

		script(src="/javascripts/bootstrap.js")
		script(src="/javascripts/jquery.js")
		script(src="/javascripts/modernizr.js")
		script(src="/javascripts/ui.js")

		block append-head

	body
		header
			// code

		block content
		
		footer
			// code
```

Notice the `block`s littered throughout the file. These allow us to add things wherever one of these blocks is located.

A file that inherits from this might look like:

about-me.jade
```
inherits layout
	// needs to go at beginning

block prepend-head
	// you can add to blocks in the head
	// this will place these elements in the beginning of the head
	title Hello, World!
	meta description

block append-head
	// this will place elements in the end of the head
	script(src="/javascripts/google-analytics.js")
	script(src="/javascripts/facebook-login.js")

block content
	h1 Just a little info about your fine self!
	div
		form
			input name
			input email
			button(type="submit")
```

##### Routing with Views

Just a few notes:
* Make sure to put all jade and html in the views folder
* When getting these pages from the 'app.js' file, if you write `res.render('aboutme');`, the program will automatically know to look in the views folder

##### Fallbacks

As with anything, Jade has some problems that I'm looking to solutions for. If I find any good things, I'll update this page. My least favorite part concerns commenting. 

Commenting is a little frustrating, considering that the ` /* stuff */ ` comments don't exist in Jade. All comments have to be of the ` // stuff ` form. Which doesn't allow me to comment out inner parts of a line

---

### Stylesheets

This section is pretty short, because the stylesheets are straightforward. (By the way, all CSS docs are located in the "/public/stylesheets" folder)

##### Linking to stylesheets:

Simple, just specify it's in the "stylesheets" folder like so: `link(href="/stylesheets/cssdoc.css")`

##### What does "style2.css" do?

This was taken from a tutorial online. I will slowly be zoning out this stylesheet. Hopefully when the alpha comes out, it won't use this stylesheet at all.

---

### Javascripts

[The UI page](#the-ui-page)

###### The UI page

The server-side code for this site can be seen on the "/public/javascripts/json.js" and "/public/javascripts/functions.js". The client-side code, as well as the google maps integration, can be found in the "/public/javascripts/ui" folder.

[Quick link back to functions involving request!](#getting-with-request)

---