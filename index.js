var toAscii85 = function() {
  return this.split('')
    .map((item) => item.charCodeAt())
    .reduce(function(memo, item, index) {
      if (index % 4 === 0) {
        memo.push([item]);
      } else {
        memo.slice(-1)[0].push(item);
      }
      return memo;
    }, [])
    .map(function(item) {
      var debt = 4-item.length;

      if (item.length < 4) {
        while (item.length < 4) {
          item.push(0);
        }
      }

      item = item[0]*Math.pow(2,24)+item[1]*Math.pow(2,16)+item[2]*Math.pow(2,8)+item[3];

      var l = [];

      for (var i=4; i>=0; i--) {
        var step = 0;
        for (var j=0; j<l.length; j++) {
          step += l[j]*Math.pow(85, 4-j);
        }
        step = Math.floor((item - step)/Math.pow(85,i));

        l.push(step);
      }

      if (debt > 0) {
        l = l.slice(0, -debt);
      }

      return l;
    })
    .map((item) => (item.reduce((memo, item) => memo+item, 0) === 0 && item.length === 5) ? ['z'] : item)
    .reduce((memo, item) => memo.concat(item), [])
    .map((item) => (item !== 'z') ? item + 33 : 'z')
    .map((item) => (item !== 'z') ? String.fromCharCode(item) : 'z')
    .join('')
    .replace(/^/, '<~')
    .concat("~>")
  ;
};

var fromAscii85 = function() {
  return this.replace(/^<\~|\~>$/g, '')
    .replace(/[ \n\t]/g, "")
    .split('')
    .reduce((memo, item) => (item === 'z') ? memo.concat("!!!!!".split('')) : memo.concat([item]), [])
    .map((item) => item.charCodeAt())
    .map((item) => item - 33)
    .reduce(function(memo, item, index) {
      if (index % 5 === 0) {
        memo.push([item]);
      } else {
        memo.slice(-1)[0].push(item);
      }

      return memo;
    }, [])
    .map(function(item) {
      var debt = 5 - item.length;

      if (item.length < 5) {
        while (item.length < 5) {
          item.push('u'.charCodeAt());
        }
      }

      var sum = item.reduce((memo, item, index) => memo + (item*Math.pow(85,(4-index))), 0);
      var l = [0,0,0,0].map((_, index) => (sum>>(8*(3-index)) & 0xFF));

      if (debt > 0) {
        l = l.slice(0, -debt);
      }

      return l;
    })
    .reduce((memo, item) => memo.concat(item), [])
    .map((item) => String.fromCharCode(item))
    .join('')
  ;
};

exports.toAscii85 = toAscii85;
exports.fromAscii85 = fromAscii85;
