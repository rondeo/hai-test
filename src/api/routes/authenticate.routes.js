const express = require("express")
const authenticateController = require("../controllers/authenticate.controllers")
const authenticateRouter = express.Router();
authenticateRouter.post("", authenticateController.login);
authenticateRouter.post("/register", authenticateController.register);
authenticateRouter.put("", authenticateController.update);
authenticateRouter.get("/verify-session", authenticateController.verifySession);
authenticateRouter.put("/socket", authenticateController.updateSocket);
authenticateRouter.get("/users", authenticateController.getAll);
module.exports = authenticateRouter;