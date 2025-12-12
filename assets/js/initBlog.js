async function initBlog({
    containerSelector = "#weblog-container",
    paginationSelector = ".blogs-pagination",
    searchSelector = "#search-blogs",
    categoriesContainerSelector = "#catsofblog",    
    filterLabel = "BLOG",
    perPage = 10,        
    defaultImage = "/assets/images/default.png"   
}) {

    let totalPages = 1;
    let currentPage = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get("category"); 

    let searchQuery = "";
    let itemsForCategories = [];

    async function fetchPage(page = 1) {
        try {
            const contentBody = await $.getJSON(`https://api.smetu.ir/contents/${filterLabel}?per_page=${perPage}&page=${page}`);

            totalPages = contentBody.totalPages || 1;

            let items = contentBody.items || [];

            itemsForCategories.push(...items);

            if(categoryFilter) items = items.filter(c.categories.includes(categoryFilter));

            if(searchQuery) {
                items = items.filter(c => c.title.includes(searchQuery) || c.content.includes(searchQuery))
            }


            return items;
        } catch (err) {
            console.error("Fetch Error: ", err);
            return [];
        }
        
    }
               
    function getImageWithFallback(src) {
        return `<img src="${src}" alt="" onerror="this.onerror=null;this.src='${defaultImage}';">`;
    }

    function renderPageItems(items) {
        const container = $(containerSelector);       
        container.empty();
       
        if (!items.length) {
            container.html("<h2>هیچ پستی نیست!</h2>");
            return;
        }
    
        items.forEach(c => {           
            $(containerSelector).append(`
                <article class="blogs-blog-post">
                    <div class="blogs-post-image">
                        ${getImageWithFallback(c.imageLink)}
                        <span class="blogs-post-category">${categoriesInPersian[c.label]}</span>
                    </div>
                    <div class="blogs-post-content">
                        <div class="blogs-post-meta">
                            <div class="blogs-post-meta-item">
                                <i class="far fa-calendar"></i>
                                <span>${c.updatedAt}</span>
                            </div>
                        </div>
                        <h2 class="blogs-post-title">${c.title}</h2>
                        <p class="blogs-post-excerpt">${c.summary}</p>
                        <div class="blogs-post-footer">
                            <div class="blogs-post-author">
                                <div class="blogs-author-avatar">
                                    <img src="${c.user.avatar}" alt="${c.user.name}" onerror="this.onerror=null;this.src='${defaultImage}';">
                                </div>
                                <div class="blogs-author-info">
                                    <div class="blogs-author-name">${c.user.name}</div>
                                    <div class="blogs-post-date">بروزرسانی شده در ${c.updatedAt}</div>
                                </div>
                            </div>
                            <a href="${c.link}" class="blogs-read-more">
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
        let html = '';
        for (let i = 1; i <= totalPages; i++) {           
                html += `<li class="blogs-page-item" data-page="${i}">
                <a href="javascript:void(0)" class="blogs-page-link">${i}
                </a></li>`;        
        }
        $(paginationSelector).html(html);       
    }

    async function loadPage(page) {
        currentPage = page;
        const items = await fetchPage(page);
        renderPageItems(items);
    }

    // Categories + counts
    function getCategoriesWithCount(items) {
        const categoryMap = {};
        items.forEach(item => {
            (item.categories || []).forEach(cat => {
                categoryMap[cat] = (categoryMap[cat] || 0) + 1;
            });
        });

        return Object.keys(categoryMap).map(catName => ({
            name: catName,
            count: categoryMap[catName]
        }));
    }

    function renderCategories() {        
        
        const container = $(categoriesContainerSelector);
        container.empty();

        if(!itemsForCategories.length) {
            container.hide();
            return;
        }
       
        const categories = getCategoriesWithCount(itemsForCategories);

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
        const items = await fetchPage(1);
        renderCategories();
        renderPageItems(items);
        renderPagination();

        renderCategories();
        
        $("#loading-overlay").fadeOut();
    };

    init().catch(err => console.error("InitBlog error:", err));

    $(document).on("click", ".blogs-page-item", async function () {       
        const page = Number($(this).data("page"));
        await loadPage(page);
    });
    
    $(searchSelector).on("input", async () => {
        searchQuery = $(searchSelector).val().trim();
        await loadPage(1);
        renderPagination();
    });

}