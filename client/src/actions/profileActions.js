import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER,
	GET_ERRORS
} from "./types";
import axios from "axios";



//get current Profile
export const getCurrentProfile = () => dispatch => {

  dispatch(setProfileLoading()); 
  axios.get('/api/profile')
  .then(res => 
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })
  )
  .catch(err => 
    dispatch({
      type:GET_PROFILE,
      payload: {}
    })
  );
};

//Create Profile

export const createProfile = (profileData, history) => dispatch => {

  axios.post('/api/profile', profileData)
  .then(res=> history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    }));
};

//Delete Account and Profile
export const deleteAccount = () =>dispatch =>{
  if(window.confirm('Are you sure you want to delete')){
    axios
			.delete("/api/profile")
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
  }
};


//Profile Loading
export const setProfileLoading = () => { return {
  type: PROFILE_LOADING
};
};

//clear Profile

export const clearProfile = () => {
  return {
    type:CLEAR_CURRENT_PROFILE
  };
};