/* -------------------------------------------------------------------------
 * First we will load all of this project's JavaScript dependencies.
 * ------------------------------------------------------------------------- */

// import 'bootstrap';

/* -------------------------------------------------------------------------
 * Then we will load a DOM-based router.
 * ------------------------------------------------------------------------- */

// import Router from './router';

// const router = new Router({
//   'common': {
//     init() {
//       //
//     },

//     finalize() {
//       //
//     },
//   },
// });

document.addEventListener('DOMContentLoaded', event => {

  var ball = document.querySelector('#ball');
  ball.addEventListener('click', function () {
    alert('click ball');
    fullpage_api.moveTo(1, 1);
  })

  var buildingGlow = document.querySelector('#building2');
  var sun = document.querySelector('.sun');
  buildingGlow.addEventListener('click', function () {
    alert('click buildingGlow');
    sun.classList.add('glow');
  })
  sun.addEventListener("animationend", function() {
    alert('animationend');
    fullpage_api.moveTo(1, 3);
  });

  new fullpage('#fullpage', {
    licenseKey: '61247EDB-E6FC48B8-94124F36-BD2AE093',
    controlArrows: true,
    loopHorizontal: false,
    verticalCentered: false,
    anchors: ['section1'],
    afterSlideLoad: function (section, origin, destination, direction) {
      var loadedSlide = this;

      //first slide of data-anchor="section1"
      if (section.anchor == 'section1') {
        switch (destination.anchor) {
          case 'slide-1':
            // console.log(destination);
            // alert("First slide loaded");

            break;
          case 'slide-2':
            var slideUpCovers = Array.prototype.slice.call(document.querySelectorAll('.cover-list'));
            slideUpCovers.forEach(function (item, i) {
              setTimeout(function () {
                item.classList.remove('translated');
              }, i * 200);
            });
            break;
        }
      }
    }
  });
});



