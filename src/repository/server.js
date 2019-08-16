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
    if (options && options.is_upload) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    let processing_value = true
    if (options && options.processing_value) {
      processing_value = options.processing_value
    }

    config.headers['Language'] = store.getters.getLanguage;

    store.dispatch("CLEAR_MESSAGES");
    store.dispatch("SET_PROCESSING", processing_value);
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
	},

  get(url, callback, options) {
    let config = {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
    }  

    let processing_value = true
    if (options && options.processing_value) {
      processing_value = options.processing_value
    }

    store.dispatch("CLEAR_MESSAGES");
    store.dispatch("SET_PROCESSING", processing_value);
    axios
      .get(appConfig.api + url, config)
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
  },

  simple_get(url, callback) {
    let config = {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
    }  

    axios
      .get(appConfig.api + url, config)
      .then(response => {
         if (response.error) {
           throw new Error(response.error);
         }
         callback(response);
      })
  },

  delete(url, callback, options) {
    let config = {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
    }  

    store.dispatch("CLEAR_MESSAGES");
    store.dispatch("SET_PROCESSING", true);
    axios
      .delete(appConfig.api + url, config)
      .then(response => {
         store.dispatch("SET_PROCESSING", false);
         if (response.error) {
           throw new Error(response.error)
         }
         callback(response)
      })
      .catch(error => {
        store.dispatch("SET_ERROR", generalRepo.prepareErrorRespond(error));
        store.dispatch("SET_PROCESSING", false);
        if (generalRepo.getErrorRespondStatus(error) == 401) {
          router.push({path:"/login"});
        }
      })
  }

}