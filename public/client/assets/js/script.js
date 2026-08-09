// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS


// button menu
const buttonMenu = document.querySelector(".header .inner-button-menu");
if(buttonMenu){
  const menu = document.querySelector(".header .inner-menu");
  const overlay = document.querySelector(".header .inner-menu-overlay");
  buttonMenu.addEventListener("click", () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
  })

  overlay.addEventListener("click", () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
  })

  const listItem = document.querySelectorAll(".header .inner-menu > ul > li");
  listItem.forEach(item => {
    const buttonDown = item.querySelector("i");
    if(buttonDown){
      buttonDown.addEventListener("click", () => {
        if(item.classList.contains("show")){
          item.classList.remove("show");
          buttonDown.setAttribute("class","fa-solid fa-caret-down")
        }else {
          item.classList.add("show");
          buttonDown.setAttribute("class","fa-solid fa-caret-up")
        }
      })
    }
  })
}
// end button menu

// location section1
const boxLocationSection1 = document.querySelector(".section-1 .inner-form .inner-location");
if(boxLocationSection1){
  const boxInput = boxLocationSection1.querySelector(".inner-input-group");
  const boxSuggest =  document.querySelector(".inner-suggest");
  const input = boxInput.querySelector(".inner-input");
  boxInput.addEventListener("click",() => {
    boxSuggest.classList.add("show");
  })

  const listItem = boxSuggest.querySelectorAll(".inner-item");
  listItem.forEach(item => {
    item.addEventListener("click", () => {
      const name = item.querySelector(".inner-name").innerHTML.trim();
      input.value = name;
      boxSuggest.classList.remove("show");
    })
  })

  document.addEventListener("click", (event) => {
    if(!event.target.closest(".inner-location")){
      boxSuggest.classList.remove("show");
    } 
  })
}
// end location section1

// quantity section1
const boxQuantitySection1 = document.querySelector(".section-1 .inner-quantity");
if(boxQuantitySection1){
  const listQuantity = boxQuantitySection1.querySelector(".inner-list-quantity");
  const listItem = listQuantity.querySelectorAll(".inner-item");
  boxQuantitySection1.addEventListener("click", () => {
    listQuantity.classList.add("show");
  })

  listItem.forEach(item => {
    const buttonDown = item.querySelector(".inner-down");
    const buttonUp = item.querySelector(".inner-up");
    const input = item.querySelector("input");
    buttonDown.addEventListener("click", () => {
      if(parseInt(input.value) > 0){
        input.value = parseInt(input.value) - 1;
      }
    })

    buttonUp.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
    })
  })

  document.addEventListener("click", (event) => {
    if(!event.target.closest(".inner-quantity")){
      listQuantity.classList.remove("show");
    }
  })
}
// end quantity section1

// expire section 1
const boxExpire = document.querySelector("[clock-expire]");
if(boxExpire){
  const stringExpire = boxExpire.getAttribute("clock-expire");
  const listItem = boxExpire.querySelectorAll(".inner-item .inner-num");
  const expireDate = new Date(stringExpire);
  const clockInterval = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = expireDate - currentDate;
    if(remainingTime > 0){
      const day = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hour = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minute = Math.floor((remainingTime / (1000 * 60)) % 60);
      const second = Math.floor((remainingTime / 1000) % 60);

      listItem[0].innerHTML = day >= 10 ? day : `0${day}`;
      listItem[1].innerHTML = hour >= 10 ? hour : `0${hour}`;
      listItem[2].innerHTML = minute >= 10 ? minute : `0${minute}`;
      listItem[3].innerHTML = second >= 10 ? second : `0${second}`;
    }else {
      clearInterval(clockInterval);
    }
  }, 1000)
}
// end expire section 1

// boxfilter section 10
const boxLeft = document.querySelector(".section-10 .inner-left");
if(boxLeft){
  const buttonFilter = document.querySelector(".section-10 .inner-button-filter");
  buttonFilter.addEventListener("click", () => {
    boxLeft.classList.toggle("show");
  })
}
// end boxfilter section 10

// box tour info section 11
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo){
  const contentInfo = boxTourInfo.querySelector(".inner-content");
  const buttonViewMore = boxTourInfo.querySelector(".button-outline");
  buttonViewMore.addEventListener("click", () => {
    if(contentInfo.classList.contains("show")){
      contentInfo.classList.remove("show");
      buttonViewMore.innerHTML = "Xem tất cả";
    }else {
      contentInfo.classList.add("show");
      buttonViewMore.innerHTML = "Thu gọn";
    }
  })
  const gallary = new Viewer(contentInfo);
}
// end box tour info section 11

// swiper section 2
const swiperSection2 = document.querySelector(".swiperSection2");
if(swiperSection2){
  var swiper = new Swiper('.swiperSection2', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
}
// end swiper section 2


// swiper section 3
const swiperSection3 = document.querySelector(".swiperSection3");
if(swiperSection3){
  var swiper = new Swiper('.swiperSection3', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
}
// end swiper section 3


// swiper section 10
const boxImage = document.querySelector(".box-images");
if(boxImage){
  var swiper = new Swiper('.swiperThumbSection10', {
    spaceBetween: 4,
    slidesPerView: 4,
    freeMode: true,
    breakpoints: {
      576: {
        spaceBetween: 9,
      },
    },
  });
  var swiper2 = new Swiper('.swiperMainSection10', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: swiper,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  const gallary = new Viewer(boxImage);
}
// end swiper section 10

// viewerjs tour schedule
const boxTourDetail = document.querySelector(".box-tour-schedule");
if(boxTourDetail){
  const gallary = new Viewer(boxTourDetail);
}
// end viewerjs tour schedule

// emailForm
const emailForm = document.querySelector("#emailForm");
if(emailForm){
  const validator = new JustValidate(emailForm);

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Hãy nhập email để đăng ký!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
        console.log(event.target.email.value)
    })
}
// end emailForm

// couponForm
const couponForm = document.querySelector("#couponForm");
if(couponForm){
  const validator = new JustValidate(couponForm);

  validator
    .addField('#coupon', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mã giảm giá!',
      },
    ])
    .onSuccess((event) => {
        console.log(event.target.coupon.value)
    })
}
// end couponForm

// orderForm
const orderForm = document.querySelector("#orderForm");
if(orderForm){
  const validator = new JustValidate(orderForm);

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ và tên',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Tối thiểu 5 ký tự',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Tối đa 20 ký tự',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại',
      },
      {
        rule: 'customRegexp',
        value: /^(?:(?:\+84|84|0)(?:3[2-9]|5[25689]|7[06789]|8[1-9]|9[0-46-9]))\d{7}$/,
        errorMessage: 'Hãy nhập chuẩn định dạng số điện thoại',
      },
    ])
    .onSuccess((event) => {
        console.log(event.target.fullName.value)
        console.log(event.target.phone.value)
        console.log(event.target.paymentMethod.value)
    })
    // ẩn hiện paymentMethod
    const listPayMent = orderForm.querySelectorAll(`[name="paymentMethod"]`);
    const boxBank = orderForm.querySelector(".inner-bank")
    listPayMent.forEach(input => {
      input.addEventListener("change", () => {
        if(input.value == "money"){
          boxBank.classList.add("show");
        }else {
          boxBank.classList.remove("show")
        }
      })
    })
    // hết ẩn hiện paymentMethod
}
// end orderForm
