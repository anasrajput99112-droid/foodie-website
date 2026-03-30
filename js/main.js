var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: "#prev",
    prevEl: "#next",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
  },
});

const cartIcon = document.getElementById("cart-icon");
const cartTab = document.getElementById("cart-tab");
const closeBtn = document.getElementById("close-btn");
const cartList = document.getElementById("cart-list");

cartIcon.addEventListener("click", () => {
  cartTab.classList.toggle("left-auto");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.toggle("left-auto");
  // console.log("heloo");
});

let productList = [];

const showCards = () => {
  cartList.innerHTML = ""; // clear old entries before re-render
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("cart-list");
    orderCard.innerHTML = `
     <div
            class="flex flex-col justify-center items-center gap-5 bg-[#fff] border-2 border-amber-300  py-10 px-10 lg:py-5 lg:px-5 rounded-[1.5rem] shadow-[0px_8px_16px_rgba(0,0,0,0.1),inset_0px_1px_2px_rgba(255,255,255,0.8),inset_0px_-1px_2px_rgba(0,0,0,0.05)] ">
            <div>
              <img class="w-45 lg:w-52" src="${product.image}" alt="${product.name}">
            </div>
            <div class="text-center">
              <h1 class="text-xl font-bold">${product.name}</h1>

              <span class="text-[#F2bd12] font-bold">$${product.price}</span>
            </div>
            <div>
              <button class="btn card-btn">Add to cart</button>
            </div>

          </div>`;

    cartList.appendChild(orderCard);
    const addToCartBtn = orderCard.querySelector(".card-btn");
      addToCartBtn.addEventListener("click", (e) => {
         e.preventDefault();
         alert(`${product.name} added to cart!`);
         addToCart()
      });

  });
};

const addToCart = () => {
  
}

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      //  console.log(productList);
      showCards();
    });
};

initApp();
