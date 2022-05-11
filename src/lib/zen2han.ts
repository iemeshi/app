const zen2han = (str: string) => {
  return str.replace(/[！-～]/g, function (s: string) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }).replace(/　/g, ' ');
}

export default zen2han;
