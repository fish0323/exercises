document.querySelector('#memo-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append('content', form.content.value);
    formData.append('image', form.image.files[0]);

    const res = await fetch('/memos', {
        method: "POST",
        body: formData
    })

    if (res.status === 200) {
        console.log(await res.json())
    }
    form.reset();
    loadMemos()
});

document.querySelector('#login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const loginInfo = {};

    loginInfo.username = form.username.value;
    loginInfo.password = form.password.value;

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
    })

    if (res.status === 200) {
        console.log(await res.json())
        window.location = '/admin.html';
    }
    form.reset();
});

async function loadMemos() {
    const res = await fetch('/memos');
    const memos = await res.json();

    const memosContainer = document.querySelector('.memo-container');
    memosContainer.innerHTML = ' ';
    for (let index in memos) {
        const memo = memos[index]
        memosContainer.innerHTML += `
        <div class="memo"  contenteditable>
        ${memo.content}
        <img src="/uploads/${memo.image}" class="img-fluid" />
        <div class="trash-button" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="edit-button" data-index="${index}">
            <i class="fa-solid fa-edit"></i>
        </div>
    </div>
        `
    }
    const editButtons = document.querySelectorAll('.edit-button');
    for(let editButton of editButtons) {
        editButton.addEventListener('click', async function(e){
            const index = e.currentTarget.getAttribute('data-index');
            const content = e.currentTarget.closest('.memo').innerText;
            const res = await fetch(`/memos/${index}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content:content
                })
            })
            const result = await res.json();
            if(res.status == 200 && result.success) {
                loadMemos()
            } else {
                alert("Update failed"+ result.message);
            }
        })
    }
    
}

window.onload = () => {
    loadMemos()
}