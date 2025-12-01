async function initBlog({
    containerSelector = "#weblog-container",
    paginationSelector = ".blogs-pagination",
    searchSelector = "#search-blogs",
    categoriesContainerSelector = "#category-list",
    repoOwner,
    repoName,
    filterLabel = "BLOG",
    perPage = 10,         
    defaultImage = "/assets/images/default.png",
    urlOfPost
}) {

    let allFilteredIssues = [];
    let currentFiltered = [];

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get("category");    
   
    async function fetchAllIssues(page = 1) {
        try {
            const issues = await $.getJSON(`${PROXY_URL}repos/${repoOwner}/${repoName}/issues?state=open&per_page=100&page=${page}`);
            if (!issues.length) return;

            const filtered = issues.filter(issue =>
                allowedList.includes(issue.user.login) &&
                issue.labels.some(l => l.name === filterLabel) && !issue.body.includes("(پیشنویس)")
            );

            allFilteredIssues = allFilteredIssues.concat(filtered);

            if (issues.length === 100) await fetchAllIssues(page + 1);

        } catch (err) {
            console.error("Error fetching issues:", err);
        }
    }
    
    async function fetchFullNamesAndParse() {
        for (let issue of allFilteredIssues) {
            try {
                const user = await $.getJSON(`${PROXY_URL}users/${issue.user.login}`);
                issue.user.fullName = user.name || issue.user.login;
            } catch (err) {
                console.error(`Error fetching user ${issue.user.login}:`, err);
                issue.user.fullName = issue.user.login;
            }
            issue.parsed = parseIssueBody(issue.body || '');
        }
    }

    function parseIssueBody(body) {
        const result = { keywords: [], categories: [], summary: '', content: '' };

        const keywordsMatch = body.match(/\[کلمات کلیدی را زیر این خط وارد کنید و با خط تیره جدا نمایید\]\s*([\s\S]*?)\s*(?=\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\])/i);
        const categoriesMatch = body.match(/\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\]\s*([\s\S]*?)\s*(?=\[خلاصه مطلب را زیر این خط وارد کنید\])/i);                            
        const summaryMatch = body.match(/\[خلاصه مطلب را زیر این خط وارد کنید\]\s*([\s\S]*?)\s*(?=\[محتوای پست را زیر این خط وارد نمایید\])/i);
        const contentMatch = body.match(/\[محتوای پست را زیر این خط وارد نمایید\]\s*([\s\S]*)/i);

        
        if (keywordsMatch) result.keywords = keywordsMatch[1].split("-").map(k => k.trim());
        if (categoriesMatch) result.categories = categoriesMatch[1].split("-").map(k => k.trim());
        if (summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
        if (contentMatch) result.content = marked.parse(contentMatch[1]).trim();

        return result;
    }

    function filterByCategory(issues, category) {
        if (!category) return issues;
        return issues.filter(issue => issue.parsed.categories.includes(category));
    }

    // Broken image fallback
    function getImageWithFallback(src) {
        return `<img src="${src}" alt="" onerror="this.onerror=null;this.src='${defaultImage}';">`;
    }

    function renderPage(pageNum) {
        $(containerSelector).empty();
        const start = (pageNum - 1) * perPage;
        const end = start + perPage;
        const pageItems = currentFiltered.slice(start, end);

        if (!pageItems.length) {
            $(containerSelector).html("<h2>هیچ پستی نیست!</h2>");
            return;
        }
    
        pageItems.forEach(issue => {

            if(issue.body.includes("(پیشنویس)")) return;

            let userName = { name: "", avatar: "" };
            if(issue.body.includes("(مدیر)")) {
                userName.name = "انجمن علمی مهندسی ساخت و تولید";
                userName.avatar = `/assets/images/logos/icon_sme_small.png`;
            } else {
                userName.name = issue.user.fullName;
                userName.avatar = `${BRIDGE_URL}avatar/${issue.user.login}`;
            }

            

            $(containerSelector).append(`
                <article class="blogs-blog-post">
                    <div class="blogs-post-image">
                        ${getImageWithFallback(extractIssueImage(issue.body))}
                        <span class="blogs-post-category">${categoriesInPersian[issue.labels[0].name] || issue.labels[0].name}</span>
                    </div>
                    <div class="blogs-post-content">
                        <div class="blogs-post-meta">
                            <div class="blogs-post-meta-item">
                                <i class="far fa-calendar"></i>
                                <span>${toPersianDate(issue.updated_at)}</span>
                            </div>
                        </div>
                        <h2 class="blogs-post-title">${issue.title}</h2>
                        <p class="blogs-post-excerpt">${issue.parsed.summary}</p>
                        <div class="blogs-post-footer">
                            <div class="blogs-post-author">
                                <div class="blogs-author-avatar">
                                    <img src="${userName.avatar}" alt="${userName.name}" onerror="this.onerror=null;this.src='${defaultImage}';">
                                </div>
                                <div class="blogs-author-info">
                                    <div class="blogs-author-name">${userName.name}</div>
                                    <div class="blogs-post-date">بروزرسانی شده در ${toPersianDate(issue.updated_at)}</div>
                                </div>
                            </div>
                            <a href="${urlOfPost}.html?id=${issue.number}" class="blogs-read-more">
                                <span>ادامه مطلب</span>
                                <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                    </div>
                </article>
            `);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(currentFiltered.length / perPage);
        let html = '';
        for (let i = 1; i <= totalPages; i++) {
            // if (i === 1) {
                html += `<li class="blogs-page-item" data-page="${i}">
                <a href="javascript:void(0)" class="blogs-page-link">${i}
                </a></li>`;
           // } else html += `<li class="blogs-page-item" data-page="${i}">
           // <a href="javascript:void(0)" class="blogs-page-link">${i}</a>
           // </li>`
        }
        $(paginationSelector).html(html);

        $(document).off("click", ".blogs-page-item");
        $(document).on("click", ".blogs-page-item", function (e) {
            e.preventDefault();
          //  console.log(this)
         //   $(".blogs-page-item > a.blogs-page-link").removeClass("active");
         //   $(this).addClass("active");
            renderPage(parseInt($(this).attr("data-page")));
        });
    }

    // Categories + counts
    function getCategoriesWithCount(issues) {
        const categoryMap = {};
        issues.forEach(issue => {
            if (issue.parsed.categories && issue.parsed.categories.length) {
                issue.parsed.categories.forEach(cat => {
                    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
                });
            }
        });
        return Object.keys(categoryMap).map(catName => ({
            name: catName,
            count: categoryMap[catName]
        }));
    }

    function renderCategories() {
        if (!categoriesContainerSelector || !allFilteredIssues.length) return;

        const categories = getCategoriesWithCount(allFilteredIssues);
        const container = $(categoriesContainerSelector);
        container.empty();

        if(categories.length === 0) {
            container.hide();
            return;
        }

        categories.forEach(cat => {
            container.append(`
                <li class="blogs-category-item">
                                <a href="?category=${encodeURIComponent(cat.name)}" class="blogs-category-link">
                                    <span>${cat.name}</span>
                                    <span class="blogs-category-count">${cat.count}</span>
                                </a>
                            </li>                
            `);
        });
    }

    // Initialize
    async function init() {
        await fetchAllIssues();
        await fetchFullNamesAndParse();

        renderCategories();

        currentFiltered = filterByCategory(allFilteredIssues, categoryFilter);
        renderPagination();
        renderPage(1);

        $("#loading-overlay").fadeOut();
    }

    init().catch(err => console.error("InitBlog error:", err));
    
    $(searchSelector).on("input", () => {
        const q = $(searchSelector).val();
        currentFiltered = filterByCategory(allFilteredIssues, categoryFilter)
            .filter(issue =>
                issue.title.includes(q) ||
                (issue.parsed.content || '').includes(q)
            );
        renderPagination();
        renderPage(1);
    });

}