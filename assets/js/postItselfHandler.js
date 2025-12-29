async function showLoadingBox(title, html, showOrHide, blurLevel) {

    $(".loading-title").text(title);
    $(".loading-sub").html(html);

    if(showOrHide === true) {
        $("#loading-overlay").show();
    }

    if(showOrHide === false) {
        $("#loading-overlay").hide();
    }

    if(blurLevel) {
        $("#loading-overlay").css({'backdrop-filter': `blur(${blurLevel}px)`});
    }
}


async function showPostDetails(contentId, fallbackUrl, label) {

    $.getJSON(`https://api.smetu.ir/contents/${label}?issue_id=${contentId}`,
        function (contentData) {

            if(contentData.error) {
                showLoadingBox("خطا در بارگذاری پست!", `بازگشت به  <a href="${fallbackUrl}">صفحه قبلی</a>`, true, 20);
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
        showLoadingBox("پست پیدا نشد!", `بازگشت به  <a href="${fallbackUrl}">صفحه قبلی</a>`, true, 20);
        return;
    });
        

}