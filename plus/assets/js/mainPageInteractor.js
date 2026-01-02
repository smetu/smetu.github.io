const BASE_URL = `https://api.smetu.ir/miniapp`;
const TEST_MODE = false;

async function auth() {

    const initData = Telegram.WebApp.initData;
    const initDataUns = Telegram.WebApp.initDataUnsafe;

    $.ajax({
        url: BASE_URL + "/auth",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            initData: initData
        }),
        success: function (res) {            
            Telegram.WebApp.CloudStorage.setItem("token", res.token, 
                () => {
                    //alert("TOKEN SAVED!")
                    alert(`Username : ${res.user.username}\nToken : ${res.token}`);
                }
            )

            $("#panel-main-name").text($("#panel-main-name").text().replace("_USER_", "@" + initDataUns.user.username));
            
        },
        error: function (xhr) {
            console.error("Auth failed:", xhr.responseText);
            if(xhr.responseText.includes("NO_TELEGRAM")) {
                if(TEST_MODE === false) window.location.href = "/plus/component-error-page.html";
                return;
            }
            
        }
    });
}

$(document).ready(async function () {
    
    Telegram.WebApp.CloudStorage.getItem("token", (token) => {
        if(!token) {
            auth()
        } else {
            $.ajax({            
                url: BASE_URL + "/me",   
                method: "GET",        
                headers: {
                    "Authorization": "Bearer " + token
                },
                error: function(xhr) {
                    if(xhr.status === 401) {
                        auth()
                    }
                }
            });
        }
    });

});