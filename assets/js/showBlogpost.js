$(document).ready(function () {
    const repoOwner = "smetbz";
    const repoName = "smetbz.github.io";

    const allowedJsonUrl = "https://raw.githubusercontent.com/smetbz/smetbz.github.io/refs/heads/main/allowedList.json";
    const PROXY_URL = `https://api.smtu.ir/github/`;

    $.getJSON(allowedJsonUrl,
        function (data) {                   

            
            $.getJSON(`${PROXY_URL}repos/${repoOwner}/${repoName}/issues/${getIssueId()}`,
                function (issueData, textStatus, jqXHR) {
                   
                    if(!data.allowedList.includes(issueData.user.login)) {
                       window.location.href = `/blog.html`;
                       return;
                    }

                    const body = issueData.body;
                    const result = { title: '', summary: '', content: '', keywords: [] };

                    const titleMatch = body.match(/\[ENTER TITLE HERE\]\s*([\s\S]*?)\s*(?=\[ENTER SUMMARY HERE\])/i);
                    const summaryMatch = body.match(/\[ENTER SUMMARY HERE\]\s*([\s\S]*?)\s*(?=\[ENTER CONTENT HERE\])/i);
                    const contentMatch = body.match(/\[ENTER CONTENT HERE\]\s*([\s\S]*?)\s*(?=\[KEYWORDS\])/i);
                    const keywordsMatch = body.match(/\[KEYWORDS\]\s*([\s\S]*)/i);
    
                    if(titleMatch) result.title = titleMatch[1].trim();
                    if(summaryMatch) result.summary = marked.parse(summaryMatch[1]).trim();
                    if(contentMatch) result.content = marked.parse(contentMatch[1]).trim();
                    if(keywordsMatch) result.keywords = keywordsMatch[1].split(",").map(k => k.trim());
    
                    document.title = result.title;
                    $("#blogpost-category").html(categoriesInPersian[issueData.labels[0].name]);
                    $("#blogpost-update-date").html(toPersianDate(issueData.updated_at));
                    $("#blogpost-title").html(result.title);
                    $("#blogpost-summary").html(result.summary);
                    $("#blogpost-image").attr("src", extractIssueImage(issueData.body)).attr("alt", result.title);
                    $("#blogpost-content").append(result.content)

                    result.keywords.forEach(kv => {
                        $("#blogpost-keywords").append(`<a href=\"javascript:void(0)\" class=\"blog-1-tag\">${kv}</a>`)
                    });
                    
                }
            ).fail(function() {                
               window.location.href = "/blog.html";
               return;
            });

        }
    );


});