const insertIssuesToDiv = (divId, issues) => {
  let div = $(`#${divId}`);
  for (const issue of issues) {
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
};
