/**
 *
 * @param {*} user
 * @param {*} repo
 * @returns
 */
const getIssues = (user, repo) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/issues`,
      method: "GET",
      success: function (issues) {
        resolve(issues);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};

/**
 *
 * @param {*} user
 * @param {*} repo
 * @param {*} label
 * @returns
 */
const getIssuesPerLabel = (user, repo, label) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/issues?labels=${label}`,
      method: "GET",
      success: function (issues) {
        resolve(issues);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};
