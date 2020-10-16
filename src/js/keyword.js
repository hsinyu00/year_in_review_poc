window.onload = function () {
  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");
  var canvasBg = new Image();
  canvasBg.src= "/year_in_review_poc/images/canvas-bg.jpg"

  // Utilities
  function randomColor(i) {
    // return '#' + Math.random().toString(16).slice(2, 8);
    return 'rgba(255,255,255,' + i/100 + ')';
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Make the canvas occupy the full page
  var W = window.innerWidth,
    H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  var particles = [];

  //Lets create some particles now
  var particle_count = 100;
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle(i));
  }

  function particle(i) {
    //speed, life, location, life, colors
    this.speed = {
      x: 0,
      y: 0
    };
    //location = center of the screen
    this.location = {
      x: W / 2 + randomInt(0, 50) * randomInt(-1, 1),
      y: H / 3 + randomInt(0, 50) * randomInt(-1, 1)
    };
    this.color = randomColor(i)

    this.font = {
      size: randomInt(3, 8)
    }

    // this.word = randomWord()
    this.word = words[i];
  }

  function draw() {
    ctx.globalCompositeOperation = "copy";
    // //Painting the canvas black
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, W, H);
    ctx.drawImage(canvasBg, 0, 0);


    ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.font = p.font.size + "vh Luckiest Guy";
      ctx.textAlign = "center";
      ctx.transition = "all 2s ease";
      ctx.fillStyle = p.color;
      ctx.fillText(p.word, p.location.x, p.location.y);
      ctx.fill();
      ctx.stroke();

      switch (i%4) {
        case 0:
          p.speed.x += 0.01 * i ;
          p.speed.y += 0.005 * i;
          break;
        case 1:
          p.speed.x -= 0.01 * i;
          p.speed.y += 0.005 * i;
          break;
        case 2:
          p.speed.x += 0.005 * i;
          p.speed.y -= 0.005 * i;
          break;
        case 3:
          p.speed.x -= 0.005 * i;
          p.speed.y -= 0.005 * i;
          break;

        default:
          break;
      }

      p.location.x += p.speed.x;
      p.location.y += p.speed.y;

    }
  }
  canvasBg.onload = function() {
    setInterval(draw, 30);
  }

};

// Big Word Array
words = ["1the", "2of", "3and", "4to", "5in", "6i", "7that", "8was", "9his", "10he", "11it", "12with", "13is", "14for", "15as", "16had", "17you", "18not", "19be", "20her", "21on", "22at", "23by", "24which", "25have", "26or", "27from", "28this", "29him", "30but", "31all", "32she", "33they", "34were", "35my", "36are", "37me", "38one", "39their", "40so", "41an", "42said", "43them", "44we", "45who", "46would", "47been", "48will", "49no", "50when", "51there", "52if", "53more", "54out", "55up", "56into", "57do", "58any", "59your", "60what", "61has", "62man", "63could", "64other", "65than", "66our", "67some", "68very", "69time", "70upon", "71about", "72may", "73its", "74only", "75now", "76like", "77little", "78then", "79can", "80should", "81made", "82did", "83us", "84such", "85a", "86great", "87before", "88must", "89two", "90these", "91see", "92know", "93over", "94much", "95down", "96after", "97first", "98Mr", "99good", "100men"];
