document.querySelector('#contact-form').addEventListener('submit', async function (event) {
    event.preventDefault()

    // Serialize the Form afterwards
    const form = event.target
    const formObject = {}
    formObject['firstName'] = form.firstName.value
    formObject['lastName'] = form.lastName.value
    formObject['description'] = form.description.value
    const res = await fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    const result = await res.json()
    document.querySelector('#contact-result').innerHTML = result
})
