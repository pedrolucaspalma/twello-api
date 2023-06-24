import { DecodedTokenUserPayload } from "../UserTypes";

declare module "express-serve-static-core" {
	interface Request {
		user: DecodedTokenUserPayload;
	}
}
