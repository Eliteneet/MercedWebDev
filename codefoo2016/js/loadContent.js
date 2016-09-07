$(document).ready(loadVideos('0','empty'));

function loadArticles() {

    if ($('#videos').children().length > 0) {
        $('#videos').empty();
        console.log('#videos emptied');
    } else {
        console.log("#ulVideos doesn't exist");
    };

    if ($('#articles').children().length > 0) {
        console.log('#articles already loaded');
    } else {
        $.ajax({
            url: 'http://ign-apis.herokuapp.com/articles?'
            , cache: true
            , data: {
                format: 'json'
                , startIndex: '0'
                , count: '9'
            }
            , error: function () {
                console.log('An error has occurred');
            }
            , dataType: 'jsonp'
            , success: function (articles) {
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
            }
            , type: 'GET'
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
        $('#videos').empty();
        console.log('#videos emptied');
    };

    if ($('#videos').children().length > 0) {
        console.log('#videos is already loaded');
    } else {
        $.ajax({
            url: 'http://ign-apis.herokuapp.com/videos?'
            , cache: true
            , data: {
                format: 'json'
                , startIndex: _startIndex
                , count: '9'
            }
            , error: function () {
                console.log('An error has occurred');
            }
            , dataType: 'jsonp'
            , success: function (videos) {
                // Create the Unordered List to hold our videos.
                var $ulVideos = '<ul id="ulVideos"></ul>';
                $('#videos').append($ulVideos);

                // Loop through the videos array and pull data for each video.
                for (var i = 0; i < videos.count; i++) {

                    console.log('Video Index: ' + i);

                    // Pull url and create a List item.
                    var $url = videos.data[i].metadata.url;
                    var $liVideo = '<li class="col-xs-12 col-sm-4 ulVideosLi"><a href="' + $url + '" target="_blank"><div id="video' + i + '" class="tabVideo"></div></a></li>';
                    $('#ulVideos').append($liVideo);

                    // Determine the numerical position of video.
                    if ((_startIndex + (i + 1)) < 10) {
                        var $num = '0' + (i + 1); // If < 10 style it 01, 02, ...
                    } else {
                        var $num = ((_startIndex + i) + 1); // Otherwise keep original format.
                    };

                    // Determine the name of the game using the information in objectRelations.
                    var $objRel = videos.data[i].objectRelations;
                    var $gameName = "Unknown Game"
                    for (var j = 0; j < $objRel.length; j++) {
                        if ($objRel[j].objectType == "games" && $objRel[j].objectType != null) {
                            $gameName = $objRel[j].objectName;
                            break;
                        };
                    };

                    // Pull duration of video.
                    var $dur = videos.data[i].metadata.duration;

                    // Convert duration of video into hh:mm:ss
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

                    // Pull the actual name of the video.
                    var $name = videos.data[i].metadata.name;

                    // Construct our list information.
                    var $title =
                        '<div class="title">' +
                            '<span class="pull-left titleNum">' + $num + '</span>' +
                        '<div class="pull-left titleText">' +
                            '<span class="pull-left gameName">' + $gameName + '</span>' +
                            '<span class="pull-left videoName">' + $name + '</span>' +
                        '</div>' +
                            '<span class="pull-right titleDur">' + $longDur + '</span>' +
                        '</div>';
                    $('#video' + i).append($title);

                    // Add a bottom border to every list item except the last.
                    if (i < (videos.count - 1)) {
                        $('.ulVideosLi').addClass("liBottomBorder");
                    };

                    // Unused code for now.

                    /*var $name = '<p class="videoName">' + videos.data[i].metadata.name + '</p>';
                    $('#video' + i).append($name);*/
                    /*if (videos.data[i].metadata.networks == "ign") {
                      $('#video' + i)
                        .append($name)
                        .append($thumb);
                    } else{                   Revert comments for app develop
                      $('#video' + i)
                        .append($name);
                    };*/
                    //var $thumb = '<img src="' + videos.data[i].thumbnail + '" class="videoThumb" />';
                    //var $ignLogo = '<img src="images/ign_logo_plain.png" class="ignLogo">';
                };

                // Add "See More Videos" button
                var $temp = 'onclick=loadVideos(' + (_startIndex + 9) + ',\'empty\')';
                var $liButton =
                    '<a href="#" ' + $temp + ' class="moreVids">See More Videos</a>';
                $('#videos').append($liButton);

            }
            , type: 'GET'
        });
    };
}