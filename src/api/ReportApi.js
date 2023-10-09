import BaseApi from './BaseApi';
const ENDPOINT = 'client-api/v1/'
class ReportApi extends BaseApi {
    createJudgement(params = {}) {
        return this.post(`${ENDPOINT}quarter-report`, params)
    }
    trackingStatusJudgement(params = {}) {
        return this.get(`${ENDPOINT}quarter-report/status`, params)
    }
    createSelfEvaluation(reportId, params = {}) {
        return this.post(`${ENDPOINT}quarter-report/${reportId}/self-evaluation`, params)
    }
}

export default new ReportApi()