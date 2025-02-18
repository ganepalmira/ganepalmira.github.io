document.querySelector("#form").addEventListener("submit", function (event) {
    event.preventDefault() // Prevenir el envío del formulario por defecto

    // Inicializar los toasts de Bootstrap
    let toastCargando = new bootstrap.Toast(document.getElementById('liveToast'))
    let toastOk = new bootstrap.Toast(document.getElementById('OkToast'))
    let toastError = new bootstrap.Toast(document.getElementById('errorToast'))
    let toastFoto = new bootstrap.Toast(document.getElementById('fotoToast'))

    let form = event.target // Obtener el formulario

    // Obtener los valores de los campos del formulario
    let nomb = document.getElementById("Nombres")
    let ape = document.getElementById("Apellidos")
    let nDocumento = document.getElementById("N.Documento")
    let nomC = "Registro comité responsabilidad social empresarial"

    // Crear un nuevo input oculto para el asunto del correo
    let newInput = document.createElement("input")
    newInput.type = "hidden"
    newInput.name = "_subject"
    newInput.value = nomC
    form.appendChild(newInput)

    let formData = new FormData(form) // Crear un FormData con los datos del formulario
    if (window.fileBlob) {
        // Si hay una imagen capturada, agregarla al FormData
        formData.append("file", window.fileBlob, nDocumento.value + ".png")
    } else {
        // Mostrar el toast de foto si no hay imagen capturada
        toastFoto.show()
        return
    }
    let btnEnviar = document.getElementById("liveToastBtn")
    btnEnviar.disabled = true // Deshabilitar el botón de enviar
    toastCargando.show() // Mostrar el toast de cargando

    // Enviar el formulario usando fetch
    fetch("https://formsubmit.co/2040cd5c7d60c3e26e75f3338aecdeb3", {
        method: "POST",
        body: formData
    }).then(response => {
        toastCargando.hide() // Ocultar toastCargando después de recibir la respuesta
        if (response.ok) {
            toastOk.show() // Mostrar toast de éxito
            form.reset() // Reiniciar el formulario
            setTimeout(() => { location.reload() }, 1200); // Recargar la página después de 1 segundo
        } else {
            toastError.show() // Mostrar toast de error
        }
    }).catch(error => {
        console.log(error)
        toastCargando.hide() // Ocultar toastCargando en caso de error
        toastError.show() // Mostrar toast de error
    })
})