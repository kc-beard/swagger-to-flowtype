// @flow
export type Order = {
  id?: number,
  petId?: number,
  quantity?: number,
  shipDate?: string,
  status?: "placed" | "approved" | "delivered",
  complete?: boolean
};
export type Category = { id?: number, name?: string };
export type User = {
  id?: number,
  username?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  phone?: string,
  userStatus?: number
};
export type Tag = { id?: number, name?: string };
export type Pet = {
  id?: number,
  category?: Category,
  name: string,
  photoUrls: Array<string>,
  tags?: Array<Tag>,
  status?: "available" | "pending" | "sold"
};
export type ApiResponse = { code?: number, type?: string, message?: string };
export type IGenericCollection_Pet_ = { items?: Array<Pet> };
export type IGenericCollection_String_ = { items?: Array<string> };
