const querystring = require("node:querystring");

/**
 * @param {string} url
 * @returns {object}
 */
function urlParser(url) {
  let path = "/";
  let query = {};
  if (url.includes("?")) {
    const parsedUrl = url.split("?");
    path = parsedUrl[0];
    if (parsedUrl.length > 1) {
      query = parsedUrl[1];
    }
  } else {
    const parsedUrl = url.split("?");
    path = parsedUrl[0];
  }

  console.log(path, querystring.parse(query));

  return {
    path: path,
    query: querystring.parse(query),
  };
}

module.exports = { urlParser };
