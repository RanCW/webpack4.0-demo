import('./css/index.css');
var newNode = document.createElement("h1");
newNode.innerHTML = " 这里是index.js添加进来的东西 ";
document.querySelector('#root').appendChild(newNode);