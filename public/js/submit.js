$(function() {

  // http://stackoverflow.com/a/9102270/4804328
  function extractId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  }

  function buildApiUrl(parts, id, key) {
    var base = "https://www.googleapis.com/youtube/v3/videos";
    return base + "?part=" + parts + "&id=" + id + "&key=" + key;
  }

  $("#url").change(function() {
    var videoUrl = $(this).val();
    var id = extractId(videoUrl);
    var parts = "snippet,contentDetails";
    var key = "AIzaSyCKQFYlDRi5BTd1A-9rhFjF8Jb_Hlfnquk";
    var apiUrl = buildApiUrl(parts, id, key);

    $.get(apiUrl, function(data) {
      var item = data.items[0];
      $("#title").val(item.snippet.title);
      $("#description").val(item.snippet.description);
      $("#channelName").val(item.snippet.channelTitle);
    });
  });

  var technologies = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: './data/technologies',
      filter: function(list) {
        return $.map(list, function(technology) {
          return { name: technology.technologyName }; });
      }
    }
  });
  technologies.initialize();

  $("#technologies").tagsinput({
    maxTags: 2,
    typeaheadjs: {
        name: 'technologies',
        displayKey: 'name',
        valueKey: 'name',
        highlight: true,
        source: technologies.ttAdapter()
      }
  });

}());