
document.querySelector("#form").addEventListener("submit", function (event){
    event.preventDefault()

    let toastCargando = new bootstrap.Toast(document.getElementById('liveToast'))
    let toastOk = new bootstrap.Toast(document.getElementById('OkToast'))
    let toastError = new bootstrap.Toast(document.getElementById('errorToast'))
    let toastFoto = new bootstrap.Toast(document.getElementById('fotoToast'))
    

    let form = event.target
   
    let nomb = document.getElementById("Nombres")
    let ape = document.getElementById("Apellidos")
    let nDocumento = document.getElementById("N.Documento")
    let nomC = "Registro " + nomb.value + " " + ape.value

    let newInput = document.createElement("input")
    newInput.type = "hidden"
    newInput.name = "_subject"
    newInput.value = nomC
    form.appendChild(newInput)
    

    let formData = new FormData(form)
    if(window.fileBlob){
        formData.append("file", window.fileBlob, nDocumento.value + ".png")
        formData.set
    }else{
        toastFoto.show()
        return
    }

    toastCargando.show()
    fetch("https://formsubmit.co/william.brinez017@gmail.com",{
        method: "POST",
        body: formData 
    }).then(response =>{
        if(response.ok){
            toastCargando.hide()
            toastOk.show()
            form.reset()
        }else{
            toastError.show()
        }
    }).catch(error =>{
        console.log(error)
        toastError.show()
    })
    
})




