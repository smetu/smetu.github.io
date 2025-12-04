async function showCourseDetails() {
    
    $.getJSON(`${PROXY_URL}repos/${OWNER}/${REPO}/issues`,
        function (issues) {

        const filteredIssues = issues.filter(issue => allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === "COURSE") && !issue.body.includes("(پیشنویس)"));

        if(filteredIssues.length === 0) {
            window.location.href = "/";
        }

        const latestCourseIssue = filteredIssues[filteredIssues.length - 1];

        const body = latestCourseIssue.body;
        
        const courseInfo = {
            title: "",
            settings: "",
            image: "",           
            smallDescription: "",
            longDescription: "",
            time: "",
            price: {
                main: "",
                discount: "",
                other: [],
            },
            sarfasl: [],
            teacher: {
                image: "",
                name: "",
                description: "",                
            }
        };
                    
        const settings = body.match(/\[تنظیمات را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[عکس دوره را زیر این خط آپلود نمایید\])/i);
        const image = body.match(/\[عکس دوره را زیر این خط آپلود نمایید\]\s*([\s\S]*?)\s*(?=\[عکس مدرس را زیر این خط آپلود نمایید\])/i);
        const teacherImage = body.match(/\[عکس مدرس را زیر این خط آپلود نمایید\]\s*([\s\S]*?)\s*(?=\[نام مدرس را زیر این خط وارد نمایید\])/i);
        const teacherName = body.match(/\[نام مدرس را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[توضیحات مدرس را زیر این خط وارد نمایید\])/i);
        const teacherDescription = body.match(/\[توضیحات مدرس را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[توضیحات کوتاه آموزش را زیر این خط وارد نمایید\])/i);
        const smallDescription = body.match(/\[توضیحات کوتاه آموزش را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[توضیحات بلند آموزش را زیر این خط وارد نمایید\])/i);
        const longDescription = body.match(/\[توضیحات بلند آموزش را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[زمان آموزش را زیر این خط وارد نمایید\])/i);
        const time = body.match(/\[زمان آموزش را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[سرفصل ها را زیر این خط وارد نمایید\])/i);
        const sarfaslHa = body.match(/\[سرفصل ها را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[قیمت اصلی را زیر این خط وارد نمایید\])/i);
        const mainPrice = body.match(/\[قیمت اصلی را زیر این خط وارد نمایید\]\s*([\s\S]*?)\s*(?=\[تخفیف را زیر این خط وارد نمایید یا خالی بگذارید\])/i);
        const discount = body.match(/\[تخفیف را زیر این خط وارد نمایید یا خالی بگذارید\]\s*([\s\S]*?)\s*(?=\[قیمت های دیگر را زیر این خط وارد نمایید\])/i);
        const otherPrices = body.match(/\[قیمت های دیگر را زیر این خط وارد نمایید\]\s*([\s\S]*)/i);
        
        courseInfo.title = latestCourseIssue.title
        if(settings) courseInfo.settings = settings[1].trim();
        if(image) courseInfo.image = image[1].trim();
        if(teacherImage) courseInfo.teacher.image = teacherImage[1].trim();
        if(teacherName) courseInfo.teacher.name = teacherName[1].trim();
        if(teacherDescription)courseInfo.teacher.description = teacherDescription[1].trim();
        if(smallDescription) courseInfo.smallDescription = smallDescription[1].trim();
        if(longDescription) courseInfo.longDescription = marked.parse(longDescription[1].trim());
        if(time) courseInfo.time = time[1].trim();
        if(sarfaslHa) courseInfo.sarfasl = sarfaslHa[1].trim().split("\n").map(l => l.trim());
        if(mainPrice) courseInfo.price.main = mainPrice[1].trim();
        if(discount) courseInfo.price.discount = discount[1].trim();
        if(otherPrices) courseInfo.price.other = otherPrices[1].trim().split("\n").map(l => l.trim());

        if(settings.includes("(اتمام)")) {
            $("#button-register").prop("disabled", true);
            $("#button-register-text").text("مهلت ثبت‌نام به پایان رسیده است")
        }

         if(settings.includes("پیشنویس")) {
            window.location.href = "/";
            return;
        }
       

        $("#course-name-breadcumb").text(courseInfo.title);
        $("#course-title-name").text(courseInfo.title);
        $("#course-small-description").text(courseInfo.smallDescription);
        $("#course-title-time").text(courseInfo.time);

        console.log(courseInfo)

        if(courseInfo.image !== "") {
            $("#course-image-container").html(`
                <div class=\"cours_data-course-hero-visual\">
                        <img id=\"course-image\" src=\"${extractIssueImage(courseInfo.image)}\" alt=\"${courseInfo.smallDescription}\">
                        <span class=\"cours_data-course-badge popular\">پرطرفدار!</span>
                    </div>
                `);

            $("#course-image-container").show();
        }

        $("#course-sarfasl-count").text(courseInfo.time);

        courseInfo.sarfasl.forEach(s => {

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

        $("#course-full-content").html(courseInfo.longDescription);
       
        if(courseInfo.price.discount !== "") {
            const priceInNumber = parseInt(courseInfo.price.main);
            const discountInNumber = parseInt(courseInfo.price.discount);           

            const discountedPrice = priceInNumber - (priceInNumber * discountInNumber / 100);

            $("#course-main-price").html(formatIranPrice(discountedPrice)); 
            $("#course-actual-price").show().html(formatIranPrice(priceInNumber));
            $("#course-discount-badge").show().html(discountInNumber + "%");        
        } else {
             $("#course-main-price").html(formatIranPrice(parseInt(courseInfo.price.main))); 
        };

        if(courseInfo.price.other.length !== 0) {
            courseInfo.price.other.forEach(pr => {
                $("#course-others").show().append(`
                    <li class="cours_data-course-feature">
                        <i class="fas fa-dollar"></i>
                        <span>${pr}</span>
                    </li>
                    `);
            });
        };

        $("#course-teacher-image").append(`<img src=\"${extractIssueImage(courseInfo.teacher.image)}\" alt=\"${courseInfo.teacher.name}\">`);
        $("#course-teacher-name").text(courseInfo.teacher.name);
        $("#course-teacher-description").text(courseInfo.teacher.description);
        

        $("#loading-overlay").fadeOut();
        

    }

    ).fail(() => {
        window.location.href = "/";
    });;


};

function formatIranPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

