const { getFieldsByStatus, rezervField, checkAvailability } = require("../services/sevices");

const getFields = async (req, res) => {
	const { is_available } = req.body;
	const data = await getFieldsByStatus(is_available);
	res.status(200).json({ data });
};

const getRezerv = async (req, res) => {
	try {
		const { field_id, start_time, end_time } = req.body;
		const data = await rezervField(field_id, start_time, end_time);
		res.status(200).json({ data });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getAvailability = async (req, res) => {
	try {
		const { field_id, start_time, end_time } = req.body;
		const available = await checkAvailability(field_id, start_time, end_time);
		res.status(200).json({
			available,
			message: available ? "زمین خالی است" : "زمین رزرو شده است",
		});
	} catch (err) {
		res.status(500).json({ message: "خطا در بررسی بازه زمانی" });
	}
};

module.exports = { getFields, getRezerv, getAvailability };
