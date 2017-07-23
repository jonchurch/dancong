

exports.catchErrors = (fn) => {
	  return function(req, res, next) {
		      return fn(req, res, next).catch(next);
		    };
};


exports.pairKeys = (arr) => {
	return Object.entries(arr).map((ele) => {
			return {key: ele[0], value: ele[1] }
		})
}
