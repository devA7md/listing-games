import axios, { AxiosResponse } from "axios";
import { from, Observable } from "rxjs";
import {
  bufferCount,
  filter,
  map,
  pluck,
  switchMap,
  take,
} from "rxjs/operators";

import { IGame, IRecommendedGame } from "@/types/games.types";
import { URL } from "@/constants/general";

export const fetchAndCategorizeGames = async (): Promise<
  Record<string, IGame[]>
> => {
  const res = await axios.get(URL + "/posts");
  return res.data.reduce((acc: Record<string, IGame[]>, post: IGame) => {
    return { ...acc, [post.userId]: [...(acc[post.userId] || []), post] };
  }, {});
};

export const injectSomeData = (obj: any): any => {
  // this will generate a year like 2015, 2010, 2009...
  // between 2001 and 2020
  const randomYear = Number(
    20 + (0 + Math.floor(Math.random() * 20).toString()).slice(-2)
  );

  return {
    ...obj,
    year: randomYear,
    rating: Math.floor(Math.random() * 100),
    price: (Math.random() * 1e3).toFixed(2),
    views: Math.floor(Math.random() * 1e4),
    comments: Math.floor(Math.random() * 1e4),
  };
};

export const mostRecommendedFilter = (obj: any): boolean => {
  // will assume that most recommended ones those
  // with low price and high rating, views and comments number
  const hasGoodRating = obj.rating > 50;
  const hasMuchViews = obj.views > 200;
  const hasMuchComments = obj.comments > 200;
  const hasLowPrice = obj.price < 200;

  return hasGoodRating && hasMuchViews && hasMuchComments && hasLowPrice;
};

export const mostPopularFilter = (obj: any): boolean => {
  // will assume that most popular ones those
  // with high views and comments and good rating
  const hasGoodRating = obj.rating > 75;
  const hasMuchViews = obj.views > 500;
  const hasMuchComments = obj.comments > 500;

  return hasGoodRating && hasMuchViews && hasMuchComments;
};

export const fetchAndTransformGames = (
  transformFn: (obj: any) => any,
  filterFn: (obj: any) => boolean,
  buffer: number
): Observable<any> => {
  return from(axios.get(`${URL}/posts`)).pipe(
    pluck<AxiosResponse, IGame[]>("data"),
    switchMap<IGame[], Observable<IGame>>((games) => from(games)),
    map<IGame, IRecommendedGame>(transformFn),
    filter<IRecommendedGame>(filterFn),
    bufferCount(buffer),
    take(1)
  );
};