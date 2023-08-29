import { BaseUserModel } from "./BaseUser";

export class AdminModel extends BaseUserModel {
  constructor() {
    super("isAdmin");
  }
}
