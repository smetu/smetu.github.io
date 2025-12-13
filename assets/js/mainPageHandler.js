
async function showLatestBlogs(contents) {

            contents.items.forEach(ct => {           
            
                $("#latest-list").append(`
                     <div class=\"course-card\">
            <div class=\"course-image\">
                <img src=\"${ct.imageLink}\" alt=\"${ct.title}\">                        
            </div>
            <div class="course-content">
                <div class="course-category">${categoriesInPersian[ct.label]}</div>
                <h3 class="course-title">${ct.title}</h3>
                <p class="course-description">${ct.summary}</p>
                <div class="course-meta">
                    <div class="course-info">                                
                        <div class="course-info-item">
                            <i class="far fa-calendar"></i>
                            <span>${ct.updatedAt}</span>
                        </div>
                    </div>
                    <!-- <div class="course-level"></div> -->
                </div>
                <div class="course-instructor">
                    <div class="testimonial-avatar">
                        <img src=\"${ct.user.avatar}\" alt=\"${ct.user.avatar}\">
                    </div>
                    <span>${ct.user.name}</span>
                </div>
                <!-- <div class=\"course-footer\">
                    <div class=\"course-price\">۲۹۰,۰۰۰ تومان</div>
                    <div class=\"course-rating\">
                        <i class=\"fas fa-star\"></i>
                        <span>۴.۹ (۱۲۴)</span>
                    </div>
                </div> -->
                <a href=\"${ct.link}\" class=\"btn btn-primary\">
                    <i class=\"fas fa-eye\"></i>
                    <span>ادامه مطلب</span>
                </a>
            </div>
        </div>
                `)
            });

            $("#weblog-section").fadeIn();
};

async function showCurrentCourse(content) {
                           
    if(content.ended) {
       $("#course-status").text("دوره مجازی اخیر");
    } else {
       $("#course-status").text("دوره مجازی در حال ثبت نام");
    }

    $("#course-title").text(content.title);
    $("#course-small-description").text(content.smallDescription);
    
    if(content.image !== "") {
        $("#course-image-container").show().html(`
            <img src=\"${content.image}\" alt=\"${content.smallDescription}\">
        `);
    }

    $("#course-section").show();
 
};

$(document).ready(function () {  
    
    $.getJSON(`https://api.smetu.ir/upper`,
        function (upper) {
            if(upper.message === "off") return;
            $("#upper-notif-text").text(upper.message);
            $("#upper-notif").show();
        }
    ).fail(function() {                                 
       return;
    });

    $.getJSON(`https://api.smetu.ir/contents/BLOG?per_page=3&page=1`,
        function (content) {           
            showLatestBlogs(content);
        }
    ).fail(function() {
        $("#weblog-section").hide();                          
        return;
    });

    $.getJSON(`https://api.smetu.ir/course`,
        function (content) {           
            showCurrentCourse(content);
        }
    ).fail(function() {
        $("#course-section").hide();                          
        return;
    });    
   
});