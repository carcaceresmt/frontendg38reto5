const endpoint="http://129.151.104.106:8080/api/Departamento"

$(document).ready(function(){
    $("#alerta").hide()  
    getDepartamento()

    $("#guardar").click(function(){
        editarDepartamento()
    })
    
})

$("#alerta").click(function(){
    $("#alerta").hide()  
})

function getDepartamento(){

    $.ajax({

        url:endpoint+"/all",
        type:'GET',
        dataType:'json',
        success:function(data){            
         
            let registro=""
            $.each(data,function(index,departamento){
                
                registro+="<tr>"+
                         "<td>"+(index+1)+"</td>"+
                         "<td>"+departamento.id_dep+"</td>"+
                         "<td>"+departamento.nomdep+"</td>"+
                         "<td>"+departamento.startDate+"</td>"+
                         "<td>"+departamento.endDate+"</td>"+
                         "<td>"+
                         "<button class='btn btn-warning mr-1' data-toggle='modal' data-target='#myModal'"+
                         "onclick=\"ver('"+departamento.id_dep+"','"+departamento.nomdep+"','"+departamento.startDate+"','"+departamento.endDate+"')\""+
                          ">"+
                         
                         "Editar</button>"+
                         "<button class='btn btn-danger' "+
                         "onclick=\"eliminar('"+departamento.id_dep+"')\">"+
                         "Eliminar</button>"+
                         "</td>"
               
            })
            $("#tbody").html(registro)


        }

    })


}

function editarDepartamento(){

    const departamento={
        id_dep:$("#id_dep").val(),
        nomdep:$("#nomdep").val(),
        startDate:$("#startDate").val(),
        endDate:$("#endDate").val()
    }
    datajson=JSON.stringify(departamento)
    $.ajax({
        url:endpoint+"/update",
        type:'PUT',
        data:datajson,
        contentType:"application/json",
        complete:function(data){
            let mensaje=(data.status=="201")?"Edito Departamento con Exito!!":"Problemas al Editar"
            $("#mensaje").html(mensaje)
            $("#alerta").show()  
            getDepartamento()
            
        }

    })
}


function eliminar(id){
    $.ajax({

        url:endpoint+"/"+id,
        type:'DELETE',
        dataType:'json',
        success:function(data){      
            getDepartamento()
        }    
    })        
}

function ver(id_dep,nomdep,startDate,endDate){
    let ds=new Date(startDate)
    let de=new Date(endDate)
    $("#id_dep").val(id_dep)
    $("#nomdep").val(nomdep)
    $("#startDate").val(ds.toISOString().slice(0,16))
    $("#endDate").val(de.toISOString().slice(0,16))

}