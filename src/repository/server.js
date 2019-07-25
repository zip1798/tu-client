import axios from "axios";
import appConfig from "../config/app";
import store from "../store";
import * as generalRepo from "../repository/general";
import router from "../router";


export default {
	post(url, data, options, callback) {
      let config = {
          headers: {'Authorization': "Bearer " + store.getters.getToken}
      }  
      data.language = store.getters.getLanguage;

      store.dispatch("CLEAR_MESSAGES");
      store.dispatch("SET_PROCESSING", true);
      axios
        .post(appConfig.api + url, data, config)
        .then(response => {
           store.dispatch("SET_PROCESSING", false);
           // response.status = 200
           if (response.error) {
             throw new Error(response.error);
           }
           callback(response);
        })
        .catch(error => {
          store.dispatch("SET_ERROR", generalRepo.prepareErrorRespond(error));
          store.dispatch("SET_PROCESSING", false);
          if (generalRepo.getErrorRespondStatus(error) == 401) {
            router.push({path:"/login"});
          }
        });

	}
}