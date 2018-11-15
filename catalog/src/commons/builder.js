const DEFAULT_ENVIRONMENT_ID = 'production';

class Builder {
  currentEnvironmentId = DEFAULT_ENVIRONMENT_ID;
  token = null;
  sessionId = null;

  init() {
    return new Promise((resolve, reject) => {
      if (!process.env.REACT_APP_ENV === 'production') {
        resolve();
        return;
      }
      const timeout = setTimeout(resolve, 1000);
      window.addEventListener('message', e => {
        if (!e.data || !e.data.context || e.data.msg !== 'luigi.init') return;
        this.currentEnvironmentId = e.data.context.environmentId;
        this.token = e.data.context.idToken;
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  getBearerToken() {
    if (!this.token) {
      return null;
    }
    return this.token;
  }

  getCurrentEnvironmentId() {
    return this.currentEnvironmentId;
  }

  getSessionId() {
    return this.sessionId;
  }
}

const builder = new Builder();

export default builder;
