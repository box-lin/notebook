let reviewPage = window.reviewPage || {};
(function () {
  // namespace variables
  const decreButton = $(
    `<button class="btn btn-outline-secondary" id="minus-btn" type="button">-</button>`
  );

  const increButton = $(
    `<button class="btn btn-outline-secondary" id="plus-btn" type="button">+</button>`
  );
  const numberInputField = $(
    `<input type="number" id="counter" class="form-control text-center" value="0" min="0">`
  );
  let issueDiv = $(`<div></div>`);
  let paginationDiv = $(`<div></div>`);
  const select = $(`<select class="form-control form-control-lg"></select>`);

  /**
   *
   * Helper here to shuffle array.
   */
  shuffleArry = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  /**
   * helper to get issues.
   */
  getIssuesHelper = async (category) => {
    try {
      const config = await readConfig("./config.yaml");
      if (category === "" || category === undefined) {
        const issues = await getIssues(config.username, config.repo);
        return issues;
      }
      const issues = await getIssuesPerMilestone(
        config.username,
        config.repo,
        category
      );
      return issues;
    } catch (err) {
      console.error("Failed to get issues:", err);
      return [];
    }
  };

  shuffleAndPickIssues = (issues, cnt) => {
    let res = shuffleArry(issues).slice(0, cnt);
    return res;
  };

  /**
   * The wrapper of loading issues.
   */
  loadIssues = async (div) => {
    try {
      const config = await readConfig("./config.yaml");
      const cats = await getCategories(config.username, config.repo);
      let options = `<option value=""> All </option>`;
      for (const cat of cats) {
        options += `<option value=${cat.number}> ${cat.title} </option>`;
      }
      select.append(options);
      div.append(select);
      div.append("<br>");
      div.append(issueDiv);
      div.append(paginationDiv);

      // this just a default to all.
      let issues = await getIssuesHelper();
      // default all
      insertIssuesToDivInstance(issueDiv, paginationDiv, issues);
      // category changed
      select.change(async function () {
        const selectedOptionValue = $(this).val();
        const cnt = numberInputField.val();
        const issues = await getIssuesHelper(selectedOptionValue);
        let displayIssues = shuffleAndPickIssues(issues, cnt);
        insertIssuesToDivInstance(issueDiv, paginationDiv, displayIssues);
      });

      numberInputField.change(async function () {
        const selectedOptionValue = $(this).val();
        const cnt = numberInputField.val();
        const issues = await getIssuesHelper(selectedOptionValue);
        let displayIssues = shuffleAndPickIssues(issues, cnt);
        insertIssuesToDivInstance(issueDiv, paginationDiv, displayIssues);
      });

      decreButton.on("click", async function () {
        const selectedOptionValue = $(this).val();
        const cnt = numberInputField.val();
        const issues = await getIssuesHelper(selectedOptionValue);
        let displayIssues = shuffleAndPickIssues(issues, cnt);
        insertIssuesToDivInstance(issueDiv, paginationDiv, displayIssues);
      });

      increButton.on("click", async function () {
        const selectedOptionValue = $(this).val();
        const cnt = numberInputField.val();
        const issues = await getIssuesHelper(selectedOptionValue);
        let displayIssues = shuffleAndPickIssues(issues, cnt);
        insertIssuesToDivInstance(issueDiv, paginationDiv, displayIssues);
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * The wrapper here to load headlines.
   */
  loadHeadline = (div) => {
    // just setup htmls

    const questionNumberDiv = $('<div class="input-group"></div>');
    questionNumberDiv.append(
      $('<div class="input-group-prepend"></div>').append(decreButton),
      numberInputField,
      $('<div class="input-group-append"></div>').append(increButton)
    );
    let headlineHtml = `
      <hr />
        <div class="row">
          <div class="col-9">
            <h1>Review</h1>
          </div>
          <div class="col-3" id="questionNumberDivPlaceholder">
 
          </div>
        </div>
      <hr />
    `;
    div.append(headlineHtml);
    $("#questionNumberDivPlaceholder").append(questionNumberDiv);

    // add event handlers
    decreButton.on("click", function () {
      let count = parseInt(numberInputField.val());
      if (count > 0) {
        count--;
      }
      const cat = select.val();
      const issue = getIssuesHelper(cat);
      numberInputField.val(count);
    });
    increButton.on("click", function () {
      let count = parseInt(numberInputField.val());
      count++;
      numberInputField.val(count);
    });
    numberInputField.on("input", function () {
      if ($(this).val() < 0) {
        $(this).val(0);
      }
    });
  };
  this.load = (did) => {
    let div = $(`#${did}`);
    loadHeadline(div);
    loadIssues(div);
  };
}).call(reviewPage);
