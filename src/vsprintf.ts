import { SprintfArg } from "./specifier-processor.js";
import { sprintf } from "./sprintf.js";

export const vsprintf = (format: string, args: SprintfArg[]) => {
	return sprintf.apply(null, [format, ...args]);
}