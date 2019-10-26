let count = 0;

/*
 * Traversing the JSON tree starts here; resets counter of matching selectors to 0
 */
const parse = (view, selector, name) => {
  count = 0;
  lookForSelector(view, selector, name);
  console.log(
    `${count} objects were found with the [${selector}, ${name}] arguments.`
  );
};

/*
 * Loops over the array of classNames to find a match
 */
const containsClassName = (classNames, name) => {
  for (const className of classNames) {
    if (name === className) {
      return true;
    }
  }

  return false;
};

/*
 * Returns true if view contains an key value pair matching the selector and name
 * If the selector is a className, containsClassName will handle looping over the array and return a boolean
 */
const containsSelector = (view, name, selector) => {
  if (view.hasOwnProperty(selector)) {
    if (selector === 'classNames') {
      return containsClassName(view[selector], name);
    } else if (view[selector] === name) {
      return true;
    }
  }

  return false;
};

/*
 * Increases the counter of matching selectors if found in the current object
 * or in the control object, if it exists
 *
 * Calls traverseSubview if the object contains a list of subviews
 */
const lookForSelector = (view, selector, name) => {
  if (containsSelector(view, name, selector)) {
    count++;
    console.log(view);
  }

  if ((controlView = view['control']) !== undefined) {
    if (containsSelector(controlView, name, selector)) {
      count++;
      console.log(controlView);
    }
  }

  if (view.hasOwnProperty('subviews')) {
    traverseSubview(view.subviews, selector, name);
  } else if (view.hasOwnProperty('contentView')) {
    traverseSubview(view.contentView.subviews, selector, name);
  }
};

/*
 * Calls lookForSelector on each subview from the list of subviews
 */
const traverseSubview = (subviews, selector, name) => {
  for (view of subviews) {
    lookForSelector(view, selector, name);
  }
};

module.exports = {
  parse: parse
};
