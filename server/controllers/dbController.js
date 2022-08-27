const pool = require("../helpers/db");

class DatabaseController {
  pool;
  constructor() {
    if (!this.pool) {
      this.pool = require("../helpers/db");
    } else {
      this.pool = this.pool;
    }
  }

  //ASYNC
  async doQuery(query, values) {
    try {
      //Check if query string given
      if (!(typeof query === "string")) {
        throw new Error("Query must be a strign!");
      }
      //If no values given values = empty array
      if (values === undefined) {
        values = [];
      }
      //Check if values is an array of values
      if (!Array.isArray(values)) {
        throw new Error("values must be an array!");
      }

      return this.pool.query(query, values);
    } catch (err) {
      console.error(`ERROR@DataBaseController`);
      console.log(`Method:query`);
      console.log(`ERROR-MESSAGE: ${err.message}`);
      throw err;
    }
  }

  //SYNC
  parseResultToArray(queryResult) {
    try {
      //Check if incoming type is a promise
      if (
        typeof queryResult !== "object" &&
        typeof queryResult.then !== "function"
      ) {
        throw new Error("Query Result Must be a Promise!");
      }
      //Put elemets of promis in array
      let array = [];
      for (const element of queryResult) {
        array.push(element);
      }
      return array;
    } catch (err) {
      console.error(`ERROR@DataBaseController`);
      console.log(`Method:parseResultToArray`);
      console.log(`ERROR-MESSAGE:${err.message}`);
      throw err;
    }
  }
}
const dbcontroller = new DatabaseController();
module.exports = dbcontroller;
