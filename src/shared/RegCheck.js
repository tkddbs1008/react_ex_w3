const emailCheck = (email) => {
    let reg = /^[-_.0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.[a-zA-Z]/

    return reg.test(email);
}

export {emailCheck}