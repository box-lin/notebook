const sideContentInit = async (divId) => {
  insertAboutMeSideContent(divId);
  insertLinksSideContent(divId);
  try {
    const config = await readConfig("./config.yaml");
    const labels = await getLabels(config.username, config.repo);
    insertCategorySideContent(divId, labels);
  } catch (err) {
    console.log(err);
  }
};

const insertAboutMeSideContent = (divId) => {
  let div = $(`#${divId}`);
  const html = `
  <div class="card  border-info mt-2 mb-4" style="max-width: 18rem;">
    <img class="card-img-top" src="img/cover.jpeg" alt="Card image cap">
    <div class="card-body text-primary">
        <h5 class="card-title">Boxiang Lin</h5>
        <p class="card-text">A place to track of my daily learning!</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Software Engineer</li>
        <li class="list-group-item">Computer Science Major</li>
    </ul>
    <div class="card-body">
        <a href="https://github.com/bboxlin" class="card-link">Github</a>
        <a href="#" class="card-link">Linkedin</a>
    </div>
  </div>`;
  div.append(html);
};

const insertLinksSideContent = (divId) => {
  let div = $(`#${divId}`);
  const html = `
    <div class="card border-primary mb-3">
        <div class="card-header">More links</div>
        <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action" target="_blank" title="Default Category" href="#">
                Leetcode
            </a>
            <a class="list-group-item list-group-item-action" target="_blank" title="Default Category" href="#">
                Discord
            </a>
            <a class="list-group-item list-group-item-action" target="_blank" title="Default Category" href="#">
                Wechat
            </a>
        </div>
    </div>
 
        `;
  div.append(html);
};

const insertCategorySideContent = (divId, labelArray) => {
  let div = $(`#${divId}`);
  let labelHtml = "";
  for (let label of labelArray) {
    labelHtml += ` <a href="category.html?category=${label.name}" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" >
                        ${label.name}
                    </a>`;
  }
  const html = `
    <div class="card border-success mb-3" style="max-width: 18rem;">
      <div class="card-header">Categories</div>
      <div class="card-body text-success">      
        ${labelHtml}
        <hr>
        <a class="card-link" href="index.html">
          <i class="bi-tag me-1"></i>
          All Category
        </a>
      </div>
    </div>
  `;

  div.append(html);
};
