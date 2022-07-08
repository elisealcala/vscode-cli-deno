import { Select, colors, Input, ensureFile } from "./deps.ts";
import { Directory } from "./type.ts";

const fileForStoringPath = "./users.txt";

await ensureFile(fileForStoringPath);

let userPath = await Deno.readTextFile(fileForStoringPath);

if (!userPath || Deno.args[0] === "-p") {
  const folderPath: string = await Input.prompt({
    message: "What's your folder path",
    hint: colors.rgb24("Make sure to enter a valid path 😉", 0xffff00),
  });

  await Deno.writeTextFile("./users.txt", folderPath);

  userPath = folderPath;
}

const exists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error) {
      console.log(
        colors.rgb24("Sorry, something went wrong 🫣 ", 0xff3333),
        error.message
      );
      Deno.exit(1);
    }
    throw error;
  }
};

await exists(userPath);

const getAllDirectories = async () => {
  const entries: Directory[] = [];

  for await (const dirEntry of Deno.readDir(userPath)) {
    if (dirEntry.isDirectory) {
      for await (const childEntry of Deno.readDir(
        `${userPath}/${dirEntry.name}`
      )) {
        if (childEntry.isDirectory) {
          entries.push({
            ...childEntry,
            path: `${userPath}/${dirEntry.name}/${childEntry.name}`,
          });
        }
      }
    }
  }

  return entries;
};

const directories = await getAllDirectories();

const result: string = await Select.prompt({
  message: colors.bold.underline.rgb24(
    "Select one directory to open on vs code 🫡",
    0xff3333
  ),
  search: true,
  listPointer: colors.bold.underline.rgb24("~", 0xff33ff),
  options: directories.map((i) => ({
    name: colors.bold.underline.rgb24(i.name, 0xff33ff),
    value: i.path,
  })),
});

await Deno.run({ cmd: ["code", result] }).status();
