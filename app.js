// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
// a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

var productArr = [];

// Creating chart
var ctx = document.getElementById('myChart').getContext('2d');
var chartData = {
  type: 'bar',
  data: {
    labels: productNames,
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: [],
      borderColor: 'purple',
      borderWidth: 1,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true;
        },
      }]
    },
  },
};


// Constructor function
function Product(name, path, color) {
  this.name = name;
  this.votes = 0;
  this.path = path;
  this.colors = color;
  productArr.push(this);
  chartData.data.datasets[0].data.push(this.votes);
  chartData.data.datasets[0].backgroundColor.push(this.colors);
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

// Tracker data
var tracker = {
  img1: document.getElementById('img1'),
  img2: document.getElementById('img2'),
  img3: document.getElementById('img3'),
  showResultsEl: document.getElementById('showResults'),
  resultsEl: document.getElementById('results'),
  imageContainerEl: document.getElementById('imageContainer'),
  imgObj1: this.imgObj1,
  imgObj2: this.imgObj2,
  imgObj3: this.imgObj3,
  clicks: 1,

  randomPic: function () {
    // console.log(randomPic);
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

  // Limiting number of clicks to 15 and then stopping images from changing when limit is reached
  limitClicks: function () {
    if (this.clicks > 14) {
      this.imageContainerEl.removeEventListener('click', this.clickHandler);
      this.showResultsEl.addEventListener('click', function (e) {
        e.preventDefault();
        tracker.showResults();
      });
    }
  },

  //Tracking which image is clicked and then refreshing all three images after each click
  clickHandler: function (e) {
    tracker.limitClicks();
    if (e.target.id === tracker.imgObj1.name || e.target.id === tracker.imgObj2.name || e.target.id === tracker.imgObj3.name) {
      tracker.clicks++;
      tracker.showPictures();
      tracker.tallyVotes(e.target.id);
    }

    localStorage.setItem('stringfiedAllProducts', JSON.stringify(productArr));
  },

  // Tallying which images are being clicked and dynamically populating chart
  tallyVotes: function (tallyId) {
    for (var i in productArr) {
      if (tallyId === productArr[i].name) {
        productArr[i].votes += 1;
        myChart.data.datasets[0].data[i]++;
        myChart.update();
        break;
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
};

var myChart = new Chart(ctx, chartData);
tracker.imageContainerEl.addEventListener('click', tracker.clickHandler);
tracker.showPictures();
localStorage.getItem('stringfiedAllProducts');
