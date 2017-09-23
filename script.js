'ues strict';
var url = 'http://localhost:8001';

$.ajax({
    type: 'post',
    dataType: 'json',
    data: {name: 233, sex: 'male'},
    url: url + '/xss_1',
    crossDomain: true,
    success: (response) => {
        console.log(response);
    }
});