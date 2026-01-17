import { apiClient } from "../api/apiClient";
import { API_CONFIG, SERVICES_API_URL } from "../config/api";




class ProductService {
    async getMeasurementList(orgId: string,
        divisionId: string) {
        try {
            const url = API_CONFIG.BASE_URL.app + orgId + '/' + divisionId + API_CONFIG.ENDPOINTS.PRODUCT.measurementlist;
            // console.log("getMeasurementList url", url)

            const response = await apiClient.get(url);
            // console.log("getMeasurementList response", response)
            return { success: true, data: response?.data?.data?.response_data?.measurements_list || [] };

        } catch (error) {
            // errorHandler(error);
            throw error; // Re-throw the error after handling it
        }

    }
    async getKPIStatusList(orgId: string,
        divisionId: string) {
        try {
            const url = API_CONFIG.BASE_URL.app + orgId + '/' + divisionId + API_CONFIG.ENDPOINTS.PRODUCT.kpi_status_list;
            // console.log("getKPIStatusList url", url)

            const response = await apiClient.get(url);
            // console.log("response?.data?.data?.response_data?.kpi_status_list ", response?.data?.data?.response_data?.kpi_status_list)
            return { success: true, data: response?.data?.data?.response_data?.kpi_status_list || [] };

        } catch (error) {
            // errorHandler(error);
            throw error; // Re-throw the error after handling it
        }

    }
}

export const productService = new ProductService()
