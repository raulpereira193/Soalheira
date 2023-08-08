function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);

  localStorage.setItem("fullName", data.name);
  localStorage.setItem("givenName", data.given_name);
  localStorage.setItem("familyName", data.family_name);
  localStorage.setItem("email", data.email);

  if (data.email === "projetodai2122@gmail.com") {
    window.open("backoffice/index.html", "_blank");
  }
  
  const prof = JSON.parse(localStorage.getItem("funcionarios"));
  for (let i = 0; i < prof.length; i++) {
    if (data.email === prof[i].email) {
      window.open("backoffice/index.html", "_blank");
      break;
    }
  }
  

  fullName.textContent = data.name;
  //sub.textContent = data.sub;
  given_name.textContent = data.given_name;
  family_name.textContent = data.family_name;
  email.textContent = data.email;
  //verifiedEmail.textContent = data.email_verified;

  // Set the image source
  picture.setAttribute("src", data.picture);

  // Convert the image to a Base64 string
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0, 0);
    const base64String = canvas.toDataURL("image/png");
    localStorage.setItem("profilePicture", base64String);
  };
  img.src = data.picture;
}

window.onload = function () {
  // Check if profile picture is in local storage
  const profilePicture = localStorage.getItem("profilePicture");
  if (profilePicture) {
    // If it is, set the picture source to the Base64 string
    document.getElementById("picture").setAttribute("src", profilePicture);
  }

  google.accounts.id.initialize({
    client_id: "619090204080-ikl8gstj5pip0gme50nvlhd52j8410t6.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"), {
    theme: "filled_black",
    size: "large",
    type: "standard",
    shape: "pill",
    locale: "pt-PT",
    logo_alignment: "left",
  } // customization attributes
  );
}