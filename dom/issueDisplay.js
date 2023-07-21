/**
 * Issue content page.
 * @param {*} divId
 */
const issuePage = async (divId) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const issueNumber = urlParams.get("issueId");
    const config = await readConfig("./config.yaml");
    const issue = await getIssueContent(
      config.username,
      config.repo,
      issueNumber
    );

    // title
    $("#contentTitle").prepend(
      `<hr/>
        <h2 class="d-flex">${issue.title}</h2>
        <p>Date: ${new Date(issue.updated_at).toISOString().substring(0, 10)}
           <br>
           <br>
           Category: ${getIssueCategoryHTML(issue)}
           <br>
           <br>
           Labels: ${getIssueLabelTagsHTML(issue)}
        </p>

       <hr/>
      `
    );

    // content
    let div = $(`#${divId}`);
    const converter = new showdown.Converter();
    const html = converter.makeHtml(issue.body);
    div.append(html);
    hljs.highlightAll();
  } catch (err) {
    console.log(err);
  }
};

/**
 * Issues index page.
 * @param {*} divId
 */
const issuesInitHomepage = async (divId) => {
  try {
    const config = await readConfig("./config.yaml");
    const issues = await getIssues(config.username, config.repo);
    insertIssuesToDiv(divId, issues);
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} divId
 */
const issuesInitCategoryPage = async (divId) => {
  const urlParams = new URLSearchParams(window.location.search);
  const milestoneTitle = urlParams.get("category");
  const milestoneNumber = urlParams.get("number");
  const tagDivId = "catTagDiv";
  $("#contentTitle").prepend(
    `<hr/>
        <h2 class="d-flex"> ${milestoneTitle}  </h2> 
          <footer class="blockquote-footer"> Category </footer>
          <br>
          <div id=${tagDivId}></div>
       <hr/>`
  );
  try {
    const config = await readConfig("./config.yaml");
    const issues = await getIssuesPerMilestone(
      config.username,
      config.repo,
      milestoneNumber
    );

    // add all issues's label into div id = "catTagDiv"
    const collectedLabels = [];
    for (const issue of issues) {
      for (const label of issue.labels) {
        // not add duplicates..
        if (
          !collectedLabels.some(
            (collectedLabel) => collectedLabel.name === label.name
          )
        ) {
          collectedLabels.push(label);
        }
      }
    }
    insertAllLabelTabsToDiv(tagDivId, collectedLabels);
    insertIssuesToDiv(divId, issues);
  } catch (err) {
    console.log(err);
  }
};

/**
/**
 * issue on label page.
 * @param {*} divId 
 */
const issuesInitLabelPage = async (divId) => {
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var labelName = urlParams.get("label");
    $("#contentTitle").prepend(
      `<hr/>
        <h2 class="d-flex"> ${labelName}  </h2> 
          <footer class="blockquote-footer"> Label </footer>
       <hr/>`
    );
    const config = await readConfig("./config.yaml");

    // show all labels
    if (labelName === "all") {
      const labels = await getLabels(config.username, config.repo);
      insertAllLabelTabsToDiv(divId, labels);
      return;
    }

    // show all issue with that labels.

    const issues = await getIssuesPerLabel(
      config.username,
      config.repo,
      labelName
    );
    insertIssuesToDiv(divId, issues);
  } catch (err) {
    console.log(err);
  }
};

const insertAllLabelTabsToDiv = (divId, labels) => {
  let div = $(`#${divId}`);
  let labelHtml = "";
  for (const label of labels) {
    labelHtml += `
       <li class="d-inline-block mb-2 me-2">
        <a class="btn btn-sm btn-outline-secondary" href="label.html?label=${label.name}">
            ${label.name}
        </a>
    </li>`;
  }
  const html = `
    <ul class="list-unstyled ul-tags">
        ${labelHtml}
    </ul>
  `;
  div.append(html);
};

/**
 *
 * @param {*} divId
 * @param {*} issues
 */
const insertIssuesToDiv = (divId, issues) => {
  let div = $(`#${divId}`);
  let paginationDiv = $("#pagination-container");
  insertIssuesToDivInstance(div, paginationDiv, issues);
};

const insertIssuesToDivInstance = (div, paginationDiv, issues) => {
  paginationDiv.pagination({
    dataSource: issues, // use your issues array as the data source
    pageSize: 4, // number of items per page
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
        const date = new Date(issue.updated_at).toISOString().substring(0, 10);

        const block = `
            <div class="card">
              <div class="card-body">
                <a href="issue.html?issueId=${
                  issue.number
                }" class="card-title"><h5>${issue.title}</h5></a>
                <h6 class="card-subtitle mb-2 text-muted">Date: ${date}</h6>
                <p class="card-text">${body}</p>
                ${getIssueLabelTagsHTML(issue)}
              </div>
            </div>
            <br>`;
        div.append(block);
      }
    },
  });
};

const getIssueLabelTagsHTML = (issue) => {
  let labelTag = "";
  for (const label of issue.labels) {
    labelTag += ` <a href="label.html?label=${label.name}" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" >
                        ${label.name}
                    </a>`;
  }
  return labelTag;
};

const getIssueCategoryHTML = (issue) => {
  return `<a href="category.html?category=${issue.milestone.title}&number=${issue.milestone.number}">
                 ${issue.milestone.title}
                </a>`;
};
