let userdata={};

const Token=generateToken();

function isAuthenticated(){
   return localStorage.getItem("accessToken") !== null;
 }

function SignUp(){
    let name=document.getElementById("name").value;

    let email=document.getElementById("email").value;

    let password=document.getElementById("password").value;

    let confirm_pass=document.getElementById("confirm-pass").value;

    let message=document.getElementById("message");

    userdata={
      name: name,
      email: email,
      password: password,
      accessToken: Token,
    }
   
    localStorage.setItem('userdata', JSON.stringify(userdata));

    if(name=='' || email=='' || password=='' || confirm_pass=='')
     {
        message.innerText="Error : All the fields are mandatory";
        message.style.color="red";
        message.style.display="block";
     }
     else if(password!==confirm_pass)
     {
        message.innerText="Error : Confirm password dosen't match";
        message.style.color="red";
        message.style.display="block";
     }
     else
     {
        message.innerText="Successfully Signed Up!";
        message.style.color="green";
        message.style.display="block";

        setTimeout(()=>{
            window.location.href="profile.html";
        },3000)
     }
}

DisplayResult();

function DisplayResult(){
   const userData=JSON.parse(localStorage.getItem('userdata'));

   let Name=document.getElementById("display-name");
   Name.innerText=`${userData.name}`;

   let email=document.getElementById("display-email");
   email.innerText=`${userData.email}`;

   let pass=document.getElementById("display-pass");
   pass.innerText=`${userData.password}`;
}

function Logout(){
    window.location.href="index.html";
    localStorage.removeItem('userdata');
}

function generateToken(length=10){
   const newToken=new Uint8Array(length);
   crypto.getRandomValues(newToken);

   const token=Array.from(newToken, byte =>byte.toString(16).padStart(2,'0')).join('');
   return token;
}