import { ObjectId } from "mongoose";
import { MUser } from "./../models/MUser.js";
import graphqlFields from "graphql-fields";
import { IUser } from "../types/IUsers.js";
import pkg from "mongoose";
const { mongo } = pkg;

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUsers = async (_: any, data: any, body: any, select: any) => {
  let promises: Promise<any>[] = [];
  let take = select.variableValues?.take ?? 10;
  let skip = select.variableValues?.skip ?? 0;
  let sort = select.variableValues?.sort;
  let order = select.variableValues?.order;
  let search = select.variableValues?.search;

  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList.docs ?? {});
  if (keys.length)
    promises.push(
      MUser.find(
        {
          ...(search
            ? {
                $or: [
                  {
                    name: {
                      $regex: search,
                      $options: "i",
                    },
                  },
                  {
                    email: {
                      $regex: search,
                      $options: "i",
                    },
                  },
                ],
              }
            : {}),
        },
        keys.join(" "),
        {
          limit: take,
          skip,

          ...(sort
            ? {
                sort: {
                  [sort]: order == "asc" ? 1 : -1,
                },
              }
            : {}),
        }
      )
        .lean()
        .exec()
    );

  if (fieldList.count) {
    promises.push(
      MUser.countDocuments({
        ...(search
          ? {
              $or: [
                {
                  name: {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  email: {
                    $regex: search,
                    $options: "i",
                  },
                },
              ],
            }
          : {}),
      })
        .lean()
        .exec()
    );
  }

  const [user, count] = await Promise.all(promises);
  return {
    docs: user ?? [],
    count: count ? count : Array.isArray(user) ? 0 : user,
  };
};

/**
 * @description Adds User
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const upsertUser = async (
  _: any,
  data: { input: IUser },
  body: any,
  select: any
) => {
  const userData = data.input;
  const _id: any = data.input._id ?? new mongo.ObjectId();
  delete userData._id;
  const user = await MUser.findOneAndUpdate(
    { _id: _id },
    { $set: userData },
    { upsert: true, new: true }
  );
  return user;
};

/**
 * @description
 */

export const deleteUser = async (
  _: any,
  data: { input: number },
  body: any,
  select: any
) => {
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);

  const user = await MUser.findOneAndDelete(
    { _id: data.input },
    { projection: keys.join(" ") }
  );
  return user;
};

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUser = async (_: any, data: any, body: any, select: any) => {
  let id = select.variableValues.id;
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);
  const user = await MUser.findById(id, keys.join(" "));
  return user;
};
