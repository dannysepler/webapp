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

#### Requiring things

##### Packages:

The packages I use are [express](http://expressjs.com/), [request](https://github.com/mikeal/request), [nodemon](https://github.com/remy/nodemon). In the future, I might add [passport](http://passportjs.org/) for social network authentications.

Requring a package is pretty straightforward.

'''javascript
var express = require('express');
'''

Easy!

##### Routes:

Although I don't use this now, routes will become very helpful for when we start adding a lot of pages.

'''javascript
var routes = require('./routes');
'''

##### Routing

A typical render screen looks like this:

```
app.get('/login', function(req, res){
  	/* whenever the user goes to "http://app.eatable.at/login" */

  res.render('login');
  	/* the app renders the 'login.jade' file */

  	/* if html, render it like: "res.render('login.html');" */
});
```

You can also write some code in between getting the page and rendering it. I do this most often to check if the user is logged in.

```
app.get('/amiloggedin', function(req, res){
	checkLoginStatus();
	res.render('yup!');
});
```

---

### Views

---

### Stylesheets

---

### Javascripts

---