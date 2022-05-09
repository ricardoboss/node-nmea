import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export class MTW extends TalkerSentence {
	public static readonly ID: string = "MTW"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get temperature(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 2;
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 2) {
			return `Expected 2 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
