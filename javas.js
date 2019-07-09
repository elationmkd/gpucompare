let myRequest = new Request("./gc.json")

fetch (myRequest)
    .then (function(resp){
        return resp.json();
    })
    .then (function(gc){
        console.log(gc)
    });