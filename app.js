var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

var productArr = [];

// Constructor function
function Product(name, path, color) {
  this.name = name;
  this.votes = 0;
  this.path = path;
  productArr.push(this);
}

// a simple IIFE to build all the product images // Producing path to new product
(function () {
  for (var i in productNames) {
    new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
  }

  var stringifiedAllProducts = localStorage.getItem('stringfiedAllProducts');
  var parsedAllProducts = JSON.parse(stringifiedAllProducts);
  for (var i in parsedAllProducts) {
    productArr[i].votes = parsedAllProducts[i].votes;
  }

  console.log(productArr);
})();

// object literal tracker data
var tracker = {
  img1: document.getElementById('img1'),
  img2: document.getElementById('img2'),
  img3: document.getElementById('img3'),
  showResultsEl: document.getElementById('showResults'),
  resultsEl: document.getElementById('results'),
  imageContainerEl: document.getElementById('imageContainer'),
  chartResults: document.getElementById('showChart'),

  imgObj1: this.imgObj1,
  imgObj2: this.imgObj2,
  imgObj3: this.imgObj3,
  clicks: 1,
  chartData: null,
  counter: [],

  randomPic: function () {
    return Math.floor(Math.random() * productNames.length);
  },

  // Creating three random images
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

  // Limiting tp 15 click and displaying results when reached
  limitClicks: function () {
    if (this.clicks > 14) {
      this.imageContainerEl.removeEventListener('click', this.clickHandler);
      tracker.tallyVotes();
      tracker.showResults();
      return;
    }
  },

  // Tracking clicked images and showing new set
  clickHandler: function (e) {
    if (e.target.id === tracker.imgObj1.name || e.target.id === tracker.imgObj2.name || e.target.id === tracker.imgObj3.name) {
      tracker.clicks++;
      tracker.showPictures();
      tracker.tallyVotes(e.target.id);
      tracker.countVotes();
    }

    localStorage.setItem('stringfiedAllProducts', JSON.stringify(productArr));
    tracker.limitClicks();
  },

  // Tallying which images are being clicked and dynamically populating chart
  tallyVotes: function (tallyId) {
    for (var i in productArr) {
      if (tallyId === productArr[i].name) {
        productArr[i].votes += 1;
        tracker.counter.push(productArr[i].votes);
      }
    }
  },

  // Creating results list and appending to the DOM
  showResults: function () {
    var ulResults = document.createElement('ul');
    for (var i in productArr) {
      var listResults = document.createElement('li');
      listResults.textContent = productArr[i].name + ': ' + productArr[i].votes;
      ulResults.appendChild(listResults);
    }

    this.resultsEl.appendChild(ulResults);
  },

  //counts time pics are selected
  countVotes: function() {
    if (event.target.id === tracker.img1.name) {
      tracker.img1.votes++;
    }
    if (event.target.id === tracker.img2.name) {
      tracker.img2.votes++;
    }
    if (event.target.id === tracker.img3.name) {
      tracker.img3.votes++;
    }
    tracker.showPictures();
  }
};

//Event listeners
tracker.imageContainerEl.addEventListener('click', tracker.clickHandler);

tracker.chartResults.addEventListener('click', getChart);

tracker.showPictures();
localStorage.getItem('stringfiedAllProducts');

// Creating chart
function getChart() {
createChart();
};

  var data = {
    labels: productNames,
    datasets: [{
      label: '# of Votes',
      data: tracker.counter,
      backgroundColor: [],
      borderColor: 'purple',
      borderWidth: 1,
    }]
  };

function createChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
})
};
