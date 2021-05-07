import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {DateOnly, Latitude, Longitude, TimeOnly} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseTime = Helpers.parseTime;
import parseDate = Helpers.parseDate;

export enum RmcMode {
	Autonomous = "A",
	Differential = "D",
	Estimated = "E",
	FloatRTK = "F",
	Manual = "M",
	NoFix = "N",
	Precise = "P",
	RTK = "R",
	Simulator = "S",
}

export class RMC extends TalkerSentence {
	public static readonly ID: string = "RMC"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[0]);
	}

	public get active(): boolean {
		return this.dataFields[1] === 'A';
	}

	public get latitude(): Latitude {
		return parseFloat(this.dataFields[2]);
	}

	public get north(): boolean {
		return this.dataFields[3] === 'N';
	}

	public get longitude(): Longitude {
		return parseFloat(this.dataFields[4]);
	}

	public get east(): boolean {
		return this.dataFields[5] === 'E';
	}

	public get speedOverGround(): number {
		return parseFloat(this.dataFields[6]);
	}

	public get trackingAngle(): number {
		return parseFloat(this.dataFields[7]);
	}

	public get date(): DateOnly {
		return parseDate(this.dataFields[8]);
	}

	public get magneticVariation(): number {
		const degrees = parseFloat(this.dataFields[9]);
		const east = this.dataFields[10] === 'E';

		return (east ? -1 : 1) * degrees;
	}

	public get mode(): RmcMode|null {
		if (this.dataFields.length === 11)
			return null;

		return this.dataFields[11] as RmcMode;
	}

	public get valid(): boolean {
		const fieldCount = this.dataFields.length;

		return super.valid && (fieldCount === 11 || fieldCount === 12);
	}
}
