toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

const boleto = () => {
    let valido = true
    let mensaje = ''
    let name = document.getElementById('name').value
    let letter = document.getElementById('letter').value
    let number = document.getElementById('number').value

    if(name.length<4){
        mensaje = '¡El nombre es muy corto!'
        valido = false
    }else if(name.length>12 && valido){
        mensaje= '¡El nombre es muy largo!'
        valido = false
    }else if(!validator.isAlpha(name) && valido){
        mensaje= '¡El nombre solo contiene letras y sin espacios!'
        valido = false
    }
    if(letter.length!=1 && valido){
        mensaje = '¡Elige una letra!'
        valido = false
    }

    if(!validator.isNumeric(number) && valido){
        mensaje = '¡Solo debe ser un numero!'
        valido = false
    }else if(parseInt(number)< 1 && valido || parseInt(number)>10 && valido){
        mensaje = 'El rango del numero es del 1-10'
        valido = false
    }

    if(!valido){
        toastr["error"](mensaje, "Error")
    }
    if(valido){
        enviarBoleto(name,letter,number)
    }
}

const enviarBoleto = (name,letter,number) => {
    axios.post('/ticket', {
        name,
        letter,
        number
      })
      .then(res => {
        toastr[res.data.color](res.data.message, res.data.title)
        document.getElementById('name').value = ""
        document.getElementById('letter').value = ""
        document.getElementById('number').value = ""
        llenarTablero()
      })
      .catch(error => {
            console.log(error)
      })
}

const llenarTablero = () => {
    axios.get('/list')
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            document.getElementById(res.data[i].coord).innerHTML = res.data[i].coord
            document.getElementById(res.data[i].coord).addEventListener('click', () => {
                toastr["info"]( `Precio: ${res.data[i].price}` , res.data[i].coord)
            })
            if(!validator.isEmpty(res.data[i].owner)){
                document.getElementById(res.data[i].coord).style.backgroundColor = '#20F2F5'
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
}

const init = () => {
    llenarTablero()
}

setTimeout(() => {
    init()
}, 2000)