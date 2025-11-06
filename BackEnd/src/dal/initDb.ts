import { Database as DB } from "better-sqlite3";
import { openDb, runQuery } from "./dal";


function initDbSchema(db: DB): void {

    const ddl = `
    CREATE TABLE IF NOT EXISTS teamDev(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupName TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS meeting (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupId INTEGER NOT NULL,
        meetingStartDate DATE NOT NULL,
        meetingEndDate DATE NOT NULL,
        description TEXT NOT NULL,
        meetingRoom TEXT NOT NULL,

        FOREIGN KEY(groupId) REFERENCES teamDev(id) ON DELETE CASCADE
    );
  `;

    db.exec("BEGIN");
    try {
        db.exec(ddl);
        db.exec("COMMIT");
    } catch (e) {
        db.exec("ROLLBACK");
        throw e;
    }
}

function generateSampleData() {

    // --- teamDev ---
    runQuery("INSERT INTO teamDev (groupName) VALUES ('Frontend Team');");
    runQuery("INSERT INTO teamDev (groupName) VALUES ('Backend Team');");
    runQuery("INSERT INTO teamDev (groupName) VALUES ('Mobile Team');");
    runQuery("INSERT INTO teamDev (groupName) VALUES ('QA Team');");
    runQuery("INSERT INTO teamDev (groupName) VALUES ('DevOps Team');");

    // --- meeting ---
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (1, '2025-11-10 09:00:00', '2025-11-10 10:00:00', 'Frontend weekly sync', 'Room A');");
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (1, '2025-11-17 14:00:00', '2025-11-17 15:00:00', 'Frontend sprint review', 'Room A');");

    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (2, '2025-11-11 11:00:00', '2025-11-11 12:30:00', 'Backend architecture meeting', 'Room B');");
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (2, '2025-11-18 16:00:00', '2025-11-18 17:00:00', 'Backend bug triage', 'Room B');");

    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (3, '2025-11-12 10:00:00', '2025-11-12 11:30:00', 'Mobile app planning', 'Room C');");
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (3, '2025-11-19 15:00:00', '2025-11-19 16:30:00', 'Mobile design review', 'Room C');");

    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (4, '2025-11-13 09:30:00', '2025-11-13 11:00:00', 'QA automation planning', 'Room D');");
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (4, '2025-11-20 13:00:00', '2025-11-20 14:30:00', 'QA regression results', 'Room D');");

    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (5, '2025-11-14 08:00:00', '2025-11-14 09:00:00', 'DevOps deployment discussion', 'Room E');");
    runQuery("INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom) VALUES (5, '2025-11-21 15:30:00', '2025-11-21 16:30:00', 'DevOps monitoring review', 'Room E');");
}

console.log("Starting init DB");

openDb().then((db) => {
    initDbSchema(db);
    console.log("Done init DB");
})
// generateSampleData();