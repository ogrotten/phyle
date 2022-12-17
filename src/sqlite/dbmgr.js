const sqlite = requre('better-sqlite3-with-prebuilds')
const db = new sqlite('./phyle.db')
exports.db = db
