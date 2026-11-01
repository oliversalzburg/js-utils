export const POSIX_CHARACTER_CLASS_ALNUM = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
] as const;
export type ALNUM = (typeof POSIX_CHARACTER_CLASS_ALNUM)[number];
export type PosixOption = {
	argument?: string;
	help: string;
	required?: boolean;
};
export type PosixOptions = Partial<Record<ALNUM, PosixOption>> & {
	operands?: number;
};
export type PosixOptionsMutex = Array<PosixOptions>;

const _example: PosixOptionsMutex = [
	{
		v: { help: "Show version" },
	},
	{
		c: { argument: "all-lands.jsonl", help: "Scryfall cards JSONL export." },
		d: { help: "Print debug information", required: false },
		p: {
			argument: "cardmarket_ids.json",
			help: "MTGJSON-provided CardMarket product IDs JSON file.",
		},
		s: { argument: "sets.json", help: "Scryfall sets API response." },
	},
];

export const synopsis = () => {};
