$(document).ready(loadVideos('0','empty'));

function loadArticles() {

    if ($('#videos').children().length > 0) {
        $('#videos').empty();
        $('.moreVids').remove();
        console.log('#videos emptied');
    } else {
        console.log("#ulVideos doesn't exist");
    };

    if ($('#articles').children().length > 0) {
        console.log('#articles already loaded');
    } else {
        $.ajax({
            url: 'http://ign-apis.herokuapp.com/articles?',
            cache: true,
            data: {
              format: 'json',
              startIndex: '0',
              count: '9'
            },
            error: function () {
                console.log('An error has occurred');
            },
            dataType: 'jsonp',
            success: function (articles) {
                var $ulArticles = '<ul id="ulArticles"></ul>';
                $('#articles').append($ulArticles);
                for (var i = 0; i < articles.count; i++) {
                    var $liArticle = '<li class="col-xs-12 col-sm-4"><div id="article' + i + '" class="tabArticle"></div></li>';
                    $('#ulArticles').append($liArticle);
                    var $thumb = '<img src="' + articles.data[i].thumbnail + '" class="articleThumb" />';
                    var $headline = '<p class="articleHeadline">' + articles.data[i].metadata.headline + '</p>';
                    var $ignLogo = '<img src="images/ign_logo_plain.png" class="ignLogo">';
                    if (articles.data[i].metadata.networks == "ign") {
                        $('#article' + i)
                            .append($thumb)
                            .append($headline)
                            .append($ignLogo);
                    } else {
                        $('#article' + i)
                            .append($thumb)
                            .append($headline);
                    };
                };
            },
            type: 'GET'
        });
    };
}

function loadVideos(_startIndex,_empty) {

    console.log('_startIndex: ' + _startIndex);
    console.log('_empty: ' + _empty);

    if ($('#articles').children().length > 0) {
        $('#articles').empty();
        console.log('#articles emptied');
    } else {
        console.log("#ulArticles doesn't exist");
    };

    if (_empty == 'empty') {
        $('.collection-item.avatar').remove();
        $('.moreVids').remove();
        console.log('#videos emptied');
    };

    if ($('#videos').children().length > 0) {
        console.log('#videos is already loaded');
    } else {
        $.ajax({
            url: 'http://ign-apis.herokuapp.com/videos?',
            cache: true,
            data: {
                format: 'json',
                startIndex: _startIndex,
                count: '9'
            },
            error: function () {
                console.log('An error has occurred');
            },
            dataType: 'jsonp',
            success: function (videos) {

                // Loop through the videos array and pull data for each video.
                for (var i = 0; i < videos.count; i++) {

                    // Pull url and create a List item.
                    var $url = videos.data[i].metadata.url;
                    var $liVideo = '<li class="collection-item avatar tan"><a id="video' + i + '" href="' + $url + '" target="_blank" class="aVideo light-teal-text"></a></li>';
                    $('#ulVideos').append($liVideo);

                    // Determine the numerical position of video.
                    if ((_startIndex + (i + 1)) < 10) {
                        var $num = '0' + (i + 1); // If < 10 style it 01, 02, ...
                    } else {
                        var $num = ((_startIndex + i) + 1); // Otherwise keep original format.
                    };

                    // Determine the name of the game using the information in objectRelations.
                    var $objRel = videos.data[i].objectRelations;
                    var $gameName = ""
                    for (var j = 0; j < $objRel.length; j++) {
                        if ($objRel[j].objectType == "games" && $objRel[j].objectType != null) {
                            $gameName = $objRel[j].objectName;
                            break;
                        };
                    };

                    // Pull duration of video.
                    var $dur = videos.data[i].metadata.duration;

                    // Convert duration of video into hh:mm:ss
                    var $longDur = get_longDur($dur);

                    // Pull the actual name of the video.
                    var $name = videos.data[i].metadata.name;

                    // Construct our list information.
                    var $title =
                        '<i class="circle">' + $num + '</i>' +
                        '<span class="title truncate">' + $name + '</span>' +
                        '<p class="videoContent truncate">' + $gameName + '</p>' +
                        '<a href="#" class="secondary-content">' + $longDur + '</a>';
                    $('#video' + i).append($title);

                    var $thumb = (videos.data[i].thumbnail).replace('_compact','');
                    if ($thumb.indexOf('?') != -1) {
                      $thumb = $thumb.substring(0, $thumb.indexOf('?'));
                    }
                    setBackgroundThumb($thumb, i);

                };

                // Add "See More Videos" button
                var $temp = 'onclick=loadVideos(' + (_startIndex + 9) + ',\'empty\')';
                var $liButton =
                    '<li class="collection-header center"><a href="#" ' + $temp + ' class="moreVids">See More Videos</a></li>';
                $('#ulVideos').append($liButton);

            },
            type: 'GET'
        });
    };
}

function get_longDur ($dur) {

    var $longDur = '';

    // Determine length in hours.
    if (($dur / 3600) >= 1) {
        $longDur = ~~($dur / 3600) + ':';
    };

    // Determine length in minutes.
    if ((($dur / 60) % 60) >= 1) {
        if (~~(($dur / 60) % 60) > 9) {
            $longDur = $longDur + ~~(($dur / 60) % 60) + ':';
        } else {
            $longDur = $longDur + '0' + ~~(($dur / 60) % 60) + ':';
        };
    } else {
        // If the video is less than a minute, show 00 in the place of minutes.
        // Visually, it is easier to see that the video is less than a minute.
        $longDur = $longDur + '00:';
    };

    // Determine length in seconds.
    if (($dur % 60) >= 1) {
        if (~~($dur % 60) > 9) {
            $longDur = $longDur + ~~($dur % 60);
        } else {
            $longDur = $longDur + '0' + ~~($dur % 60);
        };
    };

    return $longDur;

}

function setBackgroundThumb ($url, i) {

    $('#video' + i).hover(function(){
        $(this).css('background-image', 'url(' + $url + ')');
    }, function(){
        $(this).css('background-image', 'none');
    });

}
