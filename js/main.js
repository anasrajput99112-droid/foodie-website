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
// const AddCartitems = document.getElementById("cart-items");
const cardList = document.getElementById("card-list");

cartIcon.addEventListener("click", () => {
  cartTab.classList.toggle("left-auto");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.toggle("left-auto");
  // console.log("heloo");
});

let productList = [];
let cartProduct = [];

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("cart-list");
    orderCard.innerHTML = `
           <div class="flex flex-col justify-center items-center gap-5 bg-[#fff] border-2 border-amber-300  py-10 px-10 lg:py-5 lg:px-5 rounded-[1.5rem] shadow-[0px_8px_16px_rgba(0,0,0,0.1),inset_0px_1px_2px_rgba(255,255,255,0.8),inset_0px_-1px_2px_rgba(0,0,0,0.05)] ">
            <div>
              <img class="w-45 lg:w-52" src="${product.image}" alt="${product.name}">
            </div>
            <div class="text-center">
              <h1 class="text-xl font-bold">${product.name}</h1>

              <span class="text-[#F2bd12] font-bold">${product.price}</span>
            </div>
            <div>
              <button class="btn card-btn">Add to cart</button>
            </div>

          </div>`;

    cartList.appendChild(orderCard);

    const CartBtn = orderCard.querySelector(".card-btn");
    CartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Product already in cart");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let Price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("items");
  cartItem.innerHTML = `
                 <div class=" items item-list flex items-center gap-5 mb-2.5 p-5">
                 <div>
                  <img class="card-image w-[5rem] h-[5rem] object-cover" src="${product.image}">
                 </div>

                 <div>
                  <h4 class="text-[1.1rem] font-[400]">${product.name}</h4>
                  <h4 class="item-total text-[1rem]">${product.price}</h4>
                 </div>

                 <div class="flex ">
                  <a href="" class="minus bg-black text-white w-[1.7rem] aspect-[1] rounded-[100vw] text-center leading-[1.7rem]"><i class="ri-subtract-fill"></i></a>
                  <h4 class="quantity-value text-[1rem] font-bold mx-[.3rem]">1</h4>
                  <a href="" class="plus  bg-black text-white w-[1.7rem] aspect-[1] rounded-[100vw] text-center leading-[1.7rem]"><i class="ri-add-fill"></i></a>
                 </div> 
                 </div>`;
  cardList.appendChild(cartItem);

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(Price * quantity).toFixed(2)}`;
    e.preventDefault();
  });

  minusBtn.addEventListener("click", (e) => {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(Price * quantity).toFixed(2)}`;
    } else {
     setTimeout(() => {
      cartItem.remove();
     }, 300);
     cartProduct = cartProduct.filter((item) => item.id !== product.id);
     alert("Product removed from cart");
    }

    e.preventDefault();
  });
};

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
