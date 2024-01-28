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
	mnt2m = 'mnt2m',
	mxt2m = 'mxt2m',
	rh2m = 'rh2m',
	rr_acc = 'rr_acc',
	snow = 'snow',
	sundur_acc = 'sundur_acc',
	t2m = 't2m',
	u10m = 'u10m',
	vgust = 'vgust'
}

type ParameterNamesKV = {
	[key in ParameterNames]: ParameterKV;
};
export type ParameterNamesKVStrings = keyof typeof ParameterNames;
