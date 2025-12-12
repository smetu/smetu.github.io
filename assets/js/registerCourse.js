async function checkCourseStatus() {

    let courseName = "";

    $.getJSON(`https://api.smetu.ir/course`,
        function (courseData) {
        
        if(courseData.error) {
            $(".loading-title").text("دوره آنلاینی در حال حاضر فعال نیست.");
            $(".loading-sub").text("منتظر دوره های بعدی باشید");
            return;
        }

        if(courseData.ended === true) {
            $(".loading-title").text("زمان ثبت نام به اتمام رسیده است.");
            $(".loading-sub").text("منتظر دوره های بعدی باشید");
            return;
        }

        courseName = courseData.title;
                
        $("#register-course-name").val(courseData.title);

        $(".content-contact-form-container").fadeIn();
        $("#loading-overlay").fadeOut();
    });


    $("#content-contact-form").on("submit", (e) => {
        e.preventDefault();
        $(".content-btn-submit").text("...").prop("disabled", true);
        const WEBHOOK_URL = `https://api.smetu.ir/webhook/course-register`;

        const firstName = $("[typeofdata=\"fname\"]").val().trim();
        const lastName = $("[typeofdata=\"lname\"]").val().trim();
        const studentCode = $("[typeofdata=\"stucode\"]").val().trim();
        const phoneNumber = $("[typeofdata=\"phonenum\"]").val().trim();
        const reshte = $("[typeofdata=\"reshte\"]").val().trim();
        const telegramId = $("[typeofdata=\"telg\"]").val().trim();
        const status = $("[typeofdata=\"status\"]").val().trim();
        const description = $("[typeofdata=\"description\"]").val().trim();
        
        $.ajax({
            url: WEBHOOK_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                course_name: courseName,
                first_name: firstName,
                last_name: lastName,
                student_code: studentCode,
                phone_number: phoneNumber,
                reshte: reshte,
                telegram_id: telegramId,
                status: status,
                description: description
            }),
            success: function (data) {
                 if (data.ok === true) {
                    $(".content-btn-submit").text("ثبت نام").prop("disabled", false);
                        Swal.fire({
                            title: 'عملیات موفق!',
                            text: 'کارشناسان ما از طریق تلگرام با شما در تماس خواهند بود.',
                            icon: 'success',
                            confirmButtonText: 'باشه',                           
                            background: '#2f2f2f', 
                            color: '#ffffff',       
                            confirmButtonColor: '#2ea2cc' 
                        });
            }
        },
            error: function (err) {
                console.log("ERR:", err);
            }
        });         


    });
    
    

}