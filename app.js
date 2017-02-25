
var productNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scrissors','shark','tauntaun','unicorn','water-can','wine-glass'];

var productArr = [];

// Constructor function
function Product() {
  this.name;
  this.votes = votes;
  this.path = path;
  productArr.push(this)
}

// Producing each new product
// function newProducts() {
//   console.log(productArr)
//   for (var i = 0; i < productNames.length; i++)
//   new Product(productNames[i], 'img/' + productNames + '.jpg');
// }

// Random number generator
function randomPic() {
  return Math.floor(Math.random() * productNames.length);
}

function showPictures() {
  console.log(showPictures);
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');

  img1.textContent = '';
  img2.textContent = '';
  img3.textContent = '';

var pictureIndex = randomPic();
img1.src = productArr[pictureIndex].path;
img1.id = productArr[pictureIndex].name;
productArr[pictureIndex];

// var pictureIndex2 = randomPicsIndex();
// while (pictureIndex2 === pictureIndex) {
//   pictureIndex2 = randomPicsIndex();
// }
//
// img2.src = productArr[pictureIndex2].path;
// img2.src = productArr[pictureIndex2].name;
// productArr[pictureIndex2];
//
// var pictureIndex3 = randomPicsIndex();
// while (pictureIndex3 === pictureIndex2 || pictureIndex3 === pictureIndex) {
//   pictureIndex3 = randomPicsIndex();
// }
// img3.src = productArr[pictureIndex3].path;
// img3.id = productArr[pictureIndex3].name;
// productArr[pictureIndex];

}

showPictures();
