$("#signupForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        name:$("#signupName").val(),
        email:$("#signupEmail").val(),
        password:$("#signupPassword").val()
    }
    // console.log(userObj);
    $.ajax({
        url:"/auth/signup",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log('data');
        alert('sign up worked!')
        location.href = "/login"
    }).fail(function(err){
        console.log(err);
        alert("something went wrong!")
        location.reload();
    })
})