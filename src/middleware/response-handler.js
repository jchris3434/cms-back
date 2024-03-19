exports.responseHandler = (input, message) => {
  return new Promise((resolve, reject) => {
    if (input === null) {
      console.error("Not Found");
      return reject({
        status: 404,
        error: "Not Found",
        details: "Resource not found",
      });
    } else if (Array.isArray(input) || typeof input === "object") {
      console.log("Success: ", message, input);
      return resolve({ success: true, data: input, message: message });
    } else if (input instanceof Error) {
      let status = 500; // Default status code for errors
      let errorMessage = input.message || "Unknown error";

      if (input.response?.status) {
        status = input.response.status;
        errorMessage = input.response.data.message || errorMessage;
      }
      console.error("Error:", errorMessage);
      return reject({
        status: status,
        error: "Error processing request",
        details: errorMessage,
      });
    } else {
      console.error("Unhandled scenario:", input);
      return reject({
        status: 500,
        error: "Unhandled scenario",
        details: input,
      });
    }
  });
};
