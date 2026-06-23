import { deleteAsync } from "del";

export default async function cleanPath(paths) {
  await deleteAsync(paths);
}