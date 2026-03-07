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
    }
  },
});