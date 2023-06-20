// const insertIssuesToDiv = (divId, issues) => {
//   let div = $(`#${divId}`);
//   for (const issue of issues) {
//     const maxCharCnt = 400;
//     let body =
//       issue.body.length > maxCharCnt
//         ? issue.body.substring(0, maxCharCnt) + "..."
//         : issue.body;
//     const block = `
//       <div class="card">
//         <div class="card-body">
//           <a href="issue.html?issueId=${issue.number}" class="card-title"><h5>${issue.title}</h5></a>
//           <p class="card-text">${body}</p>

//         </div>
//       </div>
//       <br>`;
//     div.append(block);
//   }
// };

const insertIssuesToDiv = (divId, issues) => {
  // Ensure the DOM is fully loaded before proceeding
  let div = $(`#${divId}`);
  // Add a separate div for the pagination controls
  $("#pagination-container").pagination({
    dataSource: issues, // use your issues array as the data source
    pageSize: 2, // number of items per page
    callback: function (issuesOnPage, pagination) {
      // Empty the div for the new list of issues
      div.empty();
      // Loop through the issuesOnPage array which contains the issues for the current page
      for (const issue of issuesOnPage) {
        const maxCharCnt = 400;
        let body =
          issue.body.length > maxCharCnt
            ? issue.body.substring(0, maxCharCnt) + "..."
            : issue.body;
        const block = `
            <div class="card">
              <div class="card-body">
                <a href="issue.html?issueId=${issue.number}" class="card-title"><h5>${issue.title}</h5></a>
                <p class="card-text">${body}</p>
              </div>
            </div>
            <br>`;
        div.append(block);
      }
    },
  });
};
