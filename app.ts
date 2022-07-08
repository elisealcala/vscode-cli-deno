import { Select, colors } from "./deps.ts";
import { Directory } from "./type.ts";

const path = "/Users/elizabethalcala/Sites";

const getAllDirectories = async () => {
  const entries: Directory[] = [];

  for await (const dirEntry of Deno.readDir(path)) {
    if (dirEntry.isDirectory) {
      for await (const childEntry of Deno.readDir(`${path}/${dirEntry.name}`)) {
        if (childEntry.isDirectory) {
          entries.push({
            ...childEntry,
            path: `${path}/${dirEntry.name}/${childEntry.name}`,
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
