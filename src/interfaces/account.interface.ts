export interface IDatabaseQueries {
  findOne();
  find();
}

export interface IUserRepository extends IDatabaseQueries {}
