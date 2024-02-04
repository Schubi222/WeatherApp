export type ResultKV = {
	features: Array<FeaturesKV>;
	timestamps: Array<string>;
};
export type PointKV = [lat: number, long: number];
export type ParameterKV = {
	name: string;
	unit: string;
	data: [number | null];
};
export type FeaturesKV = {
	type: string;
	geometry: {
		type: string;
		coordinates: PointKV;
	};
	properties: {
		parameters: ParameterNamesKV;
	};
};
//TODO:THINK OF HOW THIS SHOULD WORK WITH CHANGING NAMES?
export enum ParameterNames {
	MIN_TEMPERATURE = 'mnt2m',
	MAX_TEMPERATURE = 'mxt2m',
	RELATIVE_HUMIDITY = 'rh2m',
	TOTAL_RAIN = 'rr_acc',
	SNOW = 'snow',
	SUN_DURATION = 'sundur_acc',
	TEMPERATURE = 't2m',
	WIND_SPEED = 'u10m',
	MAX_WIND_SPEED = 'vgust'
}

type ParameterNamesKV = {
	[key in ParameterNames]: ParameterKV;
};
export type ParameterNamesKVStrings = keyof typeof ParameterNames;
