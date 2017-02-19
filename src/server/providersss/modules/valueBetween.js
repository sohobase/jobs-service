export default (value, from, to) => {
  const found = value.split(from)[1];
  if (found) {
    return found.split(to)[0];
  }
  return undefined;

  // const found = value.match(/See more (.*) jobs/);
  // if (found && found.length > 1) {
  //   // @TODO: Serialize category
  //   return found;
  // }
  // return undefined;
};
