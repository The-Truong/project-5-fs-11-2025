// notyf
// khởi tạo
var notyf = new Notyf({
  duration: 2000,
  position: {
    x: 'right',
    y: 'top',
  },
  dismissible: true,
});
//vẽ ra thông báo
const drawNotyf = (code, message) => {
  sessionStorage.setItem("notyf", JSON.stringify({
    code: code,
    message: message,
  }));
}

// in ra thông báo khi load lại trang
let dataNotyf = sessionStorage.getItem("notyf");
if(dataNotyf){
  dataNotyf = JSON.parse(dataNotyf);
  if(dataNotyf.code == "error"){
    notyf.error(dataNotyf.message);
  }
  if(dataNotyf.code == "success"){
    notyf.success(dataNotyf.message);
  }
  sessionStorage.removeItem("notyf");
}
// end notyf