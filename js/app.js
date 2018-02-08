$(document).ready(function () {


    function getAjax() {
        // $.ajax({
        //     url: 'http://127.0.0.1:8000/book/',
        //     data: {},
        //     type: 'GET',
        //     dataType: 'json'
        // }).done(function (result) {
        //     console.log(result);
        //     showResults(result)
        // }).fail(function (xhr, status, err) {
        //     console.log(xhr, status, err);
        // }).always(function (xhr, status) {
        //     //console.log(xhr, status)
        // });
        mainAjax('','','GET', showResults);
    }
    function showResults(result) {
        var div = $('.books');
        div.html('');
        for( var i = 0; i <result.length; i++){
            div.append('<div class="book"><span class="title" data-id="'+result[i].id+'">'+result[i].title+'</span><div class="description"></div><div class="delete" data-delete="'+result[i].id+'">DELETE</div></div>');
        }
        //EventFactory();
        myClick(div, 'span', mainAjax);
        deleteBook();
    }
    // function EventFactory() {
    //     $('.books').on('click', 'span', function(event){
    //         var _self = this;
    //         // $.ajax({
    //         //     url: 'http://127.0.0.1:8000/book/'+$(this).data("id"),
    //         //     data: {},
    //         //     type: 'GET',
    //         //     dataType: 'json'
    //         // }).done(function (result) {
    //         //     console.log($(_self).next())
    //         //     displayDescription(result, $(_self).next())
    //         // }).fail(function (xhr, status, err) {
    //         //     console.log(xhr, status, err);
    //         // }).always(function (xhr, status) {
    //         //     //console.log(xhr, status)
    //         // });
    //         mainAjax($(this).data("id"),'','GET', displayDescription);
    //
    //     });

    //}
    function displayDescription(res) {
        var title = $('.title[data-id='+res.id+']');
        console.log(title)
        $(title).next().html('<span>'+res.author+'</span><br><span>'+res.isbn+'</span><br><span>'+res.publisher+'</span><br><span>'+res.genre+'</span><br><span></span>');
    }
    function sendPost(){
        $('#send').on('click', function(event){
            var dataList = {
                    author: $('#name').val(),
                    title: $('#title').val(),
                    isbn: $('#isbn').val(),
                    publisher: $('#pub').val(),
                    genre: $('#genre').val()
                };

        // $.ajax({
        //         url: 'http://127.0.0.1:8000/book/',
        //         data: {
        //             author: $('#name').val(),
        //             title: $('#title').val(),
        //             isbn: $('#isbn').val(),
        //             publisher: $('#pub').val(),
        //             genre: $('#genre').val()
        //         },
        //         type: 'POST',
        //         dataType: 'json'
        //     }).done(function (result) {
        //         console.log(result)
        //         getAjax()
        //     }).fail(function (xhr, status, err) {
        //         console.log(xhr, status, err);
        //     }).always(function (xhr, status) {
        //         //console.log(xhr, status)
        //     });
        mainAjax('',dataList,'POST', getAjax);
        event.preventDefault();
        });

    }
    function deleteBook() {
        $('.delete').on('click', function (event){
           // $.ajax({
           //      url: 'http://127.0.0.1:8000/book/'+$(this).data("delete"),
           //      data: {},
           //      type: 'DELETE',
           //      dataType: 'json'
           //  }).done(function (result) {
           //      //console.log(result)
           //     getAjax();
           //  }).fail(function (xhr, status, err) {
           //      console.log(xhr, status, err);
           //  }).always(function (xhr, status) {
           //      //console.log(xhr, status)
           //  });
           mainAjax($(this).data("delete"),'','DELETE', getAjax);
           event.preventDefault();

        });

    }
    function mainAjax(url, data, type, callback) {
        console.log(callback);
        $.ajax({
                url: 'http://127.0.0.1:8000/book/'+url,
                data: data,
                type: type,
                dataType: 'json'
            }).done(function (result) {
                //console.log(result)
               callback(result);
            }).fail(function (xhr, status, err) {
                console.log(xhr, status, err);
            }).always(function (xhr, status) {
                //console.log(xhr, status)
            });
        event.preventDefault();
    }
    function myClick(element, child, callback) {
        $(element).on('click', child, function (event){
            event.preventDefault();
            callback($(this).data("id"),'','GET', displayDescription);
        })
    }


    sendPost();
    getAjax();
})