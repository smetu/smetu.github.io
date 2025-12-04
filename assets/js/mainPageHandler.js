
async function showLatestBlogs(issuesData) {

 let filteredBlogs = [];
 const blogLabel = "BLOG";
 const filteredForBlog = issuesData.filter(issue => allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === blogLabel) && !issue.body.includes("(پیشنویس)"));
            filteredBlogs = filteredBlogs.concat(filteredForBlog);
            filteredBlogs = filteredBlogs.slice(0, 3)

            if(filteredBlogs.length === 0) return;

            filteredBlogs.forEach(issue => {

            const body = issue.body;
            const result = { keywords: [] , categories: [], summary: '', content: '' };
        
            const keywordsMatch = body.match(/\[کلمات کلیدی را زیر این خط وارد کنید و با خط تیره جدا نمایید\]\s*([\s\S]*?)\s*(?=\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\])/i);
            const categoriesMatch = body.match(/\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\]\s*([\s\S]*?)\s*(?=\[خلاصه مطلب را زیر این خط وارد کنید\])/i);                            
            const summaryMatch = body.match(/\[خلاصه مطلب را زیر این خط وارد کنید\]\s*([\s\S]*?)\s*(?=\[محتوای پست را زیر این خط وارد نمایید\])/i);
            const contentMatch = body.match(/\[محتوای پست را زیر این خط وارد نمایید\]\s*([\s\S]*)/i);
                       
            if(keywordsMatch) result.keywords = keywordsMatch[1].split("-").map(k => k.trim());
            if(categoriesMatch) result.categories = categoriesMatch[1].split("-").map(k => k.trim());
            if(summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
            if(contentMatch) result.content = marked.parse(contentMatch[1]).trim();

            let userName = { name: "", avatar: "" };
            if(issue.body.includes("(مدیر)")) {
                userName.name = "انجمن علمی مهندسی ساخت و تولید";
                userName.avatar = `/assets/images/logos/icon_sme_small.png`;
            } else {
                userName.name = issue.user.login;
                userName.avatar = `${BRIDGE_URL}avatar/${issue.user.login}`;
            }

            // <span class="course-badge popular"></span>

                $("#latest-list").append(`
                     <div class=\"course-card\">
            <div class=\"course-image\">
                <img src=\"${extractIssueImage(body)}\" alt=\"${result.title}\">                        
            </div>
            <div class="course-content">
                <div class="course-category">${categoriesInPersian[issue.labels[0].name]}</div>
                <h3 class="course-title">${issue.title}</h3>
                <p class="course-description">${result.summary}</p>
                <div class="course-meta">
                    <div class="course-info">                                
                        <div class="course-info-item">
                            <i class="far fa-calendar"></i>
                            <span>${toPersianDate(issue.updated_at)}</span>
                        </div>
                    </div>
                    <!-- <div class="course-level"></div> -->
                </div>
                <div class="course-instructor">
                    <div class="testimonial-avatar">
                        <img src=\"${userName.avatar}\" alt=\"${userName.name}\">
                    </div>
                    <span>${userName.name}</span>
                </div>
                <!-- <div class=\"course-footer\">
                    <div class=\"course-price\">۲۹۰,۰۰۰ تومان</div>
                    <div class=\"course-rating\">
                        <i class=\"fas fa-star\"></i>
                        <span>۴.۹ (۱۲۴)</span>
                    </div>
                </div> -->
                <a href=\"/blogpost.html?id=${issue.number}\" class=\"btn btn-primary\">
                    <i class=\"fas fa-eye\"></i>
                    <span>ادامه مطلب</span>
                </a>
            </div>
        </div>
                `)
            });

            $("#weblog-section").fadeIn();
};

async function showCurrentCourse(issuesData) {

    const courseLabel = "COURSE";
    const filteredCourse = issuesData.filter(issue => allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === courseLabel) && !issue.body.includes("(پیشنویس)"))[0];
    if(!filteredCourse) return;

    const body = filteredCourse.body;
        
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
        
        courseInfo.title = filteredCourse.title
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


    if(courseInfo.settings.includes("(اتمام)")) {
       $("#course-status").text("دوره مجازی اخیر");
    } else {
       $("#course-status").text("دوره مجازی در حال ثبت نام");
    }

    $("#course-title").text(courseInfo.title);
    $("#course-small-description").text(courseInfo.smallDescription);
    
    if(courseInfo.image !== "") {
        $("#course-image-container").show().html(`
            <img src=\"${extractIssueImage(courseInfo.image)}\" alt=\"${courseInfo.smallDescription}\">
        `);
    }

    $("#course-section").show();

    console.log(filteredCourse)

};

$(document).ready(function () {    

    $.getJSON(`${PROXY_URL}repos/${OWNER}/${REPO}/issues`,
        function (issuesData) {
           
            showLatestBlogs(issuesData);

            showCurrentCourse(issuesData);


            
        }
    ).fail(function() {
        $("#weblog-section").hide();                          
       return;
    });

    
   
});