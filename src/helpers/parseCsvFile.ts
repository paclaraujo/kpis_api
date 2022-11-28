import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

let stream = fs.createReadStream(path.resolve("src/infra/users.csv"));
let csvData: any = [];
let csvStream = csv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    csvData.shift();
  });

stream.pipe(csvStream);

export { csvData };
