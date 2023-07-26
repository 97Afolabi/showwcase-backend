import { injectable } from "inversify";
import { BaseRepository } from "../../../config/base-repository";

@injectable()
export default class UserRepository extends BaseRepository {}
