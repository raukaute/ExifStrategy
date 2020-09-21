exports.numbers = function(report, cb) {
  const numbers = new RegExp(/\d+(\s\w+){3}/gi);
  if (report.match(numbers)) {

    return report.match(numbers).map((line) => {
      return cb('h4', line);
    });
  }
};

exports.unchanged = function(report, cb) {
  const unchanged = new Set();
  if (report.match(/(\/\w+){2}.+\.\w+/g)) {
  report.match(/(\/\w+){2}[^/]+\.\w+/g).forEach((match) => {
    unchanged.add(match.replace(/\//, '...'));
  });
    // console.log(report.match(/(\/\w+){2}[^/]\.\w+/g));
    return cb(
      'ul',
      [...unchanged].map((i) => {
        return cb('li', i);
      })
    );
  }
};

exports.reason = function(report, cb) {
  if (report.match(/Warning:(\s\w+,?)+(?![:upper:])/)) {

    return cb('p',
      [
        cb('h4', 'Reason: '),
        cb('span',
          report
            .match(/Warning:(\s\w+,?)+(?![:upper:])/)[0]
            .replace('Warning:', '')
            .replace('from', '')
        ),
      ]
    );
  }
};
