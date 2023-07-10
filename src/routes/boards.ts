import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";

const boardController = ControllersFactory.makeBoardController();

const router = express.Router();

router.post(
	"/create",
	authenticationMiddleware(),
	boardController.createBoard()
);

router.get("/:boardId", authenticationMiddleware(), boardController.getBoard());

router.delete(
	"/:boardId",
	authenticationMiddleware(),
	boardController.deleteBoard()
);

router.get(
	"/:id/maintainers",
	authenticationMiddleware(),
	boardController.listBoardMaintainers()
);

router.post(
	"/:id/share",
	authenticationMiddleware(),
	boardController.createAssociationWithUser()
);

router.put(
	"/:id/update",
	authenticationMiddleware(),
	boardController.updateBoard()
);

router.put(
	"/:relationId/edit-relation",
	authenticationMiddleware(),
	boardController.updateAssociationWithUser()
);

router.delete(
	"/:relationId/remove-maintainer",
	authenticationMiddleware(),
	boardController.deleteAssociationWithUser()
);

export default router;
