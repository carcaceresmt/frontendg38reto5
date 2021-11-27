const endpoint="http://129.151.104.106:8080/api/Departamento"


$(document).ready(function(){
  $("#alerta").hide()  
  $("#guardar").click(function(){
      guardarDepartamento()
  })

  $("#alerta").click(function(){
    $("#alerta").hide()  
  })
           
})
function guardarDepartamento(){

    const departamento={
        id_dep:$("#id_dep").val(),
        nomdep:$("#nomdep").val(),
        startDate:$("#startDate").val(),
        endDate:$("#endDate").val()
    }
    datajson=JSON.stringify(departamento)
    $.ajax({
        url:endpoint+"/save",
        type:'POST',
        data:datajson,
        contentType:"application/json",
        complete:function(data){
            let mensaje=(data.status=="201")?"Registro Departamento con Exito!!":"Problemas al Guardar"
            $("#mensaje").html(mensaje)
            $("#alerta").show()  
            
        }

    })



}    



/**

function guardarDepartamento(){

    let id_dep=$("#id_dep").val()
    let nomdep=$("#nomdep").val()
    let startDate=$("#startDate").val()
    let endDate=$("#endDate").val()
    let mensaje="id: "+id_dep+"<br>"+
                "departamento: "+nomdep+"<br>"+
                "startdate:"+startDate+"<br>"+
                "enddate:"+endDate+"<br>"
    $("#salida").html(mensaje)            
}
*/


