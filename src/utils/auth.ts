function isAuth(): boolean {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
};

export default isAuth