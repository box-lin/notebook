/**
 *
 * @param {*} user
 * @param {*} repo
 * @returns
 */
const getLabels = (user, repo) => {
  const url = "https://api.github.com/repos/" + user + "/" + repo + "/labels";
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject("could not fetch");
      }
    });
    request.open("GET", url);
    request.send();
  });
};


const getLabelPerIssue = (user, repo, issueNumber) => {

}

 
