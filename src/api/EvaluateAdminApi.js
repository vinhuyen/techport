import BaseApi from './BaseApi';

const ENDPOINT = "client-api/v1";

class EvaluateAdminApi extends BaseApi {
    getListEvaluate(params = {}) {
        return this.get(`${ENDPOINT}/quarter-report`, params);
    }
    getDetailsEvaluate(id) {
        return this.get(`${ENDPOINT}/quarter-report/${id}`)
    }
}

export default new EvaluateAdminApi();