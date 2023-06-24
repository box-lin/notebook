/**
 *
 * @param {*} user
 * @param {*} repo
 * @returns
 */
const getCategories = (user, repo) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/repos/${user}/${repo}/milestones`,
      method: "GET",
      success: function (cat) {
        resolve(cat);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};
