/** @format */

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");

const packageDefinition = protoLoader.loadSync("calculator.proto", {});
const calculatorProto =
  grpc.loadPackageDefinition(packageDefinition).Calculator;

const client = new calculatorProto(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Angka pertama: ", (num1) => {
  rl.question("Angka kedua: ", (num2) => {
    rl.question("Operator (+, -, *, /): ", (operation) => {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);

      switch (operation.toLowerCase()) {
        case "+":
          client.Add({ num1, num2 }, (error, response) => {
            if (!error) {
              console.log(`Result: ${response.result}`);
            } else {
              console.error(error);
            }
            rl.close();
          });
          break;
        case "-":
          client.Subtract({ num1, num2 }, (error, response) => {
            if (!error) {
              console.log(`Result: ${response.result}`);
            } else {
              console.error(error);
            }
            rl.close();
          });
          break;
        case "*":
          client.Multiply({ num1, num2 }, (error, response) => {
            if (!error) {
              console.log(`Result: ${response.result}`);
            } else {
              console.error(error);
            }
            rl.close();
          });
          break;
        case "/":
          client.Divide({ num1, num2 }, (error, response) => {
            if (!error) {
              console.log(`Result: ${response.result}`);
            } else {
              console.error(error);
            }
            rl.close();
          });
          break;
        default:
          console.log("Invalid operation");
          rl.close();
          break;
      }
    });
  });
});
