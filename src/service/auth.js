import axios from '../axios';

export const employeeRegister = async signUpData => {
  return await axios
    .post('/register_employee', signUpData)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const jobseekerRegister = async signUpData => {
  return await axios
    .post('/register', signUpData)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const signInAPI = async signInData => {
  return await axios
    .post('/login', signInData)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const verifyOTP = async otpData => {
  console.log(otpData);
  return await axios
    .post('/register_verify', otpData)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getProfile = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .get('/profile', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const getUserCategoryList = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .get('/user/categories', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const getEmployeeCategoryList = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .get('/employer/categories', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const getSubscriptionList = async token => {
  console.log('getSubscriptionList');
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .get('/user/plans', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const updateJobSeekerProfile = async (token, updateData) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/profile', updateData, {
      headers: {
        Authorization: AuthStr,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const updateEmployeeProfile = async (token, updateData) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/profile_employee', updateData, {
      headers: {
        Authorization: AuthStr,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const changePassword = async (token, passwordData) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(passwordData);
  return await axios
    .put('/profile/password', passwordData, {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const createJob = async (token, createJobData) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(createJobData);
  return await axios
    .post('/employer/jobs', createJobData, {
      headers: {
        Authorization: AuthStr,
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const uploadPhoto = async (token, uploadPhotoData) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(uploadPhotoData);
  return await axios
    .post('/profile/photo', uploadPhotoData, {
      headers: {
        Authorization: AuthStr,
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getExpSalaryList = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .get('/employer/categories?exp_salary=1', {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const employeeJob = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/employer/jobs/search', employeeJob, {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const loadMoreEmployeeJob = async (token, last) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/employer/jobs/search?size=10&last=' + last, loadMoreEmployeeJob, {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const userJobSearch = async token => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/user/jobs/search', userJobSearch, {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getJobDetails = async (token, id) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('user/jobs/' + id, {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
export const applyJob = async (token, id) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('user/jobs/' + id + '/apply', {headers: {Authorization: AuthStr}} )
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getAppliedJobs = async (token) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('user/jobs/applied', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const deleteAppliedJobs = async (token,id) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .delete('user/jobs/' + id, {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const jobSaved = async (token, id, data) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .post('user/jobs/' + id + '/save', data, {headers: {Authorization: AuthStr}} )
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getSavedJobs = async (token) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('user/jobs/saved', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getAllNotification = async (token) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('notifications', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const readAllNotification = async (token) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .put('notifications', {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const loadMoreUserJob = async (token, last) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log(AuthStr);
  return await axios
    .post('/user/jobs/search?size=10&last=' + last, loadMoreUserJob, {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const uploadResume = async (token, uploadResume) => {
  const AuthStr = 'Bearer '.concat(token);
  console.log('uploadResume' + JSON.stringify(uploadResume));
  return await axios
    .post('/user/resume', uploadResume, {
      headers: {
        Authorization: AuthStr,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const fetchJob = async (token, id) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .get('/employer/jobs/' + id, {headers: {Authorization: AuthStr}})
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const updateJob = async (token, id, updateData) => {
  const AuthStr = 'Bearer '.concat(token);
  return await axios
    .put('/employer/jobs/' + id, updateData, {
      headers: {Authorization: AuthStr},
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};
