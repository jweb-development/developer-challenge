/** @format */

const { db } = require('../utils')

const users = {
  getUsers: async () => {
    try {
      const userQuery = `
       SELECT u.userID, u.firstName, u.lastName, u.isActive, u.createdDate, r.name as roleName
        FROM user u
        JOIN user_role ur
          ON ur.userID = u.userID
        JOIN role r
          ON r.roleID = ur.roleID
      `

      const userRes = await db.query(userQuery)

      if (userRes) {
        return userRes
      }

      return false
    } catch (err) {
      console.log(err)
      return false
    }
  },
  getUser: async userID => {
    try {
      const userQuery = `
        SELECT u.userID, u.firstName, u.lastName, u.isActive, u.createdDate, r.name as roleName
        FROM user u
        JOIN user_role ur
          ON ur.userID = u.userID
        JOIN role r
          ON r.roleID = ur.roleID
        WHERE u.userID = '${userID}'
      `

      const userRes = await db.query(userQuery)

      if (userRes) {
        return userRes
      }

      return false
    } catch (err) {
      console.log(err)
      return false
    }
  },

  deleteUser: async userID => {
    try {
      const userQuery = `
        DELETE FROM user WHERE UserID ='${userID}'
      `

      const userRes = await db.query(userQuery)

      if (userRes) {
        return userRes
      }

      return false
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export { users }
