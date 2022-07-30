var copy = require('copy');
var path = require('path');
console.log(1);
console.log(process.cwd());
var src =[
    getCurrenPath('/**/*.*'),
    '!' + getCurrenPath('/node_modules/**/*.*'),
    '!' + getCurrenPath('/copy/**/*.*'),
]
copy(src, '/Users/linz/Documents/linz/xiaoyao_work/vue-multi/hldy', function(err, files) {
  if (err) throw err;
  // `files` is an array of the files that were copied 
  console.log('copy ok');
});

function getCurrenPath (str) {
    return path.join(process.cwd(), str);
}