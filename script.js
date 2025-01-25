let prompt = document.querySelector("#prompt");
let container=document.querySelector(".container")
let btn = document.querySelector("#btn");
let chatcontainer = document.querySelector(".chat-container");
let usermsg = null;
let apiurl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBZnqGLvbZhCAcCeT0Qid5GvezqabAjkCA';

function createchatbox(html, classname) {
    let div = document.createElement("div");
    div.classList.add(classname);
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aichatbox) {

    let textelement=aichatbox.querySelector(".text")
    try {
        let response = await fetch(apiurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: usermsg
                            }
                        ]
                    }
                ]
            })
        })
        let data=await response.json()
        let apiresponse=data?.candidates[0].content.parts[0].text;
        textelement.innerText=apiresponse

        
    } catch (error) {
        console.log(error);
        
    }
    finally{
        aichatbox.querySelector(".loading").style.display="none"
    }
}

function showloading() {
    let html = `
        <div class="img">
            <img src="chatbot.png" alt="Chatbot" width="50" height="50">
        </div>
        <p class="text">Loading...</p>
        <img class="loading" src="loading.gif" alt="Loading" height="50">
    `;
    let aichatbox = createchatbox(html, "ai-chat-box");
    chatcontainer.append(aichatbox);
    getApiResponse(aichatbox); // Call the API to get the response
}

btn.addEventListener("click", () => {
    usermsg = prompt.value;
    if(usermsg==""){
            container.style.display="flex"
    }
    {
        container.style.display="none"
    }
    if (!usermsg) return;

    let html = `
        <div class="img">
            <img src="user2.jpg" alt="User" width="50" height="30">
        </div>
        <p class="text"></p>
    `;

    let userchatbox = createchatbox(html, "user-chat-box");
    userchatbox.querySelector(".text").innerText = usermsg; 
    chatcontainer.append(userchatbox); 
    prompt.value = ""; 
    setTimeout(showloading, 500); 
});
