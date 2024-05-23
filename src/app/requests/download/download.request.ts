import { convertDateToRequest } from 'src/app/shared/functions/helpers'

export class downloadRequest {
    private numFilter : number;
    private textFilter : string;
    private stateFilter : number;
    private startDate:string;
    private endDate:string;
    private download:boolean
    private pagination:boolean

    constructor(
        getInputs:any
        
        ){
            this.numFilter = getInputs.numFilter,
            this.textFilter = getInputs.textFilter,
            this.stateFilter = getInputs.stateFilter
            // this.startDate = getInputs.startDate == null ? null : convertDateToRequest(getInputs.startDate, 'date');
            // this.endDate = getInputs.endDate == null ? null : convertDateToRequest(getInputs.endDate, 'date');
            this.download = true
            this.pagination = false
    }
}