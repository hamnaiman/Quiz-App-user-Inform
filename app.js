function registration(event) {
    event.preventDefault(); // Prevent the default form submission

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phoneNumber = document.getElementById("phoneNumber");
    var password = document.getElementById("password");
    var cpassword = document.getElementById("cpassword");

    // Password validation regex
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    // Check if passwords match
    if (password.value !== cpassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords should be the same!',
        });
    } else if (!regex.test(password.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            html: `Your password must meet the following criteria:<br>
                   - At least one lowercase letter (a-z)<br>
                   - At least one uppercase letter (A-Z)<br>
                   - At least one numeric digit (0-9)<br>
                   - At least one special character (@, $, ., #, !, %, *, ?, &, ^)<br>
                   - Length must be between 8 and 15 characters`,
        });
    } else {
        var userData = {
            name: name.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: `Welcome, ${name.value}! You will be redirected shortly.`,
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            window.location.href = "./dashboard.html"; // Redirect after 2 seconds
        });
    }
}

function getLocalData() {
    var getData = localStorage.getItem("userData");
    var parseData = JSON.parse(getData);
    var getLocalDataDiv = document.getElementById("getLocalDataDiv");
    if (parseData) {
        getLocalDataDiv.innerHTML = `
         <ul>
            <li>Name: ${parseData.name}</li>
            <li>Email: ${parseData.email}</li>
            <li>Phone Number: ${parseData.phoneNumber}</li>
         </ul>
        `;
    }
}
getLocalData();

function redirect() {
    window.location.href = "./index.html";
}

function login(event) {
    event.preventDefault(); // Prevent the default form submission
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var getData = localStorage.getItem("userData");
    var parseData = JSON.parse(getData);

    if (!parseData) {
        Swal.fire({
            icon: 'error',
            title: 'No user found!',
            text: 'Please sign up first.',
        });
        return;
    }

    if (parseData.email !== email.value) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please check your email.',
        });
    } else if (parseData.password !== password.value) {
        Swal.fire({
            icon: 'error',
            title: 'Incorrect Password',
            text: 'Please try again.',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
        }).then(() => {
            window.location.href = "./dashboard.html"; // Redirect to dashboard
        });
    }
};
//to add keep password seen--
function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const eyeIcon = document.getElementById(`eye-icon-${id}`);
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

