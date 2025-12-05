async function checkCourseStatus() {

    let courseName = "";

    $.getJSON(`${PROXY_URL}repos/${OWNER}/${REPO}/issues`,
        function (issues) {

        const filteredIssues = issues.filter(issue => allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === "COURSE") && !issue.body.includes("(پیشنویس)"));

        if(filteredIssues.length === 0) {
            $(".loading-title").text("دوره آنلاینی در حال حاضر فعال نیست.");
            $(".loading-sub").text("منتظر دوره های بعدی باشید");
            return;
        }

        const latestCourseIssue = filteredIssues[filteredIssues.length - 1];

        if(latestCourseIssue.body.includes("(اتمام)")) {
            $(".loading-title").text("زمان ثبت نام به اتمام رسیده است.");
            $(".loading-sub").text("منتظر دوره های بعدی باشید");
            return;
        }
        
        courseName = latestCourseIssue.title;
        $("#register-course-name").val(latestCourseIssue.title);

        $(".content-contact-form-container").fadeIn();
        $("#loading-overlay").fadeOut();
    });


    $("#content-contact-form").on("submit", (e) => {
        e.preventDefault();
        $(".content-btn-submit").text("...").prop("disabled", true);
        const WEBHOOK_URL = `https://webhook.smetu.ir/social`;

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
                    $("#content-success-message").text("Successful").show();
            }
        },
            error: function (err) {
                console.log("ERR:", err);
            }
        });         


    });
    
    

}