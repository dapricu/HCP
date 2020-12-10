/*
  Updated: added 3d hover transform :)

  Original by: Simon Goellner ( https://codepen.io/simeydotme/pen/PrQKgo )
  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge blend mode
*/

// original
const $silvershieldss = $(".silvershields");
const $style = $(".hover");

$silvershieldss.on("mousemove", function(e) {
  var $silvershields = $(this);
  var l = e.offsetX;
  var t = e.offsetY;
  var h = $silvershields.height();
  var w = $silvershields.width();
  var lp = Math.abs(Math.floor(100 / w * l)-100);
  var tp = Math.abs(Math.floor(100 / h * t)-100);
  var bg = `background-position: ${lp}% ${tp}%;`
  var style = `.silvershields.active:before { ${bg} }`
  $silvershieldss.removeClass("active");
  $silvershields.addClass("active");
  $style.html(style);
}).on("mouseout", function() {
  $silvershieldss.removeClass("active");
});

//
// 3d hover magic
//
const resetTransform = (el, perspective = 800) =>
  (el.style.transform = `translate3d(0%, 0%, -${perspective /
    2}px) rotateX(0deg) rotateY(0deg)`);

const onMove = (ev, el) => {
  const { pageX, pageY } = ev;
  const { offsetWidth, offsetHeight } = el;
  const { left, top } = el.getBoundingClientRect();

  const silvershieldsX = left + offsetWidth / 2;
  const silvershieldsY = top + offsetHeight / 2;

  const angle = 25;
  const rotX = (silvershieldsY - pageY) / angle;
  const rotY = (silvershieldsX - pageX) / -angle;

  el.style.transform = `translate3d(0%, 0%, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
};

const perspective =
    getComputedStyle($silvershieldss[0].parentElement)
      .getPropertyValue("perspective")
      .replace("px", "") || 800;

const onsilvershieldsMove = ev => onMove(ev, ev.target);
const onHover = ev => ev.target.addEventListener("mousemove", onsilvershieldsMove);
const onOut = ev => {
  resetTransform(ev.target, perspective); // reset silvershields
  ev.target.removeEventListener("mousemove", onsilvershieldsMove);
};

// setup silvershieldss interaction
[...$silvershieldss.toArray()].forEach(silvershields => {
  silvershields.addEventListener("mouseover", onHover);
  silvershields.addEventListener("mouseout", onOut);
});
