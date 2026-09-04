// Khởi Tạo TINIMCE
const initTinyMCE = (selector) => {
  tinymce.init({
    selector: selector || '[textarea-mce]',
    plugins: ["anchor", "link", "charmap", "code", "codesample", "emoticons", "image", "insertdatetime", "lists", "advlist", "fullscreen", "media", "preview", "quickbars", "searchreplace", "table", "wordcount"],
    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media fullscreen preview searchreplace | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
    quickbars_selection_toolbar: 'bold italic underline | blocks | bullist numlist | blockquote quicklink',
  });
}

initTinyMCE();
// Hết Khởi Tạo TINIMCE

// buttonMenu
const sider = document.querySelector(".sider");
if(sider){
  const buttonMenu = document.querySelector(".header .inner-button-menu");
  buttonMenu.addEventListener("click", () => {
    sider.classList.toggle("show");
  })

  const pathName = window.location.pathname.split("/");
  const listTagA = sider.querySelectorAll("a");
  listTagA.forEach(a => {
    const link = a.getAttribute("href").split("/");
    if(link[2] == pathName[2]){
      a.classList.add("active");
    }
  })
}
// end buttonMenu

// createSchedule
const boxSchedule = document.querySelector(".section-7 form .inner-schedule");
if(boxSchedule){
  const buttonCreateSchedule = boxSchedule.querySelector(".inner-schedule-create");
  const listSchedule = boxSchedule.querySelector(".inner-schedule-list");
  
  // tạo lịch
  buttonCreateSchedule.addEventListener("click", () => {
    const itemSchedule = listSchedule.querySelector(".inner-schedule-item");
    const itemClone = itemSchedule.cloneNode(true);
    itemClone.querySelector("input").value = "";
    const boxBody = itemClone.querySelector(".inner-schedule-body");
    const id = `mce_${Date.now()}`;
    boxBody.innerHTML = `<textarea id="${id}" textarea-mce></textarea>`
    listSchedule.appendChild(itemClone);
    initTinyMCE(`#${id}`);
  })
  //xem thêm, xóa
  listSchedule.addEventListener("click", (event) => {
    if(event.target.closest(".inner-more")){
      const itemSchedule = event.target.closest(".inner-schedule-item")
      // itemSchedule.classList.toggle();
      if(itemSchedule.classList.contains("hidden")){
        itemSchedule.classList.remove("hidden");
        itemSchedule.querySelector(".inner-more i").setAttribute("class", "fa-solid fa-angle-down");
      }else {
        itemSchedule.classList.add("hidden");
        itemSchedule.querySelector(".inner-more i").setAttribute("class", "fa-solid fa-angle-up");
      }
    }

    if(event.target.closest(".inner-remove")){
      const itemSchedule = event.target.closest(".inner-schedule-item")
      const totalItem = listSchedule.querySelectorAll(".inner-schedule-item").length;
      if(totalItem > 1){
        itemSchedule.remove();
      }
    }
  })
  //kéo thả
  new Sortable(listSchedule, {
    handle: '.inner-move',
    animation: 150,

    onStart: function (event) {
      const textarea = event.item.querySelector("[textarea-mce]");
      const id = textarea.id;
      tinymce.get(id).remove();
    },

    onEnd: function (event) {
      const textarea = event.item.querySelector("[textarea-mce]");
      const id = textarea.id;
      initTinyMCE(`#${id}`);
    },

    });
}
// end createSchedule

// sortable
// new Sortable(document, {
//     handle: '.handle', // handle's class
//     animation: 150
// });
// end sortable

// filepond
const listInput = document.querySelectorAll('[filepond-image]');
let filePond = {};
if(listInput.length > 0) {
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginFileValidateType);

  listInput.forEach(item => {
    const files = []
    const imageDefault = item.getAttribute("image-default");
    if(imageDefault){
      files.push({
        source: imageDefault, //đường dẫn ảnh
      })
    }
    filePond[item.name] = FilePond.create(item, {
      labelIdle: "+",
      files: files,
    });
  })
}
// end filepond

// chartjs
const boxChart = document.querySelector(".inner-chart");
if(boxChart){
  const ctx = boxChart.querySelector('#revenueChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        datasets: [
        {
          label: 'Tháng Trước',
          data: [1250000, 1420000, 1360000, 1580000, 1490000, 1710000, 1640000, 1820000, 1760000, 1930000, 1870000, 2050000, 1980000, 2140000, 2090000, 2270000, 2210000, 2390000, 2330000, 2480000, 2420000, 2610000, 2540000, 2720000, 2660000, 2850000, 2790000, 2960000, 2890000, 3080000],
          borderColor: "#FF5E8E",
          backgroundColor: "#FF5E8E",
          borderWidth: 1.5,
        },
        {
          label: 'Tháng này',
          data: [1480000, 1550000, 1490000, 1680000, 1620000, 1810000, 1750000, 1940000, 1870000, 2060000, 1990000, 2180000, 2120000, 2290000, 2230000, 2410000, 2360000, 2530000, 2470000, 2660000, 2590000, 2780000, 2710000, 2890000, 2830000, 3020000, 2960000, 3150000, 3090000, 3280000],
          borderColor: "#94CFF5",
          backgroundColor: "#94CFF5",
          borderWidth: 1.5,
        }
      ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Ngày'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Doanh Thu (VNĐ)'
            },
          }
        }
      },
    });
}
// end chartjs

// categoryCreateForm
const categoryCreateForm = document.querySelector("#categoryCreateForm");
if(categoryCreateForm){
  const validator = new JustValidate(categoryCreateForm);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!',
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      const description = tinymce.get("description").getContent();
      
      const formData = new FormData();
      formData.append("name" ,name);
      formData.append("parent" ,parent);
      formData.append("position" ,position);
      formData.append("status" ,status);
      formData.append("avatar" ,avatar);
      formData.append("description" ,description);

      fetch(`/${pathAdmin}/category/create`, {
        method: "POST",
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          drawNotyf(data.code, data.message);
          window.location.reload();
        }
      })
    })
}
// end categoryCreateForm

// categoryEditForm
const categoryEditForm = document.querySelector("#categoryEditForm");
if(categoryEditForm){
  const validator = new JustValidate(categoryEditForm);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!',
      },
    ])
    .onSuccess((event) => {
      const id = event.target.id.value;
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      const description = tinymce.get("description").getContent();
      
      const formData = new FormData();
      formData.append("name" ,name);
      formData.append("parent" ,parent);
      formData.append("position" ,position);
      formData.append("status" ,status);
      formData.append("avatar" ,avatar);
      formData.append("description" ,description);

      fetch(`/${pathAdmin}/category/edit/${id}`, {
        method: "PATCH",
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          notyf.success(data.message);
        }
      })
    })
}
// end categoryEditForm

// tourCreateForm
const tourCreateForm = document.querySelector("#tourCreateForm");
if(tourCreateForm){
  const validator = new JustValidate(tourCreateForm);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên tour!',
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      const priceAdult = event.target.priceAdult.value;
      const priceChildrent = event.target.priceChildrent.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildrent = event.target.priceNewChildrent.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildrent = event.target.stockChildrent.value;
      const stockBaby = event.target.stockBaby.value;
      const location = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedule = [];
      // location
      const listLocationChecked = document.querySelectorAll(`[name="locations"]:checked`);
      listLocationChecked.forEach(input => {
        location.push(input.value);
      })
      // end location

      // list schedule
      const listSchedule = document.querySelectorAll(".inner-schedule .inner-schedule-item");
      listSchedule.forEach(item => {
        const inputTitle = item.querySelector(".inner-schedule-head input");
        const title = inputTitle.value;
        const textarea = item.querySelector(".inner-schedule-body textarea");
        const id = textarea.id;
        const contentSchedule = tinymce.get(id).getContent();
        schedule.push({
          title: title,
          content: contentSchedule
        })
      })
      // end list schedule

      console.log(name)
      console.log(category)
      console.log(position)
      console.log(status)
      console.log(avatar)
      console.log(priceAdult)
      console.log(priceChildrent)
      console.log(priceBaby)
      console.log(priceNewAdult)
      console.log(priceNewChildrent)
      console.log(priceNewBaby)
      console.log(stockAdult)
      console.log(stockChildrent)
      console.log(stockBaby)
      console.log(location)
      console.log(time)
      console.log(vehicle)
      console.log(departureDate)
      console.log(information)
      console.log(schedule)
    })
}
// end tourCreateForm

// orderEditForm
const orderEditForm = document.querySelector("#orderEditForm");
if(orderEditForm){
  const validator = new JustValidate(orderEditForm);

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
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;
      console.log(fullName)
      console.log(phone)
      console.log(note)
      console.log(paymentMethod)
      console.log(paymentStatus)
      console.log(status)
    })
}
// end orderEditForm

// settingWebsiteInfoForm
const settingWebsiteInfoForm = document.querySelector("#settingWebsiteInfoForm");
if(settingWebsiteInfoForm){
  const validator = new JustValidate(settingWebsiteInfoForm);
  
  validator
  .addField('#email', [
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const websiteName = event.target.websiteName.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logo = filePond.logo.getFile()?.file || null;
      const favicon = filePond.favicon.getFile()?.file || null;
      console.log(websiteName)
      console.log(phone)
      console.log(email)
      console.log(address)
      console.log(logo)
      console.log(favicon)
    })
  }
// end settingWebsiteInfoForm

// settingAccountAdminCreate
const settingAccountAdminCreate = document.querySelector("#settingAccountAdminCreate");
if(settingAccountAdminCreate){
  const validator = new JustValidate(settingAccountAdminCreate);

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Tối thiểu 5 ký tự',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Tối đa 50 ký tự',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu',
      },
      {
        rule: 'strongPassword',
        errorMessage: (value) => {
          let html = ``;
          if(value.length < 8){
            html += `
              <div>Mật khẩu cần tối thiểu 8 ký tự<div>
            `
          }
          if(!/[A-Z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết hoa<div>
            `
          }
          if(!/[a-z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết thường<div>
            `
          }
          if(!/[0-9]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ số<div>
            `
          }
          if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 ký tự đặc biệt<div>
            `
          }
          return html;
        }
      }
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const role = event.target.role.value;
      const positionCompany = event.target.positionCompany.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      console.log(fullName)
      console.log(email)
      console.log(phone)
      console.log(role)
      console.log(positionCompany)
      console.log(status)
      console.log(password)
      console.log(avatar)
    })
}
// end settingAccountAdminCreate

// settingRoleCreateForm
const settingRoleCreateForm = document.querySelector("#settingRoleCreateForm");
if(settingRoleCreateForm){
  const validator = new JustValidate(settingRoleCreateForm);
  
  validator
  .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên nhóm quyền!',
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const description = event.target.description.value;
      const role = [];

      //permission
      const listRoleChecked = document.querySelectorAll(`[name="permissions"]:checked`);
      listRoleChecked.forEach(input => {
        role.push(input.value);
      })
      // end permission
      
      console.log(name)
      console.log(description)
      console.log(role)
    })
  }
// end settingRoleCreateForm

// profileEditForm
const profileEditForm = document.querySelector("#profileEditForm");
if(profileEditForm){
  const validator = new JustValidate(profileEditForm);

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Tối thiểu 5 ký tự',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Tối đa 50 ký tự',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      console.log(fullName)
      console.log(email)
      console.log(phone)
      console.log(avatar)
    })
}
// end profileEditForm

// profileChangePasswordForm
const profileChangePasswordForm = document.querySelector("#profileChangePasswordForm");

if(profileChangePasswordForm){
  const validator = new JustValidate(profileChangePasswordForm);

  validator
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        rule: 'strongPassword',
        errorMessage: (value) => {
          let html = ``;
          if(value.length < 8){
            html += `
              <div>Mật khẩu cần tối thiểu 8 ký tự<div>
            `
          }
          if(!/[A-Z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết hoa<div>
            `
          }
          if(!/[a-z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết thường<div>
            `
          }
          if(!/[0-9]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ số<div>
            `
          }
          if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 ký tự đặc biệt<div>
            `
          }
          return html;
        }
      }
    ])
    .addField('#confirmPassword', [
      {
        rule: 'required',
        errorMessage: 'Hãy nhập lại mật khẩu',
        
      },
      {
        validator: (value, context) => value==context["#password"].elem.value,
        errorMessage: 'Mật khẩu nhập lại không trùng khớp!',
      }
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      console.log(password)
    })
}
// end profileChangePasswordForm

// button delete
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Vui lòng xác nhận xóa!");
      const dataApi = button.getAttribute("data-api");
      console.log(dataApi);
      if(!isConfirm) return;
      fetch(dataApi,{
        method: "PATCH",
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notyf.error(data.message);
          }
          if(data.code == "success") {
            drawNotyf(data.code, data.message);
            window.location.reload();
          }
        })
    })
  })
}
// end button delete