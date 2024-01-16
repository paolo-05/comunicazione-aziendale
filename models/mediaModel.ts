import { db } from "./db";
import { RowDataPacket } from "mysql2";
import { MediaType } from "@/types/types";

export const Media = {
  save: async (uuid: string, title: string): Promise<boolean> => {
    await db
      .promise()
      .query<RowDataPacket[]>(
        "INSERT INTO medias (uuid, title) VALUES (?, ?)",
        [uuid, title]
      );
    return true;
  },

  getAll: async (): Promise<MediaType[]> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM medias");
    return rows[0] as MediaType[];
  },
};
