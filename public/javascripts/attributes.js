app.get('http://localhost:3000/app/attributes', function(req,res) {
  // request 1
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", res.statusCode);
    //console.log("Headers", JSON.stringify(res.headers));
    //console.log("Response received", body);
    res1atemp = body;
  });
  
  // request 2
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    method: "GET"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    res2atemp = body;
  });
  res.render('app/attributes', {
    title: 'Attributes',
    data1: {
      response: JSON.stringify(res1atemp)
    },
    data2: {
      response: JSON.stringify(res2atemp)
    }
  });
});

app.post('/app/attributes', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/attributes.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
  });
  response.redirect('/app');
});

app.post('/app/attributes/put', function(requests,response) {
  request({
    url: "http://api.eatable.at:3000/attributes/43.json",
    body: "{ \"attribute\": { \"name\": \""+requests.body.attribute+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "PUT"
  }, function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Response received", body);
  });
  response.redirect('/app');
});