import { BaseUserModel } from "./BaseUser";

export default class EmployeeModel extends BaseUserModel {
  constructor() {
    super("isEmployee");
  }
}
