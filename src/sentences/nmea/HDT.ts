import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export interface IDataFieldsParsedHDT {
	heading: number;
}

export class HDT extends TalkerSentence {
	public static readonly ID: string = "HDT"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get dataFieldsParsed(): IDataFieldsParsedHDT {
		return {
			heading: this.heading
		}
	}

	public get heading(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 2 && this.dataFields[1] === 'T';
	}
}
