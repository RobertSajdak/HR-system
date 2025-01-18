export const getNextDate = (dates: string[]) => {
	const lastDate = dates.length > 0 ? new Date(dates[dates.length - 1]) : new Date();
	const newDate = new Date(lastDate);
	newDate.setDate(newDate.getDate() + 1);
	return newDate.toISOString().split('T')[0];
};
