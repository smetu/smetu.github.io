$(document).ready(function () {
    const repoOwner = "smetbz";
    const repoName = "smetbz.github.io";
    const filterLabel = "BLOG"
   

    let filteredIssues = [];

    $.getJSON(`${PROXY_URL}repos/${repoOwner}/${repoName}/issues`,
        function (issuesData) {
           
            const filtered = issuesData.filter(issue => allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === filterLabel) && !issue.body.includes("(پیشنویس)"));
            filteredIssues = filteredIssues.concat(filtered);
            filteredIssues = filteredIssues.slice(0, 3)

            if(filteredIssues.length === 0) return;

            filteredIssues.forEach(issue => {

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

            
        }
    ).fail(function() {
        $("#weblog-section").hide();                          
       return;
    });
   
});