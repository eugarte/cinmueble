function ReiniciarValores()
{
  document.getElementById("nVenta").value = "";
  document.getElementById("nAlquiler").value = "";
  document.getElementById("nMetros").value = "";
  document.getElementById("cCelular").value = "";
  document.getElementById("cDireccion").value = "";
  document.getElementById("nLatitud").value = "";
  document.getElementById("nLongitud").value = "";
  document.getElementById("cbbTipo").value = "";
  document.getElementById("cbbMedio").value = "";
  document.getElementById("cbbSecEco").value = "";
  document.getElementById("cbbDistrito").value = "";
  document.getElementById("cbbCenCom").value = "";
  
  var radios = document.getElementsByName('options');
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          // do whatever you want with the checked radio
          radios[i].checked = false;
          break;
      }
  }  
  document.getElementById("cDetalle").value = "";
}
function RegistrarBienes() {
  document.getElementById("btnBien").disabled = true;
  var loBien = {};  
  var lnVenta = document.getElementById("nVenta").value;
  var lnAlquiler = document.getElementById("nAlquiler").value;
  var lnMetros = document.getElementById("nMetros").value;
  var lcCelular = document.getElementById("cCelular").value;
  var lcDireccion = document.getElementById("cDireccion").value;
  var lnLatitud = document.getElementById("nLatitud").value;
  var lnLongitud = "";//document.getElementById("nLongitud").value;
  var e = document.getElementById("cbbTipo");
  var lcTipo = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbMedio");
  var lcMedio = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbSecEco");
  var lcSecEco = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbDistrito");
  var lcDistrito = e.options[e.selectedIndex].value; 
  e = document.getElementById("cbbCenCom");
  var lcCenCom = e.options[e.selectedIndex].value; 

  var radios = document.getElementsByName('options');
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          // do whatever you want with the checked radio
          var lcImportancia = radios[i].value;
          break;
      }
  }  
  var lcDetalle = document.getElementById("cDetalle").value;
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  

  loBien.cTipo = lcTipo;//
  loBien.cMedio = lcMedio;//
  loBien.cSectorEco = lcSecEco;//
  loBien.cImportancia = lcImportancia;//
  loBien.cDetalle = lcDetalle;//
  loBien.cDireccion = lcDireccion;//
  loBien.cDistrito = lcDistrito;//
  loBien.cCentroComercial = lcCenCom;//
  loBien.nMetros = lnMetros;//
  loBien.nPrecioRenta = lnVenta;//
  loBien.nPrecioCompra = lnAlquiler;//
  loBien.cLatitud = lnLatitud;//
  //loBien.cLongitud = lnLongitud;//
  loBien.cCelular = lcCelular;
  loBien.dFecha =  dateToYMD(new Date()) +" "+ time;//"2019-08-08 00:00:00";
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
  if(loBien.cTipo == "")
  {
    Mensajes(lcTipo, lcTitulo, "Revisa Tipo");
    llOk = "0";
  }
  if(loBien.cMedio == "")
  {
    Mensajes(lcTipo, lcTitulo, "Revisa Medio");
    llOk = "0";
  }
  if(loBien.cSectorEco == "")
  {
    Mensajes(lcTipo, lcTitulo, "Sector económico");  
    llOk = "0";
  }
  if(loBien.cDistrito == "")
  {
     Mensajes(lcTipo, lcTitulo, "Sector distrito");  
     llOk = "0";
  } 
  if(loBien.cCentroComercial == "")
  {
    Mensajes(lcTipo, lcTitulo, "Centro comercial");    
    llOk = "0";
  }
  if(loBien.cImportancia == null)
  {
    Mensajes(lcTipo, lcTitulo, "Importancia"); 
    llOk = "0";
  }
  if(loBien.cDetalle == "")
  {
    Mensajes(lcTipo, lcTitulo, "Detalle");
    llOk = "0";
  }
  if(loBien.cDireccion == "")
  {
    Mensajes(lcTipo, lcTitulo, "Dirección");
    llOk = "0";
  }
  if(loBien.nMetros == "")
  {
    Mensajes(lcTipo, lcTitulo, "Metros");
    llOk = "0";
  }
  if(loBien.nPrecioRenta == "")
  {
    Mensajes(lcTipo, lcTitulo, "Precio Renta");
    llOk = "0";
  }
  if(loBien.nPrecioCompra == "")
  {
    Mensajes(lcTipo, lcTitulo, "Precio Compra");  
    llOk = "0";
  }
  if(loBien.cLatitud == "")
  {
    Mensajes(lcTipo, lcTitulo, "Latitud");  
    llOk = "0";
  }
  if(loBien.cLongitud == "")
  {
    Mensajes(lcTipo, lcTitulo, "Longitud"); 
    llOk = "0"; 
  }
  if(loBien.cCelular == "")
  {
    Mensajes(lcTipo, lcTitulo, "Celular"); 
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
