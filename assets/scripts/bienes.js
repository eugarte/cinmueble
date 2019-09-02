function ReiniciarValores()
{
  document.getElementById("cbbMedio").value = "";
  document.getElementById("cbbDistrito").value = "";
  document.getElementById("nMetros").value = "";
  document.getElementById("nAlquiler").value = "";
  document.getElementById("nVenta").value = "";
  document.getElementById("cCelular").value = "";
  document.getElementById("cReferencia").value = "";
  document.getElementById("dFecVis").value = "";
  document.getElementById("cAgua").checked = false;
  document.getElementById("cLuz").checked = false;
  document.getElementById("cbbTipoTrato").value = "";
  document.getElementById("cbbTipoNegocio").value = "";
  document.getElementById("cComentario").value = "";
  document.getElementById("cAntiguedad").value = "";   

}
function RegistrarBienes() {
  document.getElementById("btnBien").disabled = true;
  var loBien = {};  
  var lnVenta = document.getElementById("nVenta").value;//
  var lnAlquiler = document.getElementById("nAlquiler").value;//
  var lnMetros = document.getElementById("nMetros").value;//
  var lcCelular = document.getElementById("cCelular").value;//
  var lcReferencia = document.getElementById("cReferencia").value;//
  var ldFecVis = document.getElementById("dFecVis").value;//
  var lcComentario = document.getElementById("cComentario").value;//
  var lcAntiguedad = document.getElementById("cAntiguedad").value;//

  var e = document.getElementById("cbbMedio");//
  var lcMedio = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbDistrito");//
  var lcDistrito = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbTipoTrato");//
  var lcTipoTrato = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbTipoNegocio");//
  var lcTipoNegocio = e.options[e.selectedIndex].value; 

  var lcAgua = document.getElementById("cAgua").checked == true ? "1" : "2";//
  var lcLuz = document.getElementById("cLuz").checked == true ? "1" : "2";//

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  loBien.cMedio             =lcMedio;
  loBien.cDistrito          =lcDistrito;
  loBien.nMetros            =lnMetros;
  loBien.nPrecioRenta       =lnAlquiler;
  loBien.nPrecioCompra      =lnVenta;
  loBien.cCelular           =lcCelular;
  loBien.dFecha             =dateToYMD(new Date()) +" "+ time;//"2019-08-08 00:00:00";
  loBien.cReferencia        =lcReferencia;
  loBien.dFecRegLlamada     =dateToYMD(new Date()) +" "+ time;//"2019-08-08 00:00:00";;
  loBien.dFecVisita         =ldFecVis;
  loBien.cAgua              =lcAgua;
  loBien.cLuz               =lcLuz;
  loBien.cTrato             =lcTipoTrato;
  loBien.cTipoNegocio       =lcTipoNegocio;
  loBien.cComentarioLlamada =lcComentario;
  loBien.cAntiguedad        =lcAntiguedad;

  if (ValidarCampos(loBien) == "1")
  {
   Registrar(loBien);  
  }
  else
  {
    document.getElementById("btnBien").disabled = false;
  }
  
}
function ValidarCampos(loBien)
{ 
  var llOk = "1";
  var lcTitulo = "¡Revisa!"
  var lcTipo = "3";
              
           
  if(loBien.cTrato == "")
  {
    Mensajes(lcTipo, lcTitulo, "Trato");
    llOk = "0";
  }
  if(loBien.cMedio == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Revisa Medio");
    llOk = "0";
  }
  if(loBien.cLuz == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Luz");  
    llOk = "0";
  }
  if(loBien.cDistrito == "")//
  {
     Mensajes(lcTipo, lcTitulo, "Sector distrito");  
     llOk = "0";
  } 
  if(loBien.cAgua == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Agua");    
    llOk = "0";
  }  
  if(loBien.cTipoNegocio == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Tipo Negocio");
    llOk = "0";
  }
  if(loBien.cComentarioLlamada == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Comentario Llamada");
    llOk = "0";
  }
  if(loBien.nMetros == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Metros");
    llOk = "0";
  }
  if(loBien.nPrecioRenta == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Precio Renta");
    llOk = "0";
  }
  if(loBien.nPrecioCompra == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Precio Compra");  
    llOk = "0";
  }
  if(loBien.cAntiguedad == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Antiguedad");  
    llOk = "0";
  }
  if(loBien.cReferencia == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Referencia");  
    llOk = "0";
  }
  if(loBien.dFecVisita == "")//
  {
    Mensajes(lcTipo, lcTitulo, "Fecha Visita");  
    llOk = "0";
  }
  return llOk;
  
}
function showPosition(position) 
  {
    document.getElementById("nLatitud").value = position.coords.latitude;
    document.getElementById("nLongitud").value = position.coords.longitude;
  }
function Geolocalizar()
{ 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }    
}
function Registrar(toBien)
{
  var url = 'http://bienes.atwebpages.com/api.php/records/mbienes';
  var data = toBien;

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => ValidarRespuestaInmueble(res))
  .catch(error => RegistroInmuebleFallido(response))
  //.then(response=>RegistroInmuebleExitoso(response))  
}
function ValidarRespuestaInmueble(res)
{
  document.getElementById("btnBien").disabled = false;
  ReiniciarValores();
  if (res.ok == false)
  {    
    Mensajes("1",'Inmuebles:', "Error al efectuar el registro del inmueble"); 
  }
  else
  {
    if (res.status == 200)
    {
      Mensajes("2",'Inmuebles:', "!Registro exitoso!");
    }
    else
    {
      Mensajes("3",'Inmuebles:', "!Error al realizar la operación, vuelva a intentar!"); 
    }
    
  }

}
function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}
function RegistroInmuebleExitoso(response)
{
  document.getElementById("btnBien").disabled = false;
  if (isObject(response))
  {
    Mensajes("3",'Inmuebles:', "!Error al realizar la operación, vuelva a intentar!"); 
  }
  else
  {
    Mensajes("2",'Inmuebles:', "!Registro exitoso: " + response + " !"); 
  }
  
}
function RegistroInmuebleFallido(response)
{
  document.getElementById("btnBien").disabled = false;
  Mensajes("1",'Error:', "Error al registrar, intente nuevamente.")
}
function Mensajes(cTipo, cTitulo, cMensaje)
{
  switch (cTipo) {
    case "1":
      $.growl.error({title: cTitulo, message: cMensaje });    
      break;
    case "2":
      $.growl.notice({title: cTitulo, message: cMensaje });    
      break;
    case "3":
      $.growl.warning({title: cTitulo, message: cMensaje });     
        break;  
    default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      break;
  } 
}
function dateToYMD(date) 
{
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
