import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const folderName = process.argv[2];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!folderName) {
	console.error("Please provide a folder name as the first argument.");
	process.exit(1);
}

const folderPath = path.join(__dirname, folderName);

if (fs.existsSync(folderPath)) {
	console.log(`Folder '${folderName}' already exists. No action taken.`);
	process.exit(0);
}

fs.mkdirSync(folderPath, { recursive: true });

const files = [
	{
		name: "solution.ts",
		content: `
		function part_1(input:string){};

		function part_2(input:string){};

		export {
			part_1,
			part_2
		}

`,
	},
	{ name: "puzzle.txt", content: "" },
];

files.forEach((file) => {
	const filePath = path.join(folderPath, file.name);
	fs.writeFileSync(filePath, file.content);
});

console.log(`Folder '${folderName}' and files created successfully.`);
