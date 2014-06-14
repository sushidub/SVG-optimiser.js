// http://stackoverflow.com/questions/6507293/convert-xml-to-string-with-jquery
function xmlToString(xmlData) { 
    var xmlString;
    if (window.ActiveXObject){
        // IE
        xmlString = xmlData.xml;
    } else {
        // Mozilla, Firefox, Opera, etc.
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}

// Parse an SVG string as XML
function stringToXML(svgString) {
    // Replace any leading whitespace which will mess up XML parsing
    svgString =  svgString.replace(/^[\s\n]*/, "");

    if (!svgString) { return; }

    // Parse SVG as XML
    var svgDoc;
    try {
        svgDoc = $.parseXML(svgString);
    } catch (err) {
        alert("Unable to parse SVG")
    }

    return svgDoc;
}

// Get an SVG from the server and add a string version to textarea
// Quite inefficient as we're going to convert it back to a XML object later.
function getExampleSVG(filename) {
    $.get("examples/" + filename + ".svg", function(data) {
        $("#input-svg").val(xmlToString(data));
    });
}

// Get SVG string from textarea with given id
// Parse as XML and convert to jQuery object
function loadSVG(id) {
    var svgStr = $('#input-svg').val()
    var svgDoc = stringToXML(svgStr);

    if (!svgDoc) { return; }

    var jQuerySVG = $(svgDoc).children()[0];
    var svgObj = new SVG_Object(jQuerySVG);

    console.log(svgObj);
}