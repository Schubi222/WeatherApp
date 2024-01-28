export type ResultKV = {
	features: Array<FeaturesKV>;
};
type PointKV = [lat: number, long: number];
type ParameterKV = {
	name: string;
	unit: string;
	data: [];
};
type FeaturesKV = {
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
enum ParameterNames {
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
