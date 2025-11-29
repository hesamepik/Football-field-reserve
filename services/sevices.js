const Repo = require("../repo/model");

const getFieldsByStatus = async (is_available) => {
	return await Repo.getFieldsByAvailability(is_available);
};

const rezervField = async (field_id, start_time, end_time) => {
	await Repo.releaseExpiredReservations();

	const isFree = await Repo.checkFieldAvailability(field_id, start_time, end_time);
	if (!isFree) throw new Error("زمین رزرو شده است");

	return await Repo.reserveField(field_id, start_time, end_time);
};

const checkAvailability = async (field_id, start_time, end_time) => {
	await Repo.releaseExpiredReservations();
	const isFree = await Repo.checkFieldAvailability(field_id, start_time, end_time);
	return isFree;
};

module.exports = { getFieldsByStatus, rezervField, checkAvailability };
