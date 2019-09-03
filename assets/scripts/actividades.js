function ReiniciarValores()
{  
}
function RegistrarBienes() {
 }
function ValidarCampos(loBien)
{   
}
function TraerActividades()
{
  var url = 'http://bienes.atwebpages.com/api.php/records/dactividad?join=mbienes';
  
  fetch(url, {
    method: 'GET', // or 'PUT'
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => ValidarRespuesta(res))
  .catch(error => RegistroFallido(error))  
  //.then(res => ValidarRespuesta(res))
}
function ValidarRespuesta(res)
{
  var a = res;
  //var b = res.body;
  res.json().then(function(data) {
    console.log(data.records[0].cEstado);
    console.log(data.records[0].nIdBien.cDistrito);
    console.log(data.records[0].nIdBien.cDistrito);
  });
}

function RegistroFallido(response)
{
  document.getElementById("btnBien").disabled = false;
  Mensajes("1",'Error:', "Error al registrar, intente nuevamente.")
}

