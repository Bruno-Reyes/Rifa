const pedirDatos = async () => {
    const res = await axios.get('/list')
    console.log(res.data)
        let table = `
        <table class="table">
        <thead>     
            <tr>
            <th scope="table-primary">#</th>
            <th scope="table-primary">Propietario</th>
            <th scope="table-primary">No. de Boleto</th>
            </tr>
        </thead>
        <tbody>`
        for (let i = 0; i < res.data.length; i++) {
            table+=  `<tr>
            <th class="table-info">${i+1}</th>
            <td class="table-info">${res.data[i].owner}</td>
            <td class="table-info">${res.data[i].coord}</td>
            </tr>`
        }
        table += `</tbody>
        </table>`
        document.getElementById('grid').innerHTML = table
} 

setTimeout(() => {
    pedirDatos()
}, 1000)