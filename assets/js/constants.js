const OWNER = "smetu";
const REPO = "smetu.github.io";
const PROXY_URL = `https://api.smetu.ir/github/`;
const BRIDGE_URL = `https://api.smetu.ir/bridge/`;

const categoriesInPersian = {
    "BLOG": "وبلاگ",
    "NEWS": "اخبار",
    "JOURNAL": "نشریه"
};

const allowedList = ["Emadhp05", "kaveh-dev", "sakhtotolid", "mrAG10"];


const allowedListV2 = [
    {
        name: "kaveh-dev",
        access_to: ["BLOG", "NEWS", "JOURNAL", "COURSE"]       
    }
]