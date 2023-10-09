import BaseApi from './BaseApi';

const ENDPOINT = "client-api/v1/";

class ReportUserApi extends BaseApi {
    getQuarterReportList(params = {}) {
        return this.get(`${ENDPOINT}quarter-report`, params);
    }
}

export default new ReportUserApi();
