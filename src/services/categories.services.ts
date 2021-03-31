import axios from "axios";
import { IGame } from "@/types";
import { URL } from "@/constants/general";

export const fetchAndCategorizeGames = async (): Promise<
  Record<string, IGame[]>
> => {
  const res = await axios.get(URL + "/posts");
  return res.data.reduce((acc: Record<string, IGame[]>, post: IGame) => {
    return { ...acc, [post.userId]: [...(acc[post.userId] || []), post] };
  }, {});
};
