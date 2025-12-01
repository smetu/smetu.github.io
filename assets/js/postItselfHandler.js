async function showPostDetails(issueId, fallbackUrl, label) {
    
    $.getJSON(`${PROXY_URL}repos/${OWNER}/${REPO}/issues/${issueId}`,
        function (issueData) {
        
            $.getJSON(`${PROXY_URL}users/${issueData.user.login}`,
                function (userData) {
                    
                    if(!allowedList.includes(issueData.user.login)) {
                        window.location.href = fallbackUrl;
                        return;
                    }

                    if(label !== issueData.labels[0].name) {
                        window.location.href = fallbackUrl;
                        return;
                    }

                    if(issueData.body.includes("(پیشنویس)")) {
                        window.location.href = fallbackUrl;
                        return;
                    }


                    const body = issueData.body;
                    const result = { keywords: [] , categories: [], summary: '', content: '' };
                    
                    const keywordsMatch = body.match(/\[کلمات کلیدی را زیر این خط وارد کنید و با خط تیره جدا نمایید\]\s*([\s\S]*?)\s*(?=\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\])/i);
                    const categoriesMatch = body.match(/\[دسته بندی ها را زیر این خط وارد نمایید و با خط تیره جدا کنید\]\s*([\s\S]*?)\s*(?=\[خلاصه مطلب را زیر این خط وارد کنید\])/i);                            
                    const summaryMatch = body.match(/\[خلاصه مطلب را زیر این خط وارد کنید\]\s*([\s\S]*?)\s*(?=\[محتوای پست را زیر این خط وارد نمایید\])/i);
                    const contentMatch = body.match(/\[محتوای پست را زیر این خط وارد نمایید\]\s*([\s\S]*)/i);
                    
                        
                    if(keywordsMatch) result.keywords = keywordsMatch[1].split("-").map(k => k.trim());
                    if(categoriesMatch) result.categories = categoriesMatch[1].split("-").map(k => k.trim());
                    if(summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
                    if(contentMatch) result.content = marked.parse(contentMatch[1]).trim();
                    
                    document.title = issueData.title;
                    $("#blogpost-category").html(categoriesInPersian[issueData.labels[0].name]);
                    $("#blogpost-update-date").html(toPersianDate(issueData.updated_at));
                    $("#blogpost-title").html(issueData.title);
                    $("#blogpost-summary").html(result.summary);

                    const extractedImage = extractIssueImage(issueData.body);
                    if(extractedImage === null) {
                        $("#blog-post-image-container").hide();
                    } else {
                        $("#blogpost-image").attr("src", extractIssueImage(issueData.body)).attr("alt", result.title);
                    }    
                    
                    if(!issueData.body.includes("(مدیر)")) {
                        $("#author-image-container").append(`<img src=\"${BRIDGE_URL}avatar/${issueData.user.login}\" alt=\"Photo of ${issueData.user.login} github profile.\">`)                                                       
                        $("#author-name").html(userData.name === null ? issueData.user.login : userData.name);
                        $("#author-bio").html(userData.bio === null ? "کاربر سایت" : userData.bio);
                    } else {
                        $("#author-image-container").append(`<img src=\"/assets/images/logos/icon_sme_small.png\" alt=\"Photo of sme tabriz logo.\">`)                                                       
                        $("#author-name").html("انجمن علمی مهندسی ساخت و تولید");
                        $("#author-bio").html("مدیریت انجمن");
                    }
                                                            
                    $("#blogpost-content").append(result.content.replace(/\(مدیر\)/gm, "")); 
                                        
                    result.keywords.forEach(kv => {
                        $("#blogpost-keywords").append(`<a href=\"javascript:void(0)\" class=\"blog-1-tag\">${kv}</a>`)
                    });

                    if(result.categories.length === 0) {
                        $("#categories-list").hide();
                    } else {
                        $("#categories-list").empty();
                        result.categories.forEach(cat => {
                            
                            $("#categories-list").append(`
                                <li class="blog-1-category-item">
                                    <a href=\"javascript:void(0)\">${cat}</a>
                                    <!-- <span class="blog-1-category-count"></span> -->
                                </li>                                             
                            `)
                        });
                    }                    

                }
            ).fail(() => {
                window.location.href = fallbackUrl;
            });                                                        

        }
    ).fail(() => {
        window.location.href = fallbackUrl;
    });;


}