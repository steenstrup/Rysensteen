function show(tag, link) {
    $(tag).html('<iframe id="iframe" src="https://www.khanacademy.org/computer-programming/embedded-pages/' + link + '/embedded?editor=no&buttons=yes&author=yes&embed=yes" width="400" height="400"></iframe>');
};

function hite(tag) {
    $(tag).html('');
};

function CSVtoArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    //if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function (m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
};


function CSVToKhan(csv) {
    var allTextLines = csv.split('\n');
    var headers = CSVtoArray(allTextLines[0]);
    var lines = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = CSVtoArray(allTextLines[i]);

        document.write("<p>" + data[4] + "</p>");

        document.write('<button onclick="show(\'#ifram' + i + '\', \'' + data[5] + '\')"> Show </button>');
        document.write('<button onclick="hite(\'#ifram' + i + '\')"> Close </button>');
        document.write('<div id="ifram' + i + '"></div>');

        document.write("<p>" + data[6] + "</p>");

        document.write("<p>" + data[3] + "</p>");

        document.write("<p>Made using: Khan Academy Computer Science</p>");

        document.write("<p>------------------------------------------------------------------</p>");
    }
}