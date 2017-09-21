const Test = {
  lpad(str, len, char) {
    let s = str.toString();
    let c = char || ' ';
    c = c.toString();
    while (s.length < len) {
      s = c + s;
    }
    return s;
  },
};

export default { Test };
