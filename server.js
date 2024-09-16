/** @format */

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("calculator.proto", {});
const calculatorProto =
  grpc.loadPackageDefinition(packageDefinition).Calculator;

const server = new grpc.Server();

server.addService(calculatorProto.service, {
  Add: (call, callback) => {
    const num1 = call.request.num1;
    const num2 = call.request.num2;
    const result = num1 + num2;
    callback(null, { result });
  },
  Subtract: (call, callback) => {
    const num1 = call.request.num1;
    const num2 = call.request.num2;
    const result = num1 - num2;
    callback(null, { result });
  },
  Multiply: (call, callback) => {
    const num1 = call.request.num1;
    const num2 = call.request.num2;
    const result = num1 * num2;
    callback(null, { result });
  },
  Divide: (call, callback) => {
    const num1 = call.request.num1;
    const num2 = call.request.num2;
    if (num2 === 0) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Division by zero is not allowed",
      });
    } else {
      const result = num1 / num2;
      callback(null, { result });
    }
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC server running on port 50051");
    server.start();
  }
);
