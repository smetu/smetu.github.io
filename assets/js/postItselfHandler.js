async function showPostDetails(contentId, fallbackUrl, label) {

    $.getJSON(`https://api.smetu.ir/contents/${label}?issue_id=${contentId}`,
        function (contentData) {

            if(contentData.error) {
                window.location.href = fallbackUrl;
                return;
            }

            document.title = contentData.title;
            $("#blogpost-category").html(categoriesInPersian[contentData.label]);
            $("#blogpost-update-date").html(contentData.updatedAt);
            $("#blogpost-title").html(contentData.title);
            $("#blogpost-summary").html(contentData.summary);
                    
            if(contentData.imageLink === null) {
                $("#blog-post-image-container").hide();
            } else {
                $("#blogpost-image").attr("src", contentData.imageLink).attr("alt", contentData.title);
            }    
                               
            $("#author-image-container").append(`<img src=\"${contentData.user.avatar}\" alt=\"Photo of ${contentData.user.name} profile.\">`)                                                       
            $("#author-name").html(contentData.user.name);
            $("#author-bio").html(contentData.user.bio || "کاربر وبسایت");
                                                                       
            $("#blogpost-content").append(contentData.content.replace(/\(مدیر\)/gm, "")); 
                                        
            contentData.keywords.forEach(kv => {
                $("#blogpost-keywords").append(`<a href=\"javascript:void(0)\" class=\"blog-1-tag\">${kv}</a>`)
            });

            if(contentData.categories.length === 0) {
                $("#categories-list").hide();
            } else {

                $("#categories-list").empty();
                contentData.categories.forEach(cat => {                            
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
        return;
    });
        

}