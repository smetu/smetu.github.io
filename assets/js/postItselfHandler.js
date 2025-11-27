async function showPostDetails(issueId, fallbackUrl, label) {
    $.getJSON(ALLOWED_LIST,
        function (alData) {                       
                    $.getJSON(`${PROXY_URL}repos/${OWNER}/${REPO}/issues/${issueId}`,
                        function (issueData) {

                            

                            $.getJSON(`${PROXY_URL}users/${issueData.user.login}`,
                                function (userData) {
                                    
                                    if(!alData.allowedList.includes(issueData.user.login)) {
                                        window.location.href = fallbackUrl;
                                        return;
                                    }

                                    if(label !== issueData.labels[0].name) {
                                        window.location.href = fallbackUrl;
                                        return;
                                    }
        
                                    const body = issueData.body;
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
                                    
                                    document.title = result.title;
                                    $("#blogpost-category").html(categoriesInPersian[issueData.labels[0].name]);
                                    $("#blogpost-update-date").html(toPersianDate(issueData.updated_at));
                                    $("#blogpost-title").html(result.title);
                                    $("#blogpost-summary").html(result.summary);

                                    const extractedImage = extractIssueImage(issueData.body);
                                    if(extractedImage === null) {
                                        $("#blog-post-image-container").hide();
                                    } else {
                                        $("#blogpost-image").attr("src", extractIssueImage(issueData.body)).attr("alt", result.title);
                                    }                                    
                                    $("#blogpost-content").append(result.content);            
                                    $("#author-image-container").append(`<img src=\"${BRIDGE_URL}avatar/${issueData.user.login}\" alt=\"Photo of ${issueData.user.login} github profile.\">`)                                   
                                    // $("#author-name").html(persianNames[issueData.user.login] !== undefined ? persianNames[issueData.user.login] : issueData.user.login);
                                    $("#author-name").html(userData.name);
                                    $("#author-bio").html(userData.bio === null ? "کاربر سایت" : userData.bio);
                
                                    result.keywords.forEach(kv => {
                                        $("#blogpost-keywords").append(`<a href=\"javascript:void(0)\" class=\"blog-1-tag\">${kv}</a>`)
                                    });

                                    result.categories.forEach(cat => {
                                        $("#categories-list").append(`
                                            <li class="blog-1-category-item">
                                                <a href=\"javascript:void(0)\">${cat}</a>
                                                <!-- <span class="blog-1-category-count"></span> -->
                                            </li>                                             
                                        `)
                                    });

                                }
                            ).fail(() => {
                                window.location.href = fallbackUrl;
                            });                                                        

                        }
                    ).fail(() => {
                        window.location.href = fallbackUrl;
                    });;

                }
            ).fail(() => {
                window.location.href = fallbackUrl;
            });;

        }