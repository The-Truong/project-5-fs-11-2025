
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
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const rememberPassword = event.target.rememberPassword.checked;
      
      const dataFinal = {
        email: email,
        password: password,
        rememberPassword: rememberPassword
      }

      fetch(`/${pathAdmin}/account/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          drawNotyf(data.code, data.message);
          window.location.href = `/${pathAdmin}/dashboard`;
        }
      })
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
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
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
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        rule: 'strongPassword',
        errorMessage: (value) => {
          let html = ``;
          if(value.length < 8){
            html += `
              <div>Mật khẩu cần tối thiểu 8 ký tự!<div>
            `
          }
          if(!/[A-Z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết hoa!<div>
            `
          }
          if(!/[a-z]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ cái viết thường!<div>
            `
          }
          if(!/[0-9]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 chữ số!<div>
            `
          }
          if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)){
            html += `
              <div>Mật khẩu cần tối thiểu 1 ký tự đặc biệt!<div>
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
      
      const dataFinal = {
        fullName: fullName,
        email: email,
        password: password
      }

      fetch(`/${pathAdmin}/account/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          // notyf.success('Đăng ký thành công');
          drawNotyf(data.code, data.message);
          window.location.href = `/${pathAdmin}/account/register-success`;
        }
      })
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
      
      const dataFinal = {
        email: email,
      }

      fetch(`/${pathAdmin}/account/forgot-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          drawNotyf(data.code, data.message);
          window.location.href = `/${pathAdmin}/account/otp-password?email=${email}`;
        }
      })
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
    const email = event.target.email.value;

    const dataFinal = {
      otp: otp,
      email: email,
    }

    fetch(`/${pathAdmin}/account/otp-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataFinal),
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == "error"){
        notyf.error(data.message);
      }
      if(data.code == "success"){
        drawNotyf(data.code, data.message);
        window.location.href = `/${pathAdmin}/account/reset-password`;
      }
    })

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
      
      const dataFinal = {
        password: password,
      }

      fetch(`/${pathAdmin}/account/reset-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error"){
          notyf.error(data.message);
        }
        if(data.code == "success"){
          drawNotyf(data.code, data.message);
          window.location.href = `/${pathAdmin}/dashboard`;
        }
      })
    })
}
// end registerForm