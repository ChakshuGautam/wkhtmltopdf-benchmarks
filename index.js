var wkhtmltopdf = require('wkhtmltopdf');
var { unlink, readFileSync } = require('fs');


// Read template string
const template = readFileSync('./templates/index.hbs', 'utf8');
console.log(template);

let totalBenchmakrs = 50;
let count = 0;
// start time
var start = new Date().getTime();
for (let i = 0; i < totalBenchmakrs; i++) {
    wkhtmltopdf(template,
        { output: `out${i}.pdf` }).on('end', function () {
            unlink(`out${i}.pdf`, (err) => {
                if (err) throw err;
                count += 1;
                if (count === totalBenchmakrs) {
                    var end = new Date().getTime();
                    console.log(`Total time taken: ${(end - start) / 1000} seconds`);
                    console.log(`Average time taken: ${(end - start) / (1000 * totalBenchmakrs)} seconds`);
                }
            });
        });
}
//end time


// // Stream input and output
// var stream = wkhtmltopdf(fs.createReadStream('file.html'));

// // output to a file directly
// wkhtmltopdf('http://apple.com/', { output: 'out.pdf' });

// // Optional callback
// wkhtmltopdf('http://google.com/', { pageSize: 'letter' }, function (err, stream) {
//     // do whatever with the stream
// });

// // Repeatable options
// wkhtmltopdf('http://google.com/', {
//     allow: ['path1', 'path2'],
//     customHeader: [
//         ['name1', 'value1'],
//         ['name2', 'value2']
//     ]
// });

// // Ignore warning strings
// wkhtmltopdf('http://apple.com/', {
//     output: 'out.pdf',
//     ignore: ['QFont::setPixelSize: Pixel size <= 0 (0)']
// });
// // RegExp also acceptable
// wkhtmltopdf('http://apple.com/', {
//     output: 'out.pdf',
//     ignore: [/QFont::setPixelSize/]
// });