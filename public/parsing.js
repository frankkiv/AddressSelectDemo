var jsonObject;
var cityIndex = null;
var areaIndex = null;
var addrText;
//init parsing Joson Object file
$.getJSON("AllData.json", function(data){
    jsonObject = data;
    //for cat address log
    /*for(var i in jsonObject){
        console.log(jsonObject[i].CityName);
        for(var j in data[i].AreaList){
            console.log("   "+data[i].AreaList[j].AreaName);
        }
    }*/
    $.each(data, function (key, value) {
        $('#select-city').append(
            $("<option></option>")
            .attr("value", key)
            .text(value.CityName)
        );
    });
});

function onSelectCity(data) {
    console.log( data.value );
    this.cityIndex = data.value;
    updatAreaOptions(data.value);
}

function onSelectArea(data) {
    console.log( data.value );
    this.areaIndex = data.value;
}

function updatAreaOptions(data){
    this.areaIndex = null
    $("#select-area").empty();
    $('#select-area').append(
        $("<option></option>")
        .attr("disabled", 'true')
        .attr("selected", 'true')
        .attr("style", 'display:none;')
        .text("選擇區域")
    );
    $('#select-area').selectmenu('refresh', true);
    $.each(this.jsonObject[data].AreaList, function (key, value) {
        $('#select-area').append(
            $("<option></option>")
            .attr("value", key)
            .text(value.AreaName)
        );
    });
}

function addrSubmit(){
    if(this.cityIndex == null || this.areaIndex == null){
        alert("選單不得為空");
    }else{
        this.addrText = $('#textAddr').val();
        let tmpstring = this.jsonObject[this.cityIndex].CityName+""+this.jsonObject[this.cityIndex].AreaList[this.areaIndex].AreaName+""+this.addrText
        $('#textOutput').append(
            $("<h2></h2>").text(tmpstring)
        );
    }
}
