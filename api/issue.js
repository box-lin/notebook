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
 * @param {*} labelName
 * @returns
 */
const getIssuesPerLabel = (user, repo, labelName) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/issues?labels=${labelName}`,
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

const getIssuesPerMilestone = (user, repo, milestoneNumber) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/issues?milestone=${milestoneNumber}`,
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


const getIssueContent = (user, repo, issueNumber) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/issues/${issueNumber}`,
      method: "GET",
      success: function (issue) {
        resolve(issue);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};
