$(document).ready(function () {
    const repoOwner = "smetbz";
    const repoName = "smetbz.github.io"
    const allowedJsonUrl = "https://raw.githubusercontent.com/smetbz/smetbz.github.io/refs/heads/main/allowedList.json";

    const filterLabel = "JOURNAL";
    const perPage = 10;
    const PROXY_URL = `https://api.smtu.ir/github/`;

    let allFilteredIssues = [];
    let currentFiltered = [];

    $.getJSON(allowedJsonUrl,
        async function (data) {

            
            async function fetchAllIssues(page = 1) {
                const issues = await $.getJSON(`${PROXY_URL}repos/${repoOwner}/${repoName}/issues?state=open&per_page=100&page=${page}`)
                
                if(!issues.length) return;

                const filtered = issues.filter(issue => data.allowedList.includes(issue.user.login) && issue.labels.some(l => l.name === filterLabel));
                allFilteredIssues = allFilteredIssues.concat(filtered)

                if(issues.length === 100) await fetchAllIssues(page + 1);
            };

            async function fetchFullNamesAndParse() {
                for (let i = 0; i < allFilteredIssues.length; i++) {
                    const issue = allFilteredIssues[i];
                    const user = await $.getJSON(`${PROXY_URL}users/${issue.user.login}`);
                    issue.user.fullName === user.name || issue.user.login;
                    issue.parsed = parseIssueBody(issue.body || '')
                }
            };

            function parseIssueBody(body) {
                const result = { title: '', summary: '', content: '', keywords: [] };

                const titleMatch = body.match(/\[ENTER TITLE HERE\]\s*([\s\S]*?)\s*(?=\[ENTER SUMMARY HERE\])/i);
                const summaryMatch = body.match(/\[ENTER SUMMARY HERE\]\s*([\s\S]*?)\s*(?=\[ENTER CONTENT HERE\])/i);
                const contentMatch = body.match(/\[ENTER CONTENT HERE\]\s*([\s\S]*?)\s*(?=\[KEYWORDS\])/i);
                const keywordsMatch = body.match(/\[KEYWORDS\]\s*([\s\S]*)/i);

                if(titleMatch) result.title = titleMatch[1].trim();
                if(summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
                if(contentMatch) result.content = marked.parse(contentMatch[1]).trim();
                if(keywordsMatch) result.keywords = keywordsMatch[1].split(",").map(k => k.trim());

                return result;
            };

            function renderPage(pageNum) {
                $("#weblog-container").empty();
                const start = (pageNum - 1) * perPage;
                const end = start + perPage;
                const pageItems = currentFiltered.slice(start, end);

                if(!pageItems.length) { $("#weblog-container").html("<p>No posts found.</p>"); return; }

                pageItems.forEach(issue => {
                    $("#weblog-container").append(`
                        
                        <article class=\"blogs-blog-post\">
                        <div class=\"blogs-post-image\">
                            <img src=\"${extractIssueImage(issue.body)}\" alt="">
                            <span class=\"blogs-post-category\">${categoriesInPersian[issue.labels[0].name]}</span>
                        </div>
                        <div class=\"blogs-post-content\">
                            <div class=\"blogs-post-meta\">
                                <div class=\"blogs-post-meta-item\">
                                    <i class=\"far fa-calendar\"></i>
                                    <span>${toPersianDate(issue.updated_at)}</span>
                                </div>                                
                            </div>
                            <h2 class=\"blogs-post-title\">${issue.parsed.title}</h2>
                            <p class=\"blogs-post-excerpt\">
                               ${issue.parsed.summary}
                            </p>
                            <div class=\"blogs-post-footer\">
                                <div class=\"blogs-post-author\">
                                    <div class=\"blogs-author-avatar\">
                                        <img src=\"${issue.user.avatar_url}\" alt=\"\">
                                    </div>
                                    <div class=\"blogs-author-info\">
                                        <div class=\"blogs-author-name\">${issue.user.login}</div>
                                        <div class=\"blogs-post-date\">بروزرسانی شده در ${toPersianDate(issue.updated_at)}</div>
                                    </div>
                                </div>
                                <a href=\"/journalpost.html?id=${issue.number}\" class=\"blogs-read-more\">
                                    <span>ادامه مطلب</span>
                                    <i class=\"fas fa-arrow-left\"></i>
                                </a>
                            </div>
                        </div>
                    </article>
                        
                        `)

                });
            };

            function renderPagination() {
                const totalPages = Math.ceil(currentFiltered.length / perPage);
                let html = '';
                for(let i=1; i<=totalPages; i++) {
                    html += `<li class="blogs-page-item" data-page=\"${i}\">
                        <a href=\"javascript:void(0)\" class=\"blogs-page-link active\">${i}</a>
                    </li>`;
                };
                $(".blogs-pagination").html(html);
                $(document).on("click", ".blogs-page-item", function(e) {
                    e.preventDefault();
                    
                    renderPage(parseInt($(this).attr("data-page")));
                });
            }

            async function init() {
                await fetchAllIssues();
                await fetchFullNamesAndParse();
                currentFiltered = allFilteredIssues.slice();
                renderPagination();
                renderPage(1);
            }

            init();

            $("#search-blogs").on("input", () => {

                const q = $("#search-blogs").val();
                currentFiltered = allFilteredIssues.filter(issue => (issue.parsed.title || issue.title).includes(q) || (issue.parsed.content || '').includes(q));

                renderPagination();
                renderPage(1);

            });
        }
    );
});