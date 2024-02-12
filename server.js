const http = require("http");
const { urlParser } = require("./urlParser");

const articles = [];

// middleware cek nilai title & description
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// handler buat artikel
const handler = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/JSON");

  const { method, url, headers } = req;

  const { path, query } = urlParser(url);

  // routing
  if (method == "POST" && path == "/articles") {
    let body = [];

    req.on("data", (chunck) => {
      body.push(chunck);
    });

    req.on("end", () => {
      try {
        body = Buffer.concat(body).toString();
        const { title, description } = JSON.parse(body);

        articles.push({
          id: getRandomInt(999999),
          title: title,
          description: description,
        });

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            status: true,
            message: "berhasil menambahkan data.",
          })
        );
      } catch (error) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            status: false,
            message: error,
          })
        );
      }
    });
  } else if (method == "PUT" && path == "/articles") {
    let body = [];

    req.on("data", (chunck) => {
      body.push(chunck);
    });

    req.on("end", () => {
      try {
        body = Buffer.concat(body).toString();
        const { id, title } = JSON.parse(body);

        for (let i = 0; i < articles.length; i++) {
          if (articles[i].id == id) {
            articles[i].title = title;

            console.log("New article added:", { title, description });
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                status: true,
                message: "berhasil update data",
              })
            );
            return;
          }
        }

        res.statusCode = 404;
        res.end(
          JSON.stringify({
            status: false,
            message: `data dengan id ${id} tidak ditemukan`,
          })
        );
      } catch (error) {
        res.statusCode = 500;
        res.end(`internal server error`);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const server = http.createServer(handler);

server.listen(3000, "localhost", () => {
  console.log("server is running!");
});
