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

function getContentId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
};

function formatIranPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
