// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
// a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

var productArr = [];

// Constructor function
function Product(name, path) {
  this.name = name;
  this.votes = 0;
  this.path = path;
  productArr.push(this);
}

// a simple IIFE to build all the product images // Producing path to new product
(function () {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
  }

  console.log(productArr);
})();

// Random number generator
// function randomPic() {
//   console.log(randomPic);
//   return Math.floor(Math.random() * productNames.length);
// }

var tracker = {
  img1: document.getElementById('img1'),
  img2: document.getElementById('img2'),
  img3: document.getElementById('img3'),
  showResultsEl: document.getElementById('showResults'),
  resultsEl: document.getElementById('results'),
  imageContainerEl: document.getElementById('imageContainer'),
  imgObj1: null,
  imgObj2: null,
  imgObj3: null,
  clicks: 1,

  randomPic: function () {
    // console.log(randomPic);
    return Math.floor(Math.random() * productNames.length);
  },

  showPictures: function () {
    this.imgObj1 = productArr[this.randomPic()];
    this.imgObj2 = productArr[this.randomPic()];
    this.imgObj3 = productArr[this.randomPic()];

    if (this.imgObj1 === this.imgObj2 || this.imgObj1 === this.imgObj3 || this.imgObj2 === this.imgObj3) {
      this.showPictures();
    }

    this.img1.src = this.imgObj1.path;
    this.img1.id = this.imgObj1.name;
    this.img2.src = this.imgObj2.path;
    this.img2.id = this.imgObj2.name;
    this.img3.src = this.imgObj3.path;
    this.img3.id = this.imgObj3.name;
  },

  limitClicks: function () {
    if (this.clicks > 14) {
      this.imageContainerEl.removeEventListener('click', this.clickHandler);
      this.showResultsEl.addEventListener('click', function (e) {
        e.preventDefault();
        tracker.showResults();
      });
    }
  },

  clickHandler: function (e) {
    tracker.limitClicks();
    if (e.target.id === tracker.imgObj1.name || e.target.id === tracker.imgObj2.name || e.target.id === tracker.imgObj3.name) {
      tracker.clicks++;
      tracker.showPictures();
      tracker.tallyVotes(e.target.id);
    }
  },

  tallyVotes: function (tallyId) {
    for (var i in productArr) {
      if (tallyId === productArr[i].name) {
        productArr[i].votes += 1;
        break;
      }
    }
  },

  showResults: function () {
    var ulResults = document.createElement('ul');
    for (var i in productArr) {
      var listResults = document.createElement('li');
      listResults.textContent = productArr[i].name + ': ' + productArr[i].votes;
      ulResults.appendChild(listResults);
    }

    this.resultsEl.appendChild(ulResults);
  },
};

tracker.imageContainerEl.addEventListener('click', tracker.clickHandler);
tracker.showPictures();
