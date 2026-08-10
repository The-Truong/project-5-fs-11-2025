// loginForm
const loginForm = document.querySelector("#loginForm");

if(loginForm){
  const validator = new JustValidate(loginForm);

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email !',
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
    ])

    .onSuccess((event) => {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const remember = event.target.rememberPassword.checked;
      console.log(email)
      console.log(password)
      console.log(remember)
    })
}
// end loginForm


// registerForm
const registerForm = document.querySelector("#registerForm");
if(registerForm){
  const validator = new JustValidate(registerForm);

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
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng đồng ý với điều khoản!',
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const agree = event.target.agree.checked;
      console.log(fullName)
      console.log(email)
      console.log(password)
      console.log(agree)
    })
}
// end registerForm

// forgotPassWordForm
const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
if(forgotPasswordForm){
  const validator = new JustValidate(forgotPasswordForm);
  
  validator
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
      const email = event.target.email.value;
      console.log(email)
    })
  }
// end forgotPassWordForm
  
// otpPasswordForm
const otpPasswordForm = document.querySelector("#otpPasswordForm");

if(otpPasswordForm){
  const validator = new JustValidate(otpPasswordForm);
  
  validator
  .addField('#otp', [
    {
      rule: 'required',
      errorMessage: 'Vui lòng nhập otp!',
    },
  ])
  .onSuccess((event) => {
    const otp = event.target.otp.value;
    console.log(otp)
  })
}
// end forgotPassWordForm

// resetPasswordForm
const resetPasswordForm = document.querySelector("#resetPasswordForm");

if(resetPasswordForm){
  const validator = new JustValidate(resetPasswordForm);

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
// end registerForm