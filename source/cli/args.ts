/**
 * Parse CLI arguments.
 * @param {Array<string>} argv - Expected to be process.argv
 * @param {boolean} expectUnlabeled - Is the command line expected to have
 * at least one trailing argument that is not labeled?
 */
export const parseArgv = (
	argv: Array<string>,
	expectUnlabeled = false,
): { "": Array<string> | undefined } & Record<
	string,
	boolean | string | Array<string>
> =>
	argv.slice(2).reduce(
		(acc, _) => {
			let slot: string;
			let value: string | true;

			if (_ === "--") {
				expectUnlabeled = true;
				return acc;
			}

			if (!_.startsWith("--")) {
				if (acc.prev === undefined || expectUnlabeled) {
					slot = "";
				} else {
					slot = acc.prev;
					acc.prev = undefined;
				}
				value = _;
			} else {
				const argument = _.substring(2);
				const parts = argument.match(/^(?<name>[^=]+)=?(?<value>.*)$/);
				if (parts === null || parts.groups === undefined) {
					return acc;
				}

				slot = parts.groups.name ?? parts.groups.value;
				value =
					typeof parts.groups.value === "string" && parts.groups.value !== ""
						? parts.groups.value
						: true;
				if (parts.groups.value === "") {
					acc.prev = slot;
				}
			}

			const argSlot = acc.args[slot];
			if (
				(Array.isArray(argSlot) || typeof argSlot === "string") &&
				value === true
			) {
				return acc;
			}

			acc.args[slot] =
				Array.isArray(argSlot) && typeof value === "string"
					? [...argSlot, value]
					: slot === "" && typeof value === "string"
						? [value]
						: typeof argSlot === "undefined" || typeof value === "boolean"
							? value
							: typeof argSlot === "boolean"
								? value
								: [...(Array.isArray(argSlot) ? argSlot : [argSlot]), value];

			return acc;
		},
		{ args: {} } as {
			args: { "": Array<string> | undefined } & Record<
				string,
				boolean | string | Array<string>
			>;
			prev?: string | undefined;
		},
	).args;
