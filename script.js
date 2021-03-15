const url = 'https://shikimori.one/api/animes?';
const urlImg = 'https://shikimori.one/';

$('button#Search').on('click', function (e) {
    Delete();

    //считываешь данные с форм

    //Сортировка может осуществлять по одному из критерием: 
    //id, kind, ranked, popularity, name, status, random, episodes, aired_on
    var order = $('select#selectSort').val();
    //Вид может иметь значение одно из:
    //tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48
    var kind = $('select#selectKind').val();
    //Статус может иметь значение одно из:
    //anons, ongoing, released
    var status = $('select#selectStatus').val();
    //Поиск, может иметь любое значение
    var search = $('input#Text').val();
    //Цензура, может иметь значение true или false
    var censored = $('select#selectCensorship').val();

    var newUrl = url + 'limit=50';
      //проверка введен ли запрос, если в форме написано что-то, то добавляем его к url
    if(order != 'no'){
        newUrl += '&order=' + order;
    }
    if(kind != 'no'){
        newUrl += '&kind=' + kind;
    }
    if(status != 'no'){
        newUrl += '&status=' + status;
    }
    if(censored != 'no'){
        newUrl += '&censored=' + censored;
    }
    if(search != ''){
        search = search.replace(/ /g,"_");
        newUrl += '&search=' + search;
    }
    
    function Delete(){
        $('div.blog-post').remove();
        }

    var request = new XMLHttpRequest();
    console.log(newUrl);

    request.open('GET', newUrl);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var result = request.response;
        console.log(result);
        
        //пишешь обработку для добавления на html страницу
        for(var i = 0; i < result.length; i++){
            Add(
                result[i]['name'],
                result[i]['url'],
                urlImg + result[i]['image']['original'],
                result[i]['released_on']
            );
        }
    }

    e.stopPropagation();
});

function Add(name, url, urlToImage, released_on) {
    if(released_on == null){
        released_on = 'нет информации';
    }
    var otvet = $(
        '<div class="blog-post  wow fadeInUp">' +
        '<img class="img-responsive" src="' + urlToImage + '">' +
        '<h1>' + name + '</h1>' +
        '<span class="date-time">Релиз: ' + released_on + '</span>' +
        '<p></p>' +
        '<a href="' + urlImg + url + '" class="btn btn-upper btn-primary read-more">смотреть</a>' +
        '</div>'
    );
    $('div.Result').append(otvet);
}