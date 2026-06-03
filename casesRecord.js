import { LightningElement, wire, track } from 'lwc';
import getCaseCounts from '@salesforce/apex/CaseDashboardController.getCaseCounts';
 
export default class CasesRecords extends LightningElement {
 
    @track totalOpenCases     = 0;
    @track totalResolvedCases = 0;
    @track myActiveCases      = 0;
    @track myResolvedCases    = 0;  // ← NEW
    @track doctorName         = '';
    @track isLoading          = true;
    @track hasError           = false;
 
    @wire(getCaseCounts)
    wiredData({ data, error }) {
        if (data) {
            this.totalOpenCases     = data.totalOpenCases;
            this.totalResolvedCases = data.totalResolvedCases;
            this.myActiveCases      = data.myActiveCases;
            this.myResolvedCases    = data.myResolvedCases;  // ← NEW
            this.doctorName         = data.doctorName;
            this.isLoading          = false;
            this.hasError           = false;
        } else if (error) {
            console.error('Error:', error);
            this.hasError  = true;
            this.isLoading = false;
        }
    }
 
    // Doctor's total cases (active + resolved) ← FIXED
    get totalCases() {
        return this.myActiveCases + this.myResolvedCases;
    }
 
    // Resolution rate based on doctor's own cases ← FIXED
    get resolutionRate() {
        if (this.totalCases === 0) return 0;
        return Math.round((this.myResolvedCases / this.totalCases) * 100);
    }
 
    get maxCases() {
        return Math.max(this.myActiveCases, this.totalOpenCases, this.totalResolvedCases, 1);
    }
 
    get myActiveCasesBarStyle() {
        const pct = Math.min((this.myActiveCases / this.maxCases) * 100, 100);
        return 'width:' + pct + '%';
    }
 
    get openCasesBarStyle() {
        const pct = Math.min((this.totalOpenCases / this.maxCases) * 100, 100);
        return 'width:' + pct + '%';
    }
 
    get resolvedCasesBarStyle() {
        const pct = Math.min((this.totalResolvedCases / this.maxCases) * 100, 100);
        return 'width:' + pct + '%';
    }
 
    get resolutionBarStyle() {
        return 'width:' + this.resolutionRate + '%';
    }
}