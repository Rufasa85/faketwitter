console.log("clubhouse page")

$("#createBlog").submit(function(event){
    event.preventDefault();
    const blogObj = {
        title:$("#blogTitle").val(),
        body:$("#blogBody").val()
    };
    $.ajax({
        url:"/api/blogs",
        method:"POST",
        data:blogObj
    }).done(function(data){
        console.log(data)
        location.reload();
    }).fail(function(err){
        console.log(err);
        alert("something went wrong")
        location.reload();
    })
})

$(".deleteBlogBtn").click(function(e){
    e.preventDefault();
    $.ajax({
        url:`/api/blogs/${$(this).attr("data-id")}`,
        method:"DELETE"
    }).done(data=>{
        window.location.reload()
    }).fail(err=>{
        alert('something went wrong');
        window.location.reload();
    })
})