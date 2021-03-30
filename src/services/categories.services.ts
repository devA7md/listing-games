import axios from "axios";
import { IGame } from "@/types";

export const fetchAndCategorizeGames = async (): Promise<
  Record<string, IGame[]>
> => {
  const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
  return res.data.reduce((acc: Record<string, IGame[]>, post: IGame) => {
    return { ...acc, [post.userId]: [...(acc[post.userId] || []), post] };
  }, {});
};
