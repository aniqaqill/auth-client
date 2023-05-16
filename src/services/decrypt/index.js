function descrypt(data) {
    const temp = JSON.parse(atob(data.split('.')[1]));
    return temp;
}

export default descrypt;