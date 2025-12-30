async function showLoadingBox(title, html, showOrHide, blurLevel) {

    $(".loading-title").text(title);
    $(".loading-sub").html(html);

    if(showOrHide === true) {
        $("#loading-overlay").show();
    }

    if(showOrHide === false) {
        $("#loading-overlay").hide();
    }

    if(blurLevel) {
        $("#loading-overlay").css({'backdrop-filter': `blur(${blurLevel}px)`});
    }
}

async function showCourseDetails() {

    $.getJSON(`https://api.smetu.ir/course`,
        function (courseData) {
            if(courseData.error) {
                showLoadingBox("آموزش فعالی وجود ندارد!", `بازگشت به  <a href="/">صفحه اصلی</a>`, true, 20);
                return;                
            }


            $("#course-name-breadcumb").text(courseData.title);
            $("#course-title-name").text(courseData.title);
            $("#course-small-description").text(courseData.smallDescription);
            $("#course-title-time").text(courseData.time);

            if(courseData.image !== "") {
                $("#course-image-container").html(`
                    <div class=\"cours_data-course-hero-visual\">
                            <img id=\"course-image\" src=\"${courseData.image}\" alt=\"${courseData.smallDescription}\">
                            <span class=\"cours_data-course-badge popular\">پرطرفدار!</span>
                        </div>
                `);

                $("#course-image-container").show();
            }

            $("#course-sarfasl-count").text(courseData.time);

            courseData.sarfasl.forEach(s => {

                $("#sarfasl-container").append(`
                    <li class="cours_data-lesson-item">
                        <div class="cours_data-lesson-info">
                                <div class="cours_data-lesson-icon">
                                    <i class="fas fa-book"></i>
                                </div>
                            <div class="cours_data-lesson-title">${s}</div>
                        </div>                                           
                    </li>
                `);

            });

            $("#course-full-content").html(courseData.longDescription);
       
            if(courseData.price.discount !== "") {
                const priceInNumber = parseInt(courseData.price.main);
                const discountInNumber = parseInt(courseData.price.discount);           

                const discountedPrice = priceInNumber - (priceInNumber * discountInNumber / 100);

                $("#course-main-price").html(formatIranPrice(discountedPrice)); 
                $("#course-actual-price").show().html(formatIranPrice(priceInNumber));
                $("#course-discount-badge").show().html(discountInNumber + "%");        
            } else {
                $("#course-main-price").html(formatIranPrice(parseInt(courseData.price.main))); 
            };

            if(courseData.price.other.length !== 0) {
                courseData.price.other.forEach(pr => {
                    $("#course-others").show().append(`
                        <li class="cours_data-course-feature">
                            <i class="fas fa-dollar"></i>
                            <span>${pr}</span>
                        </li>
                    `);
                });
            };

            $("#course-teacher-image").append(`<img src=\"${courseData.teacher.image}\" alt=\"${courseData.teacher.name}\">`);
            $("#course-teacher-name").text(courseData.teacher.name);
            $("#course-teacher-description").text(courseData.teacher.description);
        

            $("#loading-overlay").fadeOut();
        }
    ).fail(() => {
        showLoadingBox("آموزش فعالی وجود ندارد!", `بازگشت به  <a href="/">صفحه اصلی</a>`, true, 20);
        return;
    });
    

};



