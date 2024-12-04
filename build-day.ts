import fs from "fs";
import path from "path";

const folderName = process.argv[2];

if (!folderName) {
	console.error("Please provide a folder name as the first argument.");
	process.exit(1);
}

const folderPath = path.join(__dirname, folderName);

fs.mkdirSync(folderPath, { recursive: true });

const files = [
	{ name: "part-1-solution.ts", content: "module.exports = (input: String) => null;" },
	{ name: "part-2-solution.ts", content: "module.exports = (input: String) => null;" },
	{ name: "puzzle.txt", content: "" },
];

files.forEach((file) => {
	const filePath = path.join(folderPath, file.name);
	fs.writeFileSync(filePath, file.content);
});

console.log(`Folder '${folderName}' and files created successfully.`);
