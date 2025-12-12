

function toPersianDate(dateString) {
    const date = new Date(dateString);
    
    const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    
    const faDate = formatter.format(date);
    
    return faDate.replace(/،/g, "");
};

function extractIssueImage(body) {
    if (!body) return null;

    // --- 1. Markdown format ---
    const mdMatch = body.match(/!\[[^\]]*\]\((https:\/\/github\.com\/user-attachments\/[^\)]+)\)/);
    if (mdMatch && mdMatch[1]) {
        return mdMatch[1];
    }

    // --- 2. HTML <img> format ---
    const htmlMatch = body.match(/<img[^>]+src=["'](https:\/\/github\.com\/user-attachments\/[^"']+)["']/);
    if (htmlMatch && htmlMatch[1]) {
        return htmlMatch[1];
    }

    return null;
};

function getContentId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
};

function formatIranPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
