$("#loginForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        email:$("#loginEmail").val(),
        password:$("#loginPassword").val()
    }
    // console.log(userObj);
    $.ajax({
        url:"/auth/login",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log(data);
        alert('logged in!');
        location.href = "/clubhouse"
    }).fail(function(err){
        console.log(err);
        alert("something went wrong!")
        location.reload();
    })
})