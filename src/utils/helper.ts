export const removeLeadingZeros = (num: number): string => {
	return num === 0 ? "0" : num.toString().replace(/^0+/, "");
};
