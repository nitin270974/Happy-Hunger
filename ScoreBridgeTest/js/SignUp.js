function submitUser()
{
    const mobile =
        document.getElementById("mobileNumber")
        .value
        .trim();
    const name =
        document.getElementById("userName")
        .value
        .trim();
    const message =
        document.getElementById("message");
    // Check name
    if(name === "")
    {
        message.style.color = "red";
        message.innerHTML = "Please enter your name.";
        return;
    }
    // Check mobile number
    if(!/^[0-9]{10}$/.test(mobile))
    {
        message.style.color = "red";
        message.innerHTML =
            "Please enter a valid 10 digit mobile number.";
        return;
    }
    // Store user information
    const user = {
        mobile: mobile,
        name: name
    };
            /*
            Save verified user information
            for exam.html
            */
            sessionStorage.setItem(
                "examUserMobile",
                mobile
            );
            sessionStorage.setItem(
                "examUserName",
                name
            );
    console.log("Saved User:", user);
            /*
            Redirect to exam
            */
            window.location.href =
                "examsimulator.html";
}