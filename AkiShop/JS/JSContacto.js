var Email = {
    send: function (a) {
      return new Promise(function (n, e) {
        (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
        var t = JSON.stringify(a);
        Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
          n(e);
        });
      });
    },
    ajaxPost: function (e, n, t) {
      var a = Email.createCORSRequest("POST", e);
      a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        (a.onload = function () {
          var e = a.responseText;
          null != t && t(e);
        }),
        a.send(n);
    },
    ajax: function (e, n) {
      var t = Email.createCORSRequest("GET", e);
      (t.onload = function () {
        var e = t.responseText;
        null != n && n(e);
      }),
        t.send();
    },
    createCORSRequest: function (e, n) {
      var t = new XMLHttpRequest();
      return (
        "withCredentials" in t
          ? t.open(e, n, !0)
          : "undefined" != typeof XDomainRequest
          ? (t = new XDomainRequest()).open(e, n)
          : (t = null),
        t
      );
    },
  };
  
  
  /* ---------------------------------------------------------------------------------------*/
  
  function sendEmail(nombre,email,telefono,fecha)
  {
    if(nombre == "")
    {
      alert("Lo sentimos, no se puede enviar la información, porque no estan todos los espacios llenos.")
      return;
    }
    var genero;
    if(document.getElementById(`masculino`).checked){
      genero = document.getElementById(`masculino`).value
    }else
      if(document.getElementById(`femenino`).checked){
      genero = document.getElementById(`femenino`).value
    }
  
     var tipopijama = "";
     if (document.getElementById(`pCom`).checked) {
      tipopijama += " - " + document.getElementById(`pCom`).value
     }
     if (document.getElementById(`pInc`).checked) {
        tipopijama += " - " + document.getElementById(`pInc`).value
     }
     var nacionalidad;
    if(document.getElementById(`costarica`).checked){
      nacionalidad = document.getElementById(`costarica`).value
    }else
      if(document.getElementById(`extranjero`).checked){
        nacionalidad = document.getElementById(`extranjero`).value
    }
  
     
     
     /* ---------------------------------------------------------------------------------------*/
  
     const calcularEdad=()=>
     {
       const fechaNacimiento= new Date(fecha);
       const fechaActual = new Date();
       const annosActual=parseInt(fechaActual.getFullYear());
       const mesActual=parseInt(fechaActual.getMonth())+1;
       const diaActual=parseInt(fechaActual.getDate());
  
       const annoNacimiento = fechaNacimiento.getFullYear();
       const mesNacimiento = fechaNacimiento.getMonth();
       const diaNacimiento = fechaNacimiento.getDate();
  
       let edad = annosActual-annoNacimiento;
       if(mesActual<mesNacimiento)
       {
         edad--;
       }else{
         if(mesActual === mesNacimiento){
           if(diaActual<diaNacimiento)
           {
             edad--;
           }
         }
       }
       return edad;
     }
  
     /* ---------------------------------------------------------------------------------------*/
  
      Email.send({
        Host : "smtp.gmail.com",
        Username : "prograweb90@gmail.com",
        Password : "utn12345",
        To : "akishoptienda@gmail.com",
        From : "prograweb90@gmail.com",
        Subject : "Contacto con AkiShop",
        Body : ` Nombre Completo: ${nombre} <br/> Email: ${email} <br/> Telefono: ${telefono}<br/> Fecha Nacimiento: ${fecha}<br/> Edad: ${calcularEdad()}<br/> Genero: ${genero}<br/>  Tipo Pijama: ${tipopijama}<br/> Nacionalidad: ${nacionalidad} <br/>`
        }).then(
        message => alert("Se ha enviado tu información, le responderemos lo antes posible. Gracias por su visita")
        );
        calcularEdad();
  }
  
  
  