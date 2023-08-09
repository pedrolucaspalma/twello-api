export abstract class BaseContent {
	id: string;

	createdAt: string;

	updatedAt: string;
}

export type BaseContentType = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type DefaultPrivateFields = "createdAt" | "updatedAt";
