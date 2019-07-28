var data =[];
var button = document.getElementById("btn");

btn.addEventListener("click", fn1);

function fn1() {
  var str = document.getElementById("text1").value;
  getGpu(str);
  console.log(str);
}

function getGpu(input) {
  fetch("https://gist.githubusercontent.com/vjakovlev/c557267be3377473cbd2ebabdc1cb1ba/raw/7becef2faa7e1adc05bd6a130d8700e18b0c5480/gc.json")
  .then(response => response.json())
  .then(result => {
    data.push(result)
  })
}

for(let i=0; i <data.length;i++){
  console.log(data[i])
}

console.log(data);