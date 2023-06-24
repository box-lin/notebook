const sideContentInit = async (divId) => {
  insertAboutMeSideContent(divId);

  try {
    const config = await readConfig("./config.yaml");
    // not to show all labels... just a few, perhaps, 8.
    const labels = await getLabels(config.username, config.repo);
    const cats = await getCategories(config.username, config.repo);
    insertCategorySideContent(divId, cats);
    insertLabelSideContent(divId, labels);
  } catch (err) {
    console.log(err);
  }
};

const insertAboutMeSideContent = (divId) => {
  let div = $(`#${divId}`);
  const html = `
  <div class="card  border-info mt-2 mb-3">
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

const insertCategorySideContent = (divId, catArray) => {
  let div = $(`#${divId}`);
  let catHtml = "";
  for (let cat of catArray) {
    catHtml += `<a class="d-block mb-2" href="category.html?category=${cat.title}&number=${cat.number}">
                 ${cat.title}
                </a>`;
  }
  const html = `
    <div class="card border-primary mb-3">
      <div class="card-header">Categories</div>
        <div class="card-body text-success">      
          ${catHtml}
        </div>
    </div>
 
        `;
  div.append(html);
};

const insertLabelSideContent = (divId, labelArray) => {
  shuffleArray(labelArray);
  labelArray = labelArray.slice(0, 8);
  let div = $(`#${divId}`);
  let labelHtml = "";
  for (let label of labelArray) {
    labelHtml += ` <a href="label.html?label=${label.name}" class="d-inline-block btn btn-sm mb-2 me-1 btn-accent bg-primary text-white" >
                        ${label.name}
                    </a>`;
  }
  const html = `
    <div class="card border-success mb-3">
      <div class="card-header">Labels</div>
      <div class="card-body text-success">      
        ${labelHtml}
        <hr>
        <a class="card-link" href="label.html?label=all">
          <i class="bi-tag me-1"></i>
          All Labels
        </a>
      </div>
    </div>
  `;

  div.append(html);
};



// helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}