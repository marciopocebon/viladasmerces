function Helper(){}

Helper.renderizar = function( json, html ){

    for (var key in json) {
        var regularExpression = new RegExp('\{'+key+'\}', 'ig');
        var content = json[key];

        html = html.replace(regularExpression, content);
    }

    return html;
};