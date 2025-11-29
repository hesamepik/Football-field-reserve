const pool = require("../db/mysql");
const { v4: uuidv4 } = require("uuid");

class Repo {
	static getAllFields = async () => {
		const [rows] = await pool.query(`SELECT * FROM fields`);
		return rows;
	};

	static getFieldsByAvailability = async (is_available) => {
		const [rows] = await pool.query(`SELECT * FROM fields WHERE is_available = ?`, [is_available]);
		return rows;
	};

	static reserveField = async (field_id, start_time, end_time) => {
		const id = uuidv4();
		await pool.query(`INSERT INTO rezerv (id, field_id, start_time, end_time) VALUES (?, ?, ?, ?)`, [
			id,
			field_id,
			start_time,
			end_time,
		]);
		await pool.query(`UPDATE fields SET is_available = 0 WHERE id = ?`, [field_id]);
		return { id, field_id, start_time, end_time };
	};

	static checkFieldAvailability = async (field_id, start_time, end_time) => {
		const [rows] = await pool.query(
			`SELECT * FROM rezerv 
             WHERE field_id = ? AND start_time < ? AND end_time > ?`,
			[field_id, end_time, start_time]
		);
		return rows.length === 0;
	};

	static releaseExpiredReservations = async () => {
		const [expired] = await pool.query(`SELECT field_id FROM rezerv WHERE end_time <= NOW()`);
		for (const r of expired) {
			await pool.query(`UPDATE fields SET is_available = 1 WHERE id = ?`, [r.field_id]);
		}
		await pool.query(`DELETE FROM rezerv WHERE end_time <= NOW()`);
	};
}

module.exports = Repo;
