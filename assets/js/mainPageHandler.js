$(document).ready(function () {
    const repoOwner = "smetbz";
    const repoName = "smetbz.github.io";
    const filterLabel = "BLOG"

    const allowedJsonUrl = "https://cdn.jsdelivr.net/gh/smetbz/smetbz.github.io@main/allowedList.json";
    const PROXY_URL = `https://api.smtu.ir/github/`;
    const BRIDGE_URL = `https://api.smtu.ir/bridge/`;

    let filteredIssues = [];

    $.getJSON(allowedJsonUrl,
        function (data) {                               
            
            $.getJSON(`${PROXY_URL}repos/${repoOwner}/${repoName}/issues`,
                function (issuesData, textStatus, jqXHR) {
                   
                    const filtered = issuesData.filter(issue => data.allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === filterLabel));
                    filteredIssues = filteredIssues.concat(filtered);
                    filteredIssues = filteredIssues.slice(0, 3)

                    if(filteredIssues.length === 0) return;

                    filteredIssues.forEach(issue => {

                    const body = issue.body;
                    const result = { title: '', keywords: [] , categories: [], summary: '', content: '' };
                
                    const titleMatch = body.match(/\[ENTER TITLE HERE\]\s*([\s\S]*?)\s*(?=\[ENTER KEYWORDS HERE\])/i);
                    const keywordsMatch = body.match(/\[ENTER KEYWORDS HERE\]\s*([\s\S]*?)\s*(?=\[ENTER CATEGORIES HERE\])/i);
                    const categoriesMatch = body.match(/\[ENTER CATEGORIES HERE\]\s*([\s\S]*?)\s*(?=\[ENTER SUMMARY HERE\])/i);                            
                    const summaryMatch = body.match(/\[ENTER SUMMARY HERE\]\s*([\s\S]*?)\s*(?=\[ENTER CONTENT HERE\])/i);
                    const contentMatch = body.match(/\[ENTER CONTENT HERE\]\s*([\s\S]*)/i);
                    
    
                    if(titleMatch) result.title = titleMatch[1].trim();
                    if(keywordsMatch) result.keywords = keywordsMatch[1].split(",").map(k => k.trim());
                    if(categoriesMatch) result.categories = categoriesMatch[1].split(",").map(k => k.trim());
                    if(summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
                    if(contentMatch) result.content = marked.parse(contentMatch[1]).trim();

                    // <span class="course-badge popular"></span>

                        $("#latest-list").append(`
                             <div class=\"course-card\">
                    <div class=\"course-image\">
                        <img src=\"${extractIssueImage(body)}\" alt=\"${result.title}\">                        
                    </div>
                    <div class="course-content">
                        <div class="course-category">${categoriesInPersian[issue.labels[0].name]}</div>
                        <h3 class="course-title">${result.title}</h3>
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
                                <img src=\"${BRIDGE_URL}avatar/${issue.user.login}\" alt=\"${issue.user.login}\">
                            </div>
                            <span>${issue.user.login}</span>
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

        }
    );
});