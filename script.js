document.addEventListener("DOMContentLoaded", () => {

  console.log("DOM READY");

// global
let selectedSize = null;

let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;   //hämta sparad varukorg info så den inte nollställs eller om det inte finns nåt så kör på 0

const counterEl = document.getElementById("counter");
if (counterEl) {
  counterEl.textContent = cartCount; //varukorgen counter
}

updateVarukorgen(cartCount);

// hover-effekt för characters bilder
document.querySelectorAll('.card-image img').forEach(img => { //när hover - byt till hover source bilden
  const originalSrc = img.src;
  const hoverSrc = img.dataset.hover;

  img.addEventListener('mouseenter', () => { //musen är över original bild > byt
    img.src = hoverSrc;
  });

  img.addEventListener('mouseleave', () => { // musen sticker > byt tillbaka
    img.src = originalSrc;
  });
});

// netflix scrollen
document.querySelectorAll(".container").forEach(slider => { //hitta container (även om flera)

  let isDown = false; //är musknapp nere?
  let startX;         // var är musen när du börjar dra, X
  let scrollLeft;   // Var är scroll positionen
  let isDragging = false;  //är det ett drag och inte klick

  slider.addEventListener("mousedown", (e) => { 
    isDown = true;
    isDragging = false;
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
  });

  window.addEventListener("mouseup", () => {  //drag avslut
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {  //rör sig musen?
    if (!isDown) return; //om musknapp inte är nere, ingen funktion
    e.preventDefault(); //inge browser beteenden

    const walk = e.pageX - startX;  // drag blir scroll
    if (Math.abs(walk) > 5) isDragging = true; // <5 räknas som klick och inte drag

    slider.scrollLeft = scrollLeft - walk;
  });

});

// scroll-knapparna
document.querySelectorAll(".produkt-rad-posters").forEach(wrapper => {
  const container = wrapper.querySelector(".container");
  const btnLeft = wrapper.querySelector(".scroll-knapp.left");
  const btnRight = wrapper.querySelector(".scroll-knapp.right");

  if (!container || !btnLeft || !btnRight) return; //js är som att prata med en bäbis

const scrollAmount = 300; // scrolla 300px per click

btnLeft.addEventListener("click", () => { container.scrollBy({left: -scrollAmount, behavior: "smooth"}); }); //300px åt vänster

btnRight.addEventListener("click", () => { container.scrollBy({left: scrollAmount, behavior: "smooth"}); }); //300px åt höger

});


// Storlekar knappar

document.querySelectorAll(".sizebutton").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".sizebutton")
      .forEach(b => b.classList.remove("active"));  //en aktiv storlek i taget

    btn.classList.add("active"); // lägg till den som är aktiv
    selectedSize = btn.dataset.size;
  });
});

// varukorg siffra 

const addToCartBtn = document.querySelector(".add-to-cart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {

    if (!selectedSize) {
      alert("Please select a size"); // notis välj storlek annars får du inte klicka
      return;
    }

    cartCount++;
    localStorage.setItem("cartCount", cartCount); //kom ihåg varukorgen

    const counter = document.getElementById("counter"); //siffra ändras 
    if (counter) {
      counter.textContent = cartCount;
    }

    updateVarukorgen(cartCount);

    const feedback = document.querySelector(".added-feedback"); // notis att du lagt till i varukorgen
    if (feedback) {
      feedback.classList.add("show");
      setTimeout(() => {
        feedback.classList.remove("show");
      }, 1500);  // notis synlig i 1,5 sek
    }

  });
}

//varukorg bilden ändras med counter

function updateVarukorgen(count) {
  const cartIcon = document.getElementById("varukorgen");
  if (!cartIcon) return; // krascha inte snälla. om ingen carticon, ingen funktion

  if (count === 0) {
    cartIcon.src = "webdetails/icon/cart.webp";
  } else if (count === 1) {
    cartIcon.src = "webdetails/icon/cart1.webp";
  } else if (count === 2) {
    cartIcon.src = "webdetails/icon/cart2.webp";
  } else if (count === 3) {
    cartIcon.src = "webdetails/icon/cart3.webp";
  } else if (count === 4) {
    cartIcon.src = "webdetails/icon/cart4.webp";
  } else if (count === 5) {
    cartIcon.src = "webdetails/icon/cart5.webp";
  } else if (count === 6) {
    cartIcon.src = "webdetails/icon/cart6.webp";
  } else {
    cartIcon.src = "webdetails/icon/cart7.webp";
  }
}

// radera hela varukorgen

function clearCart() {
  console.log("CLEAR CART CLICKED"); //behövede troubleshoota den här skiten 100 gånger

  cartCount = 0;
  localStorage.setItem("cartCount", "0"); //set cart till 0 

  const counter = document.getElementById("counter");
  if (counter) counter.textContent = "0";

  updateVarukorgen(0);
}

const clearBtn = document.getElementById("clear-cart");

if (clearBtn) {
  clearBtn.addEventListener("click", clearCart); // clear cart knappen
}

});